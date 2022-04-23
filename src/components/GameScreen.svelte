<script>
  import gameStore from "../store/state";
  import Iframe from "./Iframe.svelte";
</script>

<div class="wrapper">
  <div class="info">
    <p>Move the pieces with<br /> W A S D</p>
    <p>
      <a href={$gameStore.tokenURI} target="_blank"> View NFT metadata on IPFS </a>
    </p>
  </div>
  <div class="iframe-wrapper">
    <Iframe />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
  }
  .info {
    width: 15%;
    padding: 20px 36px;
  }
  .iframe-wrapper {
    width: 60%;
    display: flex;
  }
  p {
    color: #fff;
    line-height: 1.4;
  }
  a {
    color: #fff;
  }
</style>
