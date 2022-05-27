<script lang="ts">
  import { onMount } from "svelte";
  import GameScreen from "src/components/GameScreen.svelte";
  import HomeScreen from "src/components/HomeScreen.svelte";
  import appState from "src/stores/appState";
  import ChainWarning from "./components/ChainWarning.svelte";
  import setFavicon from "./lib/setFavicon";
  import { addMessageListener } from "./lib/messageUtils";

  onMount(() => {
    setFavicon();
    addMessageListener();
  });
</script>

<ChainWarning />
{#if $appState.state === "home" || $appState.state === "minting"}
  <HomeScreen />
{:else}
  <GameScreen />
{/if}
<div />

<style>
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url(https://images.unsplash.com/photo-1602475063211-3d98d60e3b1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm9pc2V8ZW58MHx8MHx8&w=1000&q=400);
    opacity: 0.2;
    z-index: -1;
  }
</style>
