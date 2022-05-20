<script lang="ts">
  import { onMount } from "svelte";
  import GameScreen from "src/components/GameScreen.svelte";
  import HomeScreen from "src/components/HomeScreen.svelte";
  import appState from "src/stores/appState";
  import BlockShapes from "./components/BlockShapes.svelte";

  onMount(() => {
    let index = Math.floor(Math.random() * 7);

    let link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = `${window.location.href}images/favicons/favicon_${index}.ico`;

    document.getElementsByTagName("head")[0].appendChild(link);
  });
</script>

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
