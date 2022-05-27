import { writable } from "svelte/store";
import contractStore from "./contract";
import walletStore from "./wallet";

type GameState = "home" | "minting" | "playing" | "finished";

interface AppState {
  state: GameState;
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
    try {
      const tokenId = await contractStore.getTokenId();
      const tokenURI = await contractStore.getTokenURI(tokenId);
      const iframeSrc = await getAnimationURL(tokenURI);

      update((store) => ({
        ...store,
        tokenId,
        tokenURI,
        iframeSrc,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  async function getAnimationURL(uri: string) {
    if (!uri) return null;

    let metadataReq = await fetch(uri);

    let metadata = await metadataReq.json();

    return metadata?.animation_url;
  }

  function setState(state: GameState) {
    update((store) => ({
      ...store,
      state,
    }));
  }

  async function handleMint() {
    try {
      appState.setState("minting");
      await contractStore.mint();

      await appState.getTokendata();

      appState.setState("playing");
    } catch {
      appState.setState("home");
    }
  }

  return {
    subscribe,
    getTokendata,
    setState,
    handleMint,
  };
}

const appState = createAppState();

export default appState;
