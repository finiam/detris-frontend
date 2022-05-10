<script lang="ts">
  import walletStore from "src/stores/wallet";
  import FallingBlock from "src/components/FallingBlock.svelte";
  import Grain from "src/components/Grain.svelte";
  import CtaButton from "./CtaButton.svelte";
  import Connect from "./Connect.svelte";
  import InfoModal from "./InfoModal.svelte";

  let showModal = false;

  function toggleModal() {    
    showModal = !showModal;
  }
</script>

<main>
  <div class="title-wrap">
    <h1 class="title title-shadow">DETRIS</h1>
    <h1 class="title title-main">DETRIS</h1>
  </div>

  <p class="subtitle">Playable NFT (no really, the NFT itself is a game)</p>

  {#if $walletStore.userAddress}
    <p class="name">Hi, {$walletStore.userAddress.substring(0, 20)}</p>
  {/if}

  {#if $walletStore.connected}
    <CtaButton />
  {:else}
    <Connect />
  {/if}

  <button type="button" class="info-btn" on:click={toggleModal}
    >How does it work?</button
  >

  {#if showModal}
    <InfoModal close={toggleModal} />
  {/if}

  <div class="bg">
    {#each { length: 6 } as _, index}
      <FallingBlock {index} />
      <Grain />
    {/each}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5% auto 0;
    height: 75vh;
    width: 80%;
    overflow: hidden;
    background-color: var(--dark-blue);
    border-radius: 20px 10px 50px 50px;
    box-shadow: inset 10px 10px 0 -5px #fff, inset -2px -2px 0 3px #fff;

    animation: glow 4s ease infinite alternate-reverse;
  }
  .title-wrap {
    position: relative;
    margin: 0 auto;
    z-index: 3;
  }
  .title {
    position: relative;
    margin: 0;
    font-size: 80px;
    color: var(--red);
    z-index: 2;
    letter-spacing: -0.02em;
  }
  .title-main {
    animation: glow 2s ease infinite alternate-reverse;
  }
  .title-shadow {
    position: absolute;
    top: 8px;
    left: 4px;
    color: #5ff2ef;
    filter: drop-shadow(2px 8px 0 #000);
  }
  .name {
    color: #fff;
    margin: 20px 0;
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
    color: #fff;
    margin: 40px 0;
    text-align: center;
    line-height: 1.4;
    max-width: 90%;
  }
  .bg {
    z-index: -1;
    pointer-events: none;
  }
  .info-btn {
    text-decoration: underline;
    border: 0;
    background: 0;
    color: #fff;
    margin: 40px 0 0;
    cursor: pointer;
  }

  @media screen and (min-width: 1000px) {
    .title {
      font-size: 120px;
    }
  }
</style>
