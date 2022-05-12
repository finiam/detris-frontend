<script lang="ts">
  export let shape: number;
</script>

{#if shape === 1}
  <!-- large square -->
  <svg
    width="318"
    height="271"
    viewBox="0 0 318 271"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="318" height="271" />
  </svg>
{:else if shape === 2}
  <!-- rectangle -->
  <svg
    width="318"
    height="113"
    viewBox="0 0 318 113"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="318" height="113" />
  </svg>
{:else if shape === 3}
  <!-- L shape -->
  <svg
    width="318"
    height="215"
    viewBox="0 0 318 215"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="318" height="113" />
    <rect
      x="205"
      y="215"
      width="215"
      height="113"
      transform="rotate(-90 205 215)"
    />
  </svg>
{:else if shape === 4}
  <!-- double L shape -->
  <svg
    width="318"
    height="317"
    viewBox="0 0 318 317"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="102" width="318" height="113" />
    <rect
      x="205"
      y="317"
      width="215"
      height="113"
      transform="rotate(-90 205 317)"
    />
    <rect y="215" width="215" height="113" transform="rotate(-90 0 215)" />
  </svg>
{/if}

<style>
  svg {
    max-width: 100%;
    max-height: 100%;
  }
  rect {
    fill: var(--rand);
  }
</style>
