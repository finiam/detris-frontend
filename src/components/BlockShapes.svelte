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

<div class="wrapper">
  <p class="message" style:opacity={minting ? 1 : 0}>MINTING YOUR NFT</p>
  <canvas
    class="zcanvas"
    width={window.innerWidth}
    height={window.innerHeight}
  />
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .message {
    position: absolute;
    top: 20%;
    text-align: center;
    font-size: 32px;
    color: #fff;

    transition: opacity 0.5s 1s ease;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  canvas {
    margin: auto;
  }
</style>
