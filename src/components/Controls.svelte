<section class="controls">
  <div class="keyrow">
    <div class="keycap">W</div>
  </div>
  <div class="keyrow">
    <div class="keycap">A</div>
    <div class="keycap">S</div>
    <div class="keycap">D</div>
  </div>
</section>

<style>
  .controls {
    margin-bottom: 40px;
    width: fit-content;
    color: #fff;
  }
  .keyrow {
    display: flex;
    justify-content: center;
  }
  .keycap {
    position: relative;
    margin: 5px;
    width: 32px;
    height: 32px;
    text-align: center;
    font-family: var(--sans-font);
    font-weight: 500;
    font-size: 20px;
    color: #fff;
    background: #000;
    border: 2px solid #fff;
    border-radius: 4px;
  }
  .keycap::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 5px;
    left: 5px;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
    border-radius: 4px;
  }
</style>
