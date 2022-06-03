<script lang="ts">
  import appState from "src/stores/appState";
  import FancyLoader from "./FancyLoader.svelte";

  let loadingIframe = true;

  function focusIframe(element) {
    loadingIframe = false;
    element.target.focus();
  }
</script>

<div class="wrapper">
  {#if loadingIframe}
    <div class="loader">
      <FancyLoader message="" />
    </div>
  {/if}
  <iframe
    on:load={focusIframe}
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
  .loader {
    position: absolute;
    inset: 0;
    margin: auto;
    height: fit-content;
  }
  iframe {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    border: 0;
  }
  @media screen and (min-width: 1900px) {
    iframe {
      height: 90%;
    }
  }
</style>
