<script lang="ts">
  export let message: string;
</script>

<div>
  <p class="message">{message}</p>
  <div class="loader">
    <div class="solid" />
  </div>
</div>

<style>
  .loader {
    position: relative;
    display: flex;
    margin: auto;
    height: 34px;
    width: 136px;
    border: 2px solid #fff;
  }
  .message {
    width: 100%;
    color: #fff;
    text-transform: uppercase;
  }
  .solid {
    position: absolute;
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    background: #fff;

    animation: move 5s steps(1) infinite;
  }

  @keyframes move {
    0% {
      left: 0;
    }
    25% {
      left: 25%;
    }
    50% {
      left: 50%;
    }
    75% {
      left: 75%;
    }
  }
</style>
