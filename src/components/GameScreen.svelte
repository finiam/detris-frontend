<script>
  import { ExternalLinkIcon } from "svelte-feather-icons";
  import appState from "src/stores/appState";
  import Iframe from "./Iframe.svelte";
  import Controls from "./Controls.svelte";
</script>

<div class="wrapper">
  <div class="iframe-wrapper">
    <Iframe />
  </div>
  <div class="info-panel">
    <Controls />
    <section class="link-section">
      <a
        class="link"
        href={$appState.tokenURI}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>View NFT metadata</span>
        <ExternalLinkIcon size="20" />
      </a>
      <a
        class="link"
        href={$appState.iframeSrc}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span> Play on IPFS </span>
        <ExternalLinkIcon size="20" />
      </a>
    </section>
  </div>
  <div class="info-panel">
    {#if $appState.state === "finished"}
      <p style="color: #fff">Game ended, mint the endgame</p>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 20% auto 20%;
    width: 100%;
    height: 100%;
  }
  .info-panel {
    display: flex;
    flex-direction: column;
    padding: 32px;
    order: 0;
  }
  .info-panel:last-of-type {
    order: 2;
  }
  .link-section {
    margin-top: auto;
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
    margin-right: 10px;
  }
  .iframe-wrapper {
    flex: 1 0 auto;
    order: 2;
  }

  @media screen and (min-width: 1400px) {
    .info-panel {
      padding: 60px;
    }
  }
</style>
