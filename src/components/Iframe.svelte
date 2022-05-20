<script lang="ts">
  import appState from "src/stores/appState";
  import { onMount } from "svelte";

  let canvasEl: HTMLIFrameElement;

  onMount(() => {
    setTimeout(() => {
      canvasEl.contentWindow.focus();
    }, 100);
  });
</script>

<div class="wrapper">
  <iframe
    bind:this={canvasEl}
    id="game-frame"
    title="Detris"
    src={$appState.iframeSrc}
  />
</div>

<style>
  .wrapper {
    position: relative;
    height: 100%;
    max-height: 100vh;
    margin: auto;
  }
  iframe {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 90%;
    border: 0;
  }
</style>
