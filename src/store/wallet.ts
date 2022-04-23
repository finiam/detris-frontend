import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import { get, writable } from "svelte/store";

function createWalletStore() {
  const store = writable({
    loading: false,
    connected: false,
    signer: null as JsonRpcSigner,
    provider: null as Web3Provider,
    userAddress: null as string,
  });

  const { subscribe, set, update } = store;

  async function init(showPrompt?: boolean) {
    update((store) => ({ ...store, loading: true }));

    const web3Provider = await detectEthereumProvider();
    const provider = new providers.Web3Provider(web3Provider);

    if (showPrompt) {
      await provider.send("eth_requestAccounts", []);
    }

    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    update((store) => ({
      ...store,
      provider,
      connected: true,
      loading: false,
      userAddress,
      signer,
    }));
  }

  async function checkIfConnected() {
    if ((window.ethereum as any).selectedAddress) {
      init(true);
    }
  }

  return {
    subscribe,
    init,
    checkIfConnected,
  };
}

const walletStore = createWalletStore();

walletStore.checkIfConnected();

export default walletStore;
