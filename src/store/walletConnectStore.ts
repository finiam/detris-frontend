import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { providers } from "ethers";

function createWalletConnectStore() {
  async function connect(showPrompt?: boolean) {
    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    connector.on("connect", handleConnect);

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }
  }

  function handleConnect(error, payload) {
    console.log(payload);
  }

  return {
    connect,
  };
}

const walletConnectStore = createWalletConnectStore();

export default walletConnectStore;