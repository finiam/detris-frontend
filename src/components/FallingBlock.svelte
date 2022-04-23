<script>
  import { onDestroy, onMount } from "svelte";

  let x = 0;
  let y = 0;
  let interval;
  let randomVisible = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  let enterTimeout = Math.floor(Math.random() * (5000 - 1000 + 1000)) + 1000;

  let colors = ["#ff5050", "#158CFA", "#F9F25D", "#D05DF9"];

  const randomPos = () => {
    let randX = Math.floor(Math.random() * (window.innerWidth - 10 + 1)) + 10;
    let randY =
      Math.floor(Math.random() * (window.innerHeight / 2 - 10 + 1)) + 10;

    return { randX, randY };
  };

  function initPosition() {
    const randPos = randomPos();

    x = randPos.randX;
    y = randPos.randY;
  }

  function changePosition() {
    if (y < window.innerHeight) {
      y += 50;
    } else {
      initPosition();
    }
  }

  onMount(() => {
    initPosition();

    setTimeout(() => {
      setInterval(changePosition, 500);
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
  style={`--rand: ${colors[randomVisible]}`}
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
    left: -100px;
  }
  svg {
    max-width: 100%;
    max-height: 100%;
  }
  rect {
    fill: var(--rand);
  }
</style>
