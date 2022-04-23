<script lang="ts">
  import GameScreen from "./components/GameScreen.svelte";
  import HomeScreen from "./components/HomeScreen.svelte";
  import Mint from "./components/Mint.svelte";
  import gameStore from "./store/state";
  import walletStore from "./store/wallet";
</script>

<div>
  {#if $gameStore.tokenId}
    <GameScreen />
  {:else}
    <HomeScreen />
  {/if}
</div>
