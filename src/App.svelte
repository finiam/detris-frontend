<script lang="ts">
  import GameScreen from "./components/GameScreen.svelte";
  import HomeScreen from "./components/HomeScreen.svelte";
  import appState from "./stores/appState";
</script>

{#if $appState.tokenId !== null}
  <GameScreen />
{:else}
  <HomeScreen />
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
