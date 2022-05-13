<script lang="ts">
  import { onMount } from "svelte";
  import Zdog from "zdog";

  /* let colors = ["#ff5050", "#158CFA", "#F9F25D", "#D05DF9", "#5DF9DD", "#fff"]; */

  let spinning = true;

  let blockSize = 50;
  let blockOffset = blockSize + 5;

  let colors = {
    red: {
      primary: "#ff5050",
      darker: "#db4040",
    },
    blue: {
      primary: "#158CFA",
      darker: "#156fc2",
    },
  };

  onMount(() => {
    let illo = new Zdog.Illustration({
      element: ".zcanvas",
      dragRotate: true,
      onDragStart: () => {
        spinning = false;
      },
    });

    function cube(color: string, options?: Record<string, any>) {
      return new Zdog.Box({
        addTo: illo,
        width: blockSize,
        height: blockSize,
        depth: blockSize,
        stroke: false,
        color: colors[color].primary,
        leftFace: colors[color].primary,
        rightFace: colors[color].darker,
        topFace: colors[color].primary,
        bottomFace: colors[color].darker,
        backface: colors[color].darker,
        ...options,
      });
    }

    function addPiece1() {
      let piece = new Zdog.Anchor({
        addTo: illo,
      });

      let cube1 = cube("red", {
        addTo: piece,
        translate: { x: blockOffset },
      });
      let cube2 = cube("red", {
        addTo: piece,
      });
      let cube3 = cube("red", {
        addTo: piece,
        translate: { x: -blockOffset },
      });
      let cube4 = cube("red", {
        addTo: piece,
        translate: { x: -blockOffset, y: -blockOffset },
      });

      piece.rotate.x = -0.15;

      return piece;
    }

    const piece1 = addPiece1();

    function addPiece2() {
      let piece = new Zdog.Anchor({
        addTo: illo,
      });

      let p_cube1 = cube("blue", {
        addTo: piece,
        translate: { x: blockOffset },
      });
      let cube2 = cube("blue", {
        addTo: piece,
      });
      let cube3 = cube("blue", {
        addTo: piece,
        translate: { x: -blockOffset },
      });
      let cube4 = cube("blue", {
        addTo: piece,
        translate: { x: 0, y: blockOffset },
      });

      piece.translate.x = -200;
      piece.rotate.x = -0.15;

      return piece;
    }

    const piece2 = addPiece2();

    function animate() {
      if (spinning) {
        piece1.rotate.y += 0.03;
        piece2.rotate.y += 0.03;
      }

      illo.updateRenderGraph();
      // animate next frame
      requestAnimationFrame(animate);
    }
    // start animation
    animate();
  });
</script>

<div class="wrapper">
  <canvas class="zcanvas" width="600" height="600" />
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  canvas {
    margin: auto;
  }
</style>
