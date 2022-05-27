<script>
  import FallingBlock from "./FallingBlock.svelte";
  import Grain from "./Grain.svelte";
</script>

<div class="root">
  {#each { length: 7 } as _, index}
    <FallingBlock {index} />
  {/each}
  {#each { length: 12 } as _, index}
    <Grain />
  {/each}
</div>

<style>
  .root {
    z-index: -1;
    pointer-events: none;
  }
</style>
