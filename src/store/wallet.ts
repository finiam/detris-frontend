import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import { writable } from "svelte/store";

function createWalletStore() {
  const store = writable({
    loading: false,
    connected: false,
    signer: null as JsonRpcSigner,
    provider: null as Web3Provider,
    userAddress: null as string,
  });

  const { subscribe, set, update } = store;

  async function init() {
    update((store) => ({ ...store, loading: true }));

    const web3Provider = await detectEthereumProvider();
    const provider = new providers.Web3Provider(web3Provider);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    update((store) => ({
      ...store,
      loading: false,
      userAddress,
      signer,
      provider,
    }));
  }

  return {
    subscribe,
    init,
  };
}

const walletStore = createWalletStore();

walletStore.init();

export default walletStore;
