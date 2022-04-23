import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { providers } from "ethers";
import { get, writable } from "svelte/store";
import metamaskStore from "./metamaskStore";
import walletConnectStore from "./walletConnectStore";

function createWalletStore() {
  const store = writable({
    loading: false,
    connected: false,
    signer: null as JsonRpcSigner,
    provider: null as Web3Provider,
    userAddress: null as string,
  });

  const { subscribe, set, update } = store;

  async function checkIfConnected() {
    const metamaskUser = await metamaskStore.setupMetamask();

    if (metamaskUser) {
      update((store) => ({
        ...store,
        ...metamaskUser,
      }));
    }

    /* const walletConnectUser = await walletConnectStore.connect(); */
  }

  return {
    subscribe,
    checkIfConnected,
  };
}

const walletStore = createWalletStore();

walletStore.checkIfConnected();

export default walletStore;
