<script lang="ts">
  import appState from "src/stores/appState";
  import walletStore from "src/stores/wallet";
  import FancyLoader from "./FancyLoader.svelte";

  async function handleClick() {
    if ($appState.tokenId) {
      appState.setState("playing");
    } else {
      appState.handleMint($walletStore.userAddress);
    }
  }
</script>

{#if $walletStore.loading}
  <FancyLoader message="" />
{:else}
  <button
    class="button"
    type="button"
    on:click={handleClick}
    disabled={$walletStore.loading}
  >
    {#if $walletStore.connected && !$appState.tokenId}
      MINT TO PLAY
    {/if}

    {#if $walletStore.connected && $appState.tokenId}
      PLAY YOUR NFT
    {/if}
  </button>
{/if}

<style>
  .button {
    font-size: 14px;
    padding: 8px 10px;
    color: #000;
    border: 0;
    border-radius: 4px;
    background: var(--red);
    cursor: pointer;
    box-shadow: inset 2px 2px 0 0px #ffffffdd;
    filter: drop-shadow(5px 5px 1px #000);

    transition: transform 0.5s ease;
  }
  .button:hover {
    transform: scale(1.05);
  }

  @media screen and (min-width: 500px) {
    .button {
      font-size: 18px;
      padding: 20px 40px;
    }
  }
</style>
