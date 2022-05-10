import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";

function createMetamaskStore() {
  async function connect(showPrompt?: boolean) {
    const web3Provider = await detectEthereumProvider();
    const provider = new providers.Web3Provider(web3Provider);

    if (showPrompt) {
      await provider.send("eth_requestAccounts", []);
    }

    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    return {
      signer,
      userAddress,
      provider,
    };
  }

  async function setupMetamask() {
    if ((window.ethereum as any).selectedAddress) {
      return connect(true);
    }

    return null;
  }

  return {
    connect,
    setupMetamask,
  };
}

const metamaskStore = createMetamaskStore();

export default metamaskStore;
