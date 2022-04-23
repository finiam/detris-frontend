import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { ethers, providers } from "ethers";
import { get, writable } from "svelte/store";
import metamaskStore from "./metamaskStore";
import walletConnectStore from "./walletConnectStore";
import contractStore from "./contract";

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

    contractStore.buildContract(signer);

    let balance = await contractStore.balanceOf();

    update((store) => ({
      ...store,
      balance,
    }));
  }

  async function checkIfConnected() {
    const metamaskUser = await metamaskStore.setupMetamask();

    if (metamaskUser) {
      init(metamaskUser);
    }

    /* const walletConnectUser = await walletConnectStore.connect(); */
  }

  async function connect() {
    const metamaskUser = await metamaskStore.connect(true);

    if (metamaskUser) {
      init(metamaskUser);
    }
  }

  return {
    subscribe,
    checkIfConnected,
    connect,
  };
}

const walletStore = createWalletStore();

walletStore.checkIfConnected();

export default walletStore;
