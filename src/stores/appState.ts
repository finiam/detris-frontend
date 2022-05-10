import { writable } from "svelte/store";
import contractStore from "./contract";
import walletStore from "./wallet";

function createAppState() {
  const store = writable({
    tokenId: null,
    tokenURI: null,
    iframeSrc: null,
  });

  const { subscribe, update } = store;

  async function getAddressData() {
    walletStore.setLoading(true);

    let { tokenURI, tokenId } = await contractStore.getTokenFromL2();
    console.log(tokenURI);

    let metadataReq = await fetch(tokenURI);

    let metadata = await metadataReq.json();

    console.log(tokenId);

    update(() => ({
      tokenId,
      tokenURI,
      iframeSrc: metadata.animation_url,
    }));

    walletStore.setLoading(false);
  }

  return {
    subscribe,
    getAddressData,
  };
}

const appState = createAppState();

export default appState;
