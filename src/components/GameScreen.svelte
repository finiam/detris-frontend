<script>
  import contractStore from "src/stores/contract";
  import appState from "src/stores/appState";
  import Iframe from "./Iframe.svelte";
</script>

<div class="wrapper">
  <div class="info">
    <p>Move the pieces with<br /> W A S D</p>
    <p>
      <a href={$appState.tokenURI} target="_blank">
        View NFT metadata on IPFS
      </a>
    </p>
    <p>
      <a href={$appState.iframeSrc} target="_blank"> Play on IPFS </a>
    </p>
    <br />
  </div>
  <div class="iframe-wrapper">
    <Iframe />
  </div>
  <div></div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 20% auto 20%;
    width: 100%;
    height: 100%;
  }
  .iframe-wrapper {
    flex: 1 0 auto;    
  }

</style>
