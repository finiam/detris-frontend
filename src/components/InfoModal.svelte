<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let close;

  function handleClose(event: KeyboardEvent) {
    console.log(event.code);

    if (event.code === "Escape") {
      close();
    }
  }

  onMount(() => {
    document.addEventListener("keyup", handleClose);
  });

  onDestroy(() => {
    document.removeEventListener("keyup", handleClose);
  });
</script>

<div class="wrapper">
  <div class="modal">
    <h2>How this thing works</h2>
    <p>Because it's a miracle</p>
  </div>
</div>

<style>
  .wrapper {
    position: fixed;
    background: #000000cc;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  .modal {
    width: 70%;
    margin: 5% auto;
    background: #eee;
    padding: 20px 40px;
    color: var(--dark-blue);
  }
</style>
