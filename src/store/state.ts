import { writable } from "svelte/store";
import contractStore from "./contract";

function greateGameStore() {
  const store = writable({
    tokenId: null,
    tokenURI: null,
    iframeSrc: null,
  });

  const { subscribe, update } = store;

  async function getAddressData() {
    let tokenId = await contractStore.tokenOfOwnerByIndex();
    let tokenURI = await contractStore.tokenURI(tokenId);

    /* let tokenURI =
      "https://ipfs.io/ipfs/bafkreig6kjtn5r22sh72kaeme4r6pyejzf2u3jzjdlwwrahoz36vp2zr4m/"; */

    /* let uri =
      "https://ipfs.io/ipfs/bafkreih6opftdgxcjkybqffd5urn6yh7i6bwesgkt6u4acxlltrjrqdy5a/"; */

    let tempURI = tokenURI
      .split("/")
      .filter((_, i, arr) => i < arr.length - 1)
      .join("/");

    let metadataReq = await fetch(tempURI);

    let metadata = await metadataReq.json();

    console.log(await metadataReq.json());

    update(() => ({
      tokenId,
      tokenURI,
      iframeSrc: metadata.animation_url,
    }));
  }

  return {
    subscribe,
    getAddressData,
  };
}

const gameStore = greateGameStore();

export default gameStore;
