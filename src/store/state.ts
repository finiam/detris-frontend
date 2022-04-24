import { writable } from "svelte/store";
import contractStore from "./contract";
import walletStore from "./wallet";

function greateGameStore() {
  const store = writable({
    tokenId: null,
    tokenURI: null,
    iframeSrc: null,
  });

  const { subscribe, update } = store;

  async function getAddressData() {
    walletStore.setLoading(true);

    let tokenId = await contractStore.tokenOfOwnerByIndex();
    /* let tokenURI = await contractStore.tokenURI(tokenId); */

    console.log(tokenId);

    return;
    let tokenURI = await contractStore.getTokenFromL2();
    console.log(tokenURI);

    let metadataReq = await fetch(tokenURI);

    let metadata = await metadataReq.json();

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

const gameStore = greateGameStore();

export default gameStore;
