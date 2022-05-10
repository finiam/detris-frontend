import { providers, Signer } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

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

    const provider = new providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    return {
      provider,
      signer,
      userAddress,
    };
  }

  return {
    connect,
  };
}

const walletConnectStore = createWalletConnectStore();

export default walletConnectStore;
