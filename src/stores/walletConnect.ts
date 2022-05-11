import { providers, Signer } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import walletStore from "./wallet";

function createWalletConnectStore() {
  async function connect() {
    //  Create WalletConnect Provider
    const web3Provider = new WalletConnectProvider({
      rpc: {
        69: "https://kovan.optimism.io",
      },
    });

    web3Provider.enable();

    web3Provider.updateRpcUrl(69);

    setupEventListeners(web3Provider);

    const provider = new providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    return {
      provider,
      signer,
      userAddress,
    };
  }

  function setupEventListeners(provider: any) {
    // Subscribe to accounts change
    provider.on("accountsChanged", walletStore.handleAccountChange);

    // Subscribe to accounts change
    provider.on("chainChanged", walletStore.handleChainChange);

    // Subscribe to session disconnection
    provider.on("disconnect", walletStore.handleProviderDisconnect);
  }

  async function init() {
    const stored = localStorage.getItem("walletconnect");

    if (stored) {
      return connect();
    }

    return null;
  }

  return {
    connect,
    init,
  };
}

const walletConnectStore = createWalletConnectStore();

export default walletConnectStore;
