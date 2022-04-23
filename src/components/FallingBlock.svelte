<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let index: number;

  let x = 0;
  let y = 0;
  let interval;
  let randomVisible = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  let enterTimeout = index * 600;
  let visible = false;

  let colors = ["#ff5050", "#158CFA", "#F9F25D", "#D05DF9", "#5DF9DD", "#fff"];

  const randomPosX = () => {
    let minX = window.innerWidth / 5;

    return Math.floor(Math.random() * (minX * 3 - minX + 1)) + minX;
  };

  function initPosition() {
    y = 100;
    x = randomPosX();
  }

  function changePosition() {
    if (y < window.innerHeight - 100) {
      y += 50;
    } else {
      initPosition();
    }
  }

  onMount(() => {
    initPosition();

    setTimeout(() => {
      visible = true;
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
  style:display={visible ? "block" : "none"}
  style={`--rand: ${colors[index]}`}
>
  <!-- large square -->
  <svg
    style:display={randomVisible === 1 ? "block" : "none"}
    width="318"
    height="271"
    viewBox="0 0 318 271"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="318" height="271" />
  </svg>

  <!-- rectangle -->
  <svg
    style:display={randomVisible === 2 ? "block" : "none"}
    width="318"
    height="113"
    viewBox="0 0 318 113"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="318" height="113" />
  </svg>

  <!-- L shape -->
  <svg
    style:display={randomVisible === 3 ? "block" : "none"}
    width="318"
    height="215"
    viewBox="0 0 318 215"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="318" height="113" />
    <rect
      x="205"
      y="215"
      width="215"
      height="113"
      transform="rotate(-90 205 215)"
    />
  </svg>

  <!-- double L shape -->
  <svg
    style:display={randomVisible === 4 ? "block" : "none"}
    width="318"
    height="317"
    viewBox="0 0 318 317"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="102" width="318" height="113" />
    <rect
      x="205"
      y="317"
      width="215"
      height="113"
      transform="rotate(-90 205 317)"
    />
    <rect y="215" width="215" height="113" transform="rotate(-90 0 215)" />
  </svg>
</div>

<style>
  .wrapper {
    position: absolute;
    width: 100px;
    opacity: 0.7;
    filter: drop-shadow(3px 3px 0 #111);
  }
  svg {
    max-width: 100%;
    max-height: 100%;
  }
  rect {
    fill: var(--rand);
  }
</style>
