<script>
  import {
    ArrowLeftCircleIcon,
    ExternalLinkIcon,
    TwitterIcon,
  } from "svelte-feather-icons";
  import { link } from "svelte-navigator";
</script>

<div class="root">
  <nav>
    <a href="/" class="back-btn" use:link>
      <ArrowLeftCircleIcon size="20" />
      <span>Back</span>
    </a>
  </nav>
  <h1>About Detris</h1>
  <div class="body">
    <p>We Finiam. Finiam good.</p>

    <a
      class="link"
      href="https://finiam.com"
      target="_blank"
      rel="noreferrer noopener"
    >
      <ExternalLinkIcon size="20" />
      <span> finiam.com </span>
    </a>

    <a
      class="link"
      href="https://twitter.com/wearefiniam"
      target="_blank"
      rel="noreferrer noopener"
    >
      <TwitterIcon size="20" />
      <span> wearefiniam </span>
    </a>
  </div>
</div>

<style>
  .root {
    margin: 10% auto;
    width: 500px;
    max-width: 90%;
    color: #fff;
  }
  .body {
    margin: 20px 0;
  }
  .body p {
    font-family: var(--sans-font);
    font-size: 18px;
    letter-spacing: 0.04em;
  }
  .back-btn {
    display: flex;
    text-decoration: none;
    font-family: var(--sans-font);
    color: #fff;
  }
  .back-btn span {
    margin-left: 10px;
  }
  .link {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-family: var(--sans-font);
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: white;
  }
  .link span {
    margin-left: 10px;
  }
  .link:first-of-type {
    margin-top: 40px;
  }
</style>
