import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { get, writable } from "svelte/store";
import metamaskStore from "./metamask";
import contractStore from "./contract";
import walletConnectStore from "./walletConnect";

function createWalletStore() {
  const store = writable({
    loading: false,
    connected: false,
    signer: null as JsonRpcSigner,
    provider: null as Web3Provider,
    userAddress: null as string,
    balance: 0,
  });

  const { subscribe, set, update } = store;

  function setLoading(loading: boolean) {
    update((store) => ({
      ...store,
      loading,
    }));
  }

  function init(data) {
    update((store) => ({
      ...store,
      ...data,
      connected: true,
    }));

    initContract();
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
  }

  function handleProviderDisconnect(code: number, reason: string) {
    console.log("disconnect", code, reason);

    update((store) => ({
      ...store,
      userAddress: null,
      connected: false,
    }));
  }

  async function initContract() {
    const { signer } = get(store);

    await contractStore.buildContract(signer);

    updateBalance();
  }

  async function updateBalance() {
    let balance = await contractStore.balanceOf();

    update((store) => ({
      ...store,
      balance,
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
  }

  async function connect(provider: string) {
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
    updateBalance,
    handleAccountChange,
    handleChainChange,
    handleProviderDisconnect,
  };
}

const walletStore = createWalletStore();

walletStore.checkIfConnected();

export default walletStore;
