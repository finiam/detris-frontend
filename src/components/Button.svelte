<script lang="ts">
  import walletStore from "../store/wallet";

  function handleClick() {
    if ($walletStore.balance) {
      // show owned nft
    } else {//mint
    }
  }
</script>

<button type="button" on:click={walletStore.connect}>
  {#if !$walletStore.connected}
    CONNECT TO PLAY
  {/if}

  {#if $walletStore.connected && !$walletStore.balance}
    MINT TO PLAY
  {/if}

  {#if $walletStore.connected && $walletStore.balance}
    PLAY YOUR NFT
  {/if}
</button>

<style>
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
