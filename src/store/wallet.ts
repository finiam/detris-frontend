import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { get, writable } from "svelte/store";
import metamaskStore from "./metamaskStore";
import contractStore from "./contract";
import walletConnectStore from "./walletConnectStore";

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

  async function initContract() {
    const { signer } = get(store);

    await contractStore.buildContract(signer);

    updateBalance();
  }

  async function updateBalance() {
    let balance = await contractStore.balanceOf();

    console.log(balance);

    update((store) => ({
      ...store,
      balance,
    }));
  }

  function setSigner(signer) {
    update((store) => ({
      ...store,
      signer,
    }));
  }

  async function checkIfConnected() {
    const metamaskUser = await metamaskStore.setupMetamask();

    if (metamaskUser) {
      init(metamaskUser);
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
  };
}

const walletStore = createWalletStore();

walletStore.checkIfConnected();

export default walletStore;
