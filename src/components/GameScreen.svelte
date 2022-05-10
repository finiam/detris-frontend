<script>
  import contractStore from "src/stores/contract";
  import appState from "src/stores/appState";
  import Iframe from "./Iframe.svelte";

  let val = "";
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

    <p>Mint game state on L2 :)</p>
    <textarea bind:value={val} rows="6" />
    <button
      type="button"
      class="mint-btn"
      disabled={!val}
      on:click={() => {
        contractStore.mintGameState(val);
      }}>Mint</button
    >
    <p>{$contractStore.message}</p>
  </div>
  <div class="iframe-wrapper">
    <Iframe />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    height: 100%;
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
  .mint-btn {
    margin: 20px 0 10px;
    font-size: 20px;
    padding: 0;
    text-align: left;
    color: var(--red);
    background: none;
    border: 0;
    cursor: pointer;
  }
  textarea {
    border: 2px solid var(--red);
  }
</style>
