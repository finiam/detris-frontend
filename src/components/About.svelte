<script>
  import { ArrowLeftCircleIcon } from "svelte-feather-icons";
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
</style>
