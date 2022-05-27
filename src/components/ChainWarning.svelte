<script lang="ts">
  import { getChainWarning } from "src/lib/chainResolver";
  import walletStore from "src/stores/wallet";

  $: warning = getChainWarning($walletStore.chain);
</script>

{#if warning}
  <section class="root">
    <p class="warning">{warning}</p>
  </section>
{/if}

<style>
  .root {
    position: absolute;
    top: 0;
    width: 100%;
    background: #e65;
  }
  .warning {
    color: #fff;
    font-family: var(--sans-font);
    font-weight: 500;
    text-align: center;
  }
</style>
