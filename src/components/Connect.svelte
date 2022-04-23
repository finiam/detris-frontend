<script lang="ts">
  import contractStore from "../store/contract";
  import walletStore from "../store/wallet";

  async function handleClick() {
    if (!$walletStore.connected) {
      walletStore.connect("metamask");

      return;
    }
  }
</script>

<p>Connect to play</p>
<div>
  <button type="button" on:click={handleClick}> METAMASK </button>
  <button type="button" on:click={handleClick}> WALLET CONNECT </button>
</div>

<style>
  p {
    color: #fff;
  }
  div {
    display: flex;
    gap: 16px;
  }
  button {
    font-size: 18px;
    padding: 20px 40px;
    color: #000;
    border: 0;
    border-radius: 4px;
    background: var(--red);
    cursor: pointer;
    box-shadow: inset 2px 2px 0 0px #ffffffdd;
    filter: drop-shadow(5px 5px 1px #000);

    transition: transform 0.5s ease;
  }
  button:hover {
    transform: scale(1.05);
  }
</style>
