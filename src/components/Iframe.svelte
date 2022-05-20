<script lang="ts">
  import appState from "src/stores/appState";

  function focusIframe(element) {
    element.target.focus();
  }
</script>

<div class="wrapper">
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
  iframe {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 90%;
    border: 0;
  }
</style>
