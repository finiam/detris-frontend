<script lang="ts">
  import { onMount } from "svelte";
  import { ShapeAnimation } from "src/lib/zdog";

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
  canvas {
    margin: auto;
  }
</style>
