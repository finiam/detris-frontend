import { writable } from "svelte/store";
import contractStore from "./contract";

function greateGameStore() {
  const store = writable({
    tokenId: null,
  });

  const { subscribe, update } = store;

  async function setTokenId() {
    let id = contractStore.tokenOfOwnerByIndex();

    update(() => ({
      tokenId: id,
    }));
  }

  return {
    subscribe,
    setTokenId,
  };
}

const gameStore = greateGameStore();

export default gameStore;
