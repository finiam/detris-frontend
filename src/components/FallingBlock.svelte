<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Shapes from "./Shapes.svelte";

  export let index: number;

  let x = 0;
  let y = 0;
  let interval;
  let randomVisible = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  let enterTimeout = index * 900;

  let colors = ["#ff5050", "#158CFA", "#F9F25D", "#D05DF9", "#5DF9DD", "#fff"];

  function initPosition() {
    x = Math.max((index * window.innerWidth) / 8, 20);
    y = Math.floor(Math.random() * 200) + -200;
  }

  function changePosition() {
    if (y < window.innerHeight - 300) {
      y += 50;
    } else {
      initPosition();
    }
  }

  onMount(() => {
    initPosition();

    setTimeout(() => {
      setInterval(changePosition, 900);
    }, enterTimeout);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div
  class="wrapper"
  style:top={`${y}px`}
  style:left={`${x}px`}
  style={`--rand: ${colors[index]}`}
>
  <Shapes shape={randomVisible} />
</div>

<style>
  .wrapper {
    position: absolute;
    width: 80px;
    opacity: 0.7;
    filter: drop-shadow(3px 3px 0 #111);
  }

  @media (min-width: 500px) {
    .wrapper {
      width: 120px;
    }
  }
  
  @media (min-width: 1440px) {
    .wrapper {
      width: 150px;
    }
  }
</style>
