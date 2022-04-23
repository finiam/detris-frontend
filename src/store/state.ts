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
    let tokenURI = await contractStore.tokenURI(tokenId);

    // whilte no folder
    let tempURI = tokenURI
      .split("/")
      .filter((_, i, arr) => i < arr.length - 1)
      .join("/");

    let metadataReq = await fetch(tempURI);

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
