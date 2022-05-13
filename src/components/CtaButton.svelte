<script lang="ts">
  import appState from "src/stores/appState";
  import contractStore from "src/stores/contract";
  import walletStore from "src/stores/wallet";

  async function handleClick() {    
    if ($walletStore.balance > 0) {
      // show owned nft
      appState.getAddressData();
    } else {
      //mint
      await contractStore.safeMint();
    }
  }
</script>

<button
  class="button"
  type="button"
  on:click={handleClick}
  disabled={$walletStore.loading}
>
  {#if $walletStore.loading}
    LOADING...
  {:else}
    {#if $walletStore.connected && !$walletStore.balance}
      MINT TO PLAY
    {/if}

    {#if $walletStore.connected && $walletStore.balance}
      PLAY YOUR NFT
    {/if}
  {/if}
</button>
<p class="message">{$contractStore.message}</p>

<style>
  .button {
    font-size: 14px;
    padding: 8px 10px;
    color: #000;
    border: 0;
    border-radius: 4px;
    background: var(--red);
    cursor: pointer;
    box-shadow: inset 2px 2px 0 0px #ffffffdd;
    filter: drop-shadow(5px 5px 1px #000);

    transition: transform 0.5s ease;
  }
  .button:hover {
    transform: scale(1.05);
  }
  .message {
    color: #fff;
  }

  @media screen and (min-width: 500px) {
    .button {
      font-size: 18px;
      padding: 20px 40px;
    }
  }
</style>
