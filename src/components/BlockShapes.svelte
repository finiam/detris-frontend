<script lang="ts">
  import { onMount } from "svelte";
  import { ShapeAnimation } from "src/lib/zdog";

  export let minting: boolean;

  onMount(() => {
    const animation = new ShapeAnimation(".zcanvas");

    animation.addShape("Z", "blue");
    animation.addShape("I", "red");
    animation.addShape("T", "yellow");
    animation.addShape("O", "purple");
    animation.addShape("L", "teal");

    animation.animate();
  });
</script>

<section class="root" class:moveCentre={minting}>
  <div class="canvas-wrapper">
    <p class="message" style:opacity={minting ? 1 : 0}>MINTING YOUR NFT</p>
    <canvas
      class="zcanvas"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  </div>
</section>

<style>
  .root {
    position: absolute;
    width: 100vw;
    height: 100vh;
    transform: translateY(200%);

    transition: transform 0.8s ease;
  }
  .canvas-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .zcanvas {
    margin: auto;
  }
  .message {
    position: absolute;
    top: 20%;
    text-align: center;
    font-size: 32px;
    color: #fff;

    transition: opacity 0.5s 1s ease;
  }
  .moveCentre {
    transform: translateY(0);
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
