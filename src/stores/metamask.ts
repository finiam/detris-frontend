import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import walletStore from "./wallet";

function createMetamaskStore() {
  async function connect(showPrompt?: boolean) {
    const web3Provider = await detectEthereumProvider();
    const provider = new providers.Web3Provider(web3Provider);

    if (showPrompt) {
      await provider.send("eth_requestAccounts", []);
    }

    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    setupEventListeners(web3Provider);

    return {
      signer,
      userAddress,
      provider,
    };
  }

  function setupEventListeners(provider: any) {
    // Subscribe to accounts change
    provider.on("accountsChanged", walletStore.handleAccountChange);

    // Subscribe to accounts change
    provider.on("chainChanged", walletStore.handleChainChange);
  }

  async function init() {
    if ((window.ethereum as any).selectedAddress) {
      console.log((window.ethereum as any).selectedAddress);

      return connect(true);
    }

    return null;
  }

  return {
    connect,
    init,
  };
}

const metamaskStore = createMetamaskStore();

export default metamaskStore;
