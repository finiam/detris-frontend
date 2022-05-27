<script lang="ts">
  import FancyLoader from "./FancyLoader.svelte";
  import walletStore from "src/stores/wallet";
  import Button from "./Button.svelte";
</script>

<div class="wrap">
  {#if $walletStore.loading}
    <FancyLoader message="Connecting" />
  {:else}
    <Button
      disabled={!$walletStore.chainOk}
      type="button"
      data-type="button"
      on:click={() => {
        walletStore.connect("metamask");
      }}>METAMASK</Button
    >
    <Button
      disabled={!$walletStore.chainOk}
      type="button"
      on:click={() => {
        walletStore.connect("walletConnect");
      }}>WALLET CONNECT</Button
    >
  {/if}
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  @media screen and (min-width: 500px) {
    .wrap {
      flex-direction: row;
    }
  }
</style>
