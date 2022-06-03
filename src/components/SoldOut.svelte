<script>
  import { ExternalLinkIcon } from "svelte-feather-icons";
</script>

<div class="root">
  <p class="soldout">Sold out</p>
  <a
    class="link"
    href="https://opensea.io/collection/detris"
    target="_blank"
    rel="noreferrer noopener"
  >
    <span>View on Opensea</span>
    <ExternalLinkIcon size="20" />
  </a>
</div>

<style>
  .root {
    text-align: center;
    color: #fff;
  }
  .soldout {
    font-size: 20px;
  }
  .link {
    display: flex;
    align-items: center;
    font-family: var(--sans-font);
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: white;
  }
  .link span {
    margin-right: 10px;
  }
</style>
