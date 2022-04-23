<script lang="ts">
  import gameStore from "../store/state";
</script>

<div class="wrapper">
  <div class="pad" />
  <iframe id="game-frame" title="Detris" src={$gameStore.iframeSrc} />
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
    border: 1px solid #ccc;
  }
</style>
