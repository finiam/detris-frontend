import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { get, writable } from "svelte/store";
import metamaskStore from "./metamask";
import contractStore from "./contract";
import walletConnectStore from "./walletConnect";
import appState from "./appState";

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

  async function init(data) {
    await contractStore.buildContracts(data.signer);

    const balance = await contractStore.getBalance();

    console.log(balance)

    appState.getTokendata();

    update((store) => ({
      ...store,
      ...data,
      balance,
      connected: true,
    }));

    setLoading(false);
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

  async function checkIfConnected() {
    const metamaskUser = await metamaskStore.init();

    if (metamaskUser) {
      init(metamaskUser);

      return;
    }

    const walletConnectUser = await walletConnectStore.init();

    if (walletConnectUser) {
      init(walletConnectUser);

      return;
    }

    setLoading(false);
  }

  async function connect(provider: string) {
    setLoading(true);

    switch (provider) {
      case "metamask":
        const metamaskUser = await metamaskStore.connect(true);

        if (metamaskUser) {
          init(metamaskUser);
        }

        break;

      case "walletConnect":
        const walletConnectUser = await walletConnectStore.connect();

        init(walletConnectUser);

        break;
    }
  }

  return {
    subscribe,
    checkIfConnected,
    connect,
    setLoading,
    handleAccountChange,
    handleChainChange,
    handleProviderDisconnect,
  };
}

const walletStore = createWalletStore();

walletStore.checkIfConnected();

export default walletStore;
