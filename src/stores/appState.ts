import { writable } from "svelte/store";
import contractStore from "./contract";
import walletStore from "./wallet";

interface AppState {
  state: "home" | "playing";
  tokenId: number;
  tokenURI: string;
  iframeSrc: string;
}

function createAppState() {
  const store = writable<AppState>({
    state: "home",
    tokenId: null,
    tokenURI: null,
    iframeSrc: null,
  });

  const { subscribe, update } = store;

  async function getTokendata() {
    walletStore.setLoading(true);

    const tokenId = await contractStore.getTokenId();
    const tokenURI = await contractStore.getTokenURI(tokenId);
    const iframeSrc = await getAnimationURL(tokenURI);

    update((store) => ({
      ...store,
      tokenId,
      tokenURI,
      iframeSrc,
    }));

    walletStore.setLoading(false);
  }

  async function getAnimationURL(uri: string) {
    if (!uri) return null;

    let metadataReq = await fetch(uri);

    let metadata = await metadataReq.json();

    return metadata?.animation_url;
  }

  function play() {
    update((store) => ({
      ...store,
      state: "playing",
    }));
  }

  return {
    subscribe,
    getTokendata,
    play,
  };
}

const appState = createAppState();

export default appState;
