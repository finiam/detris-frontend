import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { get, writable } from "svelte/store";
import metamaskStore from "./metamask";
import contractStore from "./contract";
import walletConnectStore from "./walletConnect";
import appState from "./appState";
import type { providers } from "ethers";

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
  });

  const { subscribe, set, update } = store;

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
    await contractStore.buildContracts(data.signer);

    await updateBalance();

    await appState.getTokendata();

    update((store) => ({
      ...store,
      ...data,
      connected: true,
    }));

    /* checkChain(); */

    setLoading(false);
  }

  /* async function checkChain() {
    const { provider } = get(store);

    provider.network.chainId;
  } */

  async function updateBalance() {
    const balance = await contractStore.getBalance();

    update((store) => ({
      ...store,
      balance,
    }));
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

    update((store) => ({
      ...store,
      chain: chainId,
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
      const user = await connect(walletKeys[i], false);

      if (user) break;
    }

    setLoading(false);
  }

  async function connect(provider: string, showPrompt: boolean) {
    setLoading(true);

    try {
      const user = await WALLETS[provider].connect(showPrompt);

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
