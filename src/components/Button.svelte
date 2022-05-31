<button class="button" {...$$restProps} on:click>
  <slot />
</button>

<style>
  .button {
    font-size: 14px;
    line-height: 1.2;
    padding: 8px 10px;
    color: #000;
    border: 0;
    border-radius: 4px;
    background: var(--red);
    cursor: pointer;
    box-shadow: inset 2px 2px 0 0px #ffffffdd;
    filter: drop-shadow(5px 5px 1px #000);

    transition: transform 0.3s ease;
  }
  .button:hover {
    transform: scale(1.05);
  }
  .button:disabled {
    opacity: 0.8;
    pointer-events: none;
  }

  @media screen and (min-width: 500px) {
    .button {
      font-size: 18px;
      padding: 20px 40px;
    }
  }
</style>
