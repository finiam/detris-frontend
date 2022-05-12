<script>
  const imageSrc = `${window.location.href}images/metaCard.jpg`;
  const description =
    "DETRIS is a playful combination of playable NFT and puzzle game.";
</script>

<svelte:head>
  <title>Detris</title>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@wearefiniam" />
  <meta name="twitter:title" content="Detris" />
  <meta name="og:image" content={imageSrc} />
  <meta name="twitter:image" content={imageSrc} />
  <meta name="description" content={description} />
  <meta name="twitter:description" content={description} />
</svelte:head>
/>
