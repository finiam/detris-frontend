<script>
  import { onMount, onDestroy } from "svelte";

  let x = 0;
  let y = 0;
  let interval;

  const randomPos = () => {
    let minX = window.innerWidth / 5;

    let randX = Math.floor(Math.random() * (minX * 3 - minX + 1)) + minX;
    let randY =
      Math.floor(Math.random() * (window.innerHeight - 100 + 1)) + 100;

    return { randX, randY };
  };

  function changePosition() {
    const randPos = randomPos();

    x = randPos.randX;
    y = randPos.randY;
  }

  onMount(() => {
    changePosition();
    setInterval(changePosition, 1500);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div style:top={`${y}px`} style:left={`${x}px`} />

<style>
  div {
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #fff;
  }
</style>
