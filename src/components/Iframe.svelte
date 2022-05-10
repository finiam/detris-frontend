<script lang="ts">
  import appState from "src/stores/appState";
</script>

<div class="wrapper">
  <iframe id="game-frame" title="Detris" src={$appState.iframeSrc} />
</div>

<style>
  .wrapper {
    position: relative;
    width: 327px;
    height: 783px;
    max-height: 90vh;
    margin: auto;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;

    filter: drop-shadow(2px 2px 2px #000000dd);
  }
</style>
