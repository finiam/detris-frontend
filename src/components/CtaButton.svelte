<script lang="ts">
  import gameStore from "../store/state";
  import contractStore from "../store/contract";
  import walletStore from "../store/wallet";

  async function handleClick() {
    if ($walletStore.balance > 0) {
      // show owned nft
      gameStore.getAddressData();
    } else {
      //mint
      contractStore.safeMint();
    }
  }
</script>

<button type="button" on:click={handleClick}>
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
