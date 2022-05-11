<script lang="ts">
  import walletStore from "src/stores/wallet";
  import Button from "./Button.svelte";
</script>

<div class="wrap">
  <Button
    type="button"
    on:click={() => {
      walletStore.connect("metamask");
    }}>METAMASK</Button
  >
  <Button
    type="button"
    on:click={() => {
      walletStore.connect("walletConnect");
    }}>WALLET CONNECT</Button
  >
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
