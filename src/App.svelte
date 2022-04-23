<script lang="ts">
  import FallingBlock from "./components/FallingBlock.svelte";
  import walletStore from "./store/wallet";
</script>

<main>
  <div class="title-wrap">
    <h1 class="title shadow-title">ZETRIS</h1>
    <h1 class="title">ZETRIS</h1>
  </div>
  <p class="subtitle">Playable NFT (no really, the NFT is a game)</p>

  <div class="bg">
    {#each { length: 6 } as _}
      <FallingBlock />
    {/each}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .title-wrap {
    position: relative;
    margin: 0 auto;
    z-index: 3;
  }
  .title {
    position: relative;
    margin: 0;
    font-size: 120px;
    color: var(--red);
    z-index: 2;
    letter-spacing: -0.02em;

    animation: glow 4s ease infinite alternate-reverse;
  }
  .shadow-title {
    position: absolute;
    top: 8px;
    left: 4px;
    color: #5ff2ef;
    filter: drop-shadow(2px 8px 0 #000);
  }
  @keyframes glow {
    0% {
      filter: drop-shadow(5px 5px 20px #ffffff44);
    }
    100% {
      filter: drop-shadow(10px 10px 15px #ffffff44);
    }
  }
  .subtitle {
    color: #fff;
    margin: 40px 0;
  }
  .bg {
    opacity: 0.5;
  }
</style>
