<script>
  import appState from "src/stores/appState";

  import {
    ArrowLeftCircleIcon,
    ExternalLinkIcon,
    TwitterIcon,
  } from "svelte-feather-icons";
  import { link } from "svelte-navigator";
</script>

<div class="root">
  <nav>
    <a href="/" class="back-btn" use:link>
      <ArrowLeftCircleIcon size="20" />
      <span>Back</span>
    </a>
  </nav>
  <h1>About Detris</h1>
  <div class="body">
    <p>{$appState.minted} NFTs minted so far</p>
    <p>
      Detris is a playable NFT, powered by finiam. We came up with the concept
      for ETH Amsterdam, as a way to explore what an NFT could be, and ended up
      being one of the 13 finalist teams.
    </p>
    <p>
      You mint an NFT using Manifold, that serves as an interface to play
      Tetris, written Rust and completing to WASM. We use IPFS, allowing us to
      store the NFT asset data in a decentralised and reliable fashion, fit for
      off-chain NFT data, the metadata, images, and the game itself.
    </p>
    <p>
      This is the first phase of the project, next we'll be exploring on-chain
      NFT generation soon and expect to launch a second phase with some news!
    </p>
    <p>We Finiam. Finiam good.</p>

    <a
      class="link"
      href="https://finiam.com"
      target="_blank"
      rel="noreferrer noopener"
    >
      <ExternalLinkIcon size="20" />
      <span> finiam.com </span>
    </a>

    <a
      class="link"
      href="https://twitter.com/wearefiniam"
      target="_blank"
      rel="noreferrer noopener"
    >
      <TwitterIcon size="20" />
      <span> wearefiniam </span>
    </a>
  </div>
</div>

<style>
  .root {
    margin: 10% auto;
    width: 500px;
    max-width: 90%;
    color: #fff;
  }
  .body {
    margin: 20px 0;
  }
  .body p {
    font-family: var(--sans-font);
    font-size: 18px;
    letter-spacing: 0.04em;
  }
  .back-btn {
    display: flex;
    text-decoration: none;
    font-family: var(--sans-font);
    color: #fff;
  }
  .back-btn span {
    margin-left: 10px;
  }
  .link {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-family: var(--sans-font);
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: white;
  }
  .link span {
    margin-left: 10px;
  }
  .link:first-of-type {
    margin-top: 40px;
  }
</style>
