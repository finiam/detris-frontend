import { get, writable } from "svelte/store";
import contractStore from "./contract";
import { getTokenSupply, getTokenByOwner } from "src/lib/api";

type GameState = "home" | "minting" | "playing" | "finished";

interface AppState {
  state: GameState;
  tokenId: number;
  tokenURI: string;
  iframeSrc: string;
  supply: number;
}

function createAppState() {
  const store = writable<AppState>({
    state: "home",
    tokenId: null,
    tokenURI: null,
    iframeSrc: null,
    supply: 101,
  });

  const { subscribe, update } = store;

  async function getSupply() {
    const supply = await getTokenSupply();

    update((store) => ({
      ...store,
      supply,
    }));
  }

  async function getTokendata(address: string) {
    try {
      const id = await getTokenByOwner(address);

      if (id === false) {
        return;
      }

      const tokenURI = await contractStore.getTokenURI(id);    

      const iframeSrc = await getAnimationURL(tokenURI);

      update((store) => ({
        ...store,
        tokenId: id,
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

  async function handleMint(address: string) {
    try {
      appState.setState("minting");
      await contractStore.mint();

      await appState.getTokendata(address);

      appState.setState("playing");
    } catch {
      appState.setState("home");
    }
  }

  return {
    subscribe,
    getSupply,
    getTokendata,
    setState,
    handleMint,
    tokenId: get(store).tokenId,
  };
}

const appState = createAppState();

appState.getSupply();

export default appState;
