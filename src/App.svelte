<script lang="ts">
  import HomeScreen from "./components/HomeScreen.svelte";
  import Mint from "./components/Mint.svelte";
  import walletStore from "./store/wallet";
</script>

<div>
  <!-- {#if !$walletStore.connected}
    <HomeScreen />
  {:else}
    <Mint />
  {/if} -->
  <HomeScreen />
</div>
