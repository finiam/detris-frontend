import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { get, writable } from "svelte/store";
import metamaskStore from "./metamask";
import contractStore from "./contract";
import walletConnectStore from "./walletConnect";
import appState from "./appState";
import { BigNumber, providers } from "ethers";
import { getCorrectChainId } from "src/lib/chainResolver";

const WALLETS = {
  metamask: metamaskStore,
  walletConnect: walletConnectStore,
};

function createWalletStore() {
  const store = writable({
    loading: true,
    connected: false,
    signer: null as JsonRpcSigner,
    provider: null as Web3Provider,
    userAddress: null as string,
    balance: null as number,
    chain: null as number,
    chainOk: true,
  });

  const { subscribe, update } = store;

  function setLoading(loading: boolean) {
    update((store) => ({
      ...store,
      loading,
    }));
  }

  async function init(data: {
    provider: providers.Web3Provider;
    signer: JsonRpcSigner;
    userAddress: string;
  }) {
    await checkChain(data.provider);

    if (!get(store).chainOk) {
      return;
    }

    await contractStore.buildContracts(data.signer);

    update((store) => ({
      ...store,
      ...data,
      connected: true,
    }));

    await updateBalance();

    await appState.getTokendata(data.userAddress);

    setLoading(false);
  }

  async function checkChain(provider: providers.Web3Provider) {
    const chainId =
      provider?.network?.chainId || (provider?.provider as any)?.chainId;

    update((store) => ({
      ...store,
      chain: chainId,
      chainOk: getCorrectChainId() === chainId,
    }));
  }

  async function updateBalance() {
    try {
      const balance = await contractStore.getBalance();

      update((store) => ({
        ...store,
        balance,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  function handleAccountChange(data: string[]) {
    console.log("accountsChanged", data);

    if (data.length === 0) {
      window.location.reload();
    } else if (data[0] !== get(store).userAddress) {
      update((store) => ({
        ...store,
        userAddress: null,
        connected: false,
      }));
    }
  }

  function handleChainChange(chainId: number) {
    console.log("chainChanged", chainId);

    const chainIdAsNumber = isNaN(chainId)
      ? BigNumber.from(chainId).toNumber()
      : chainId;

    update((store) => ({
      ...store,
      chain: BigNumber.from(chainId).toNumber(),
      chainOk: getCorrectChainId() === chainIdAsNumber,
    }));
  }

  function handleProviderDisconnect(code: number, reason: string) {
    console.log("disconnect", code, reason);

    update((store) => ({
      ...store,
      userAddress: null,
      connected: false,
    }));
  }

  async function autoConnect() {
    const walletKeys = Object.keys(WALLETS);

    for (let i = 0; i < walletKeys.length; i++) {
      const user = await WALLETS[walletKeys[i]].init();

      if (user) {
        init(user);

        break;
      }
    }

    setLoading(false);
  }

  async function connect(provider: string) {
    setLoading(true);

    try {
      const user = await WALLETS[provider].connect(true);

      await init(user);

      return true;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    subscribe,
    autoConnect,
    connect,
    setLoading,
    handleAccountChange,
    handleChainChange,
    handleProviderDisconnect,
  };
}

const walletStore = createWalletStore();

walletStore.autoConnect();

export default walletStore;
