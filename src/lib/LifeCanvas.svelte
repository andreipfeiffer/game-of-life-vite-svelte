<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { store } from "./store";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;

  // Calculate width and height when population or size changes
  // Function to draw the canvas
  function drawCanvas() {
    // const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, $store.width * $store.size, $store.height * $store.size);

    ctx.fillStyle = 'black';
    for (let row = 0; row < $store.population.length; row++) {
      for (let col = 0; col < $store.population[row].length; col++) {
        if ($store.population[row][col]) {
          ctx.fillRect(col * $store.size, row * $store.size, $store.size, $store.size);
        }
      }
    }
  }

  // Draw on mount and whenever population or size changes
  onMount(() => {
    ctx = canvas.getContext('2d');
    console.log({ctx})
    drawCanvas();
  });

  afterUpdate(drawCanvas);
</script>

<canvas
  bind:this={canvas}
  class="canvas"
  width={$store.width * $store.size}
  height={$store.height * $store.size}
></canvas>

<style>
  .canvas {
    border: 1px black solid;
  }
</style>