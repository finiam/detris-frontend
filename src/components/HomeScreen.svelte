<script lang="ts">
  import walletStore from "src/stores/wallet";
  import CtaButton from "./CtaButton.svelte";
  import Connect from "./Connect.svelte";
  import appState from "src/stores/appState";
  import BlockShapes from "./BlockShapes.svelte";
  import HomeScreenBg from "./HomeScreenBg.svelte";
  import { link } from "svelte-navigator";
  import SoldOut from "./SoldOut.svelte";

  $: minting = $appState.state === "minting";
</script>

<main class:moveUp={minting}>
  <div class="title-wrap">
    <h1 class="title title-shadow">DETRIS</h1>
    <h1 class="title title-main">DETRIS</h1>
  </div>

  <p class="subtitle">Playable NFT (no really, the NFT itself is a game)</p>

  {#if $walletStore.userAddress}
    <p class="name">Hi, {$walletStore.userAddress.substring(0, 15)}</p>
  {/if}

  {#if $appState.minted === 101}
    <SoldOut />
  {:else if $walletStore.userAddress}
    <CtaButton />
  {:else}
    <Connect />
  {/if}

  <a class="info-btn" href="/about" use:link>About</a>

  <HomeScreenBg />
</main>

<BlockShapes {minting} />

<style>
  main {
    display: flex;
    align-self: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 75vh;
    width: 80%;
    max-width: 1200px;
    max-height: 800px;
    overflow: hidden;
    background-color: var(--dark-blue);
    border-radius: 20px 10px 50px 50px;
    box-shadow: inset 10px 10px 0 -5px #fff, inset -2px -2px 0 3px #fff;
    transition: transform 0.8s ease;

    animation: glow 4s ease infinite alternate-reverse;
  }
  .moveUp {
    transform: translateY(-200%);
  }
  .title-wrap {
    position: relative;
    margin: 0 auto;
    z-index: 3;
  }
  .title {
    position: relative;
    margin: 0;
    font-size: 40px;
    color: var(--red);
    z-index: 2;
    letter-spacing: -0.02em;
  }
  .title-main {
    animation: glow 2s ease infinite alternate-reverse;
  }
  .title-shadow {
    position: absolute;
    top: 2px;
    left: 2px;
    color: #5ff2ef;
    filter: drop-shadow(0px 2px 0 #000);
  }
  .name {
    color: #fff;
    margin: 20px 0;
    text-align: center;
  }
  @keyframes glow {
    0% {
      filter: drop-shadow(5px 5px 20px #ffffffcc);
    }
    100% {
      filter: drop-shadow(10px 10px 15px #ffffff44);
    }
  }
  .subtitle {
    margin: 40px 0;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 1.4;
    max-width: 90%;
  }

  .info-btn {
    text-decoration: underline;
    border: 0;
    background: 0;
    color: #fff;
    margin: 40px 0 0;
    cursor: pointer;
  }

  @media screen and (min-width: 500px) {
    .title {
      font-size: 80px;
    }
    .title-shadow {
      top: 8px;
      left: 4px;
      filter: drop-shadow(2px 8px 0 #000);
    }
    .subtitle {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 1000px) {
    .title {
      font-size: 120px;
    }
  }
</style>
