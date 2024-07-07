<script lang="ts">
  import { onMount } from "svelte";

  import { store, play, updateNextPopulation } from "./lib/store";
  import Settings from "./lib/Settings.svelte";
  import Life from "./lib/Life.svelte";
  import LifeCanvas from "./lib/LifeCanvas.svelte";
  import { LifetimeValues } from "./lib/constants";

  $: timeoutId = 0;
  $: msDelay = LifetimeValues[$store.lifetime].value;

  play.subscribe((value) => {
    console.log({ value });

    window.clearTimeout(timeoutId);
    window.cancelAnimationFrame(timeoutId);

    console.log({ msDelay: value ? msDelay : 0 });

    function loop() {
      updateNextPopulation();

      if (msDelay > 0) {
        timeoutId =
          msDelay < 16
            ? window.requestAnimationFrame(loop)
            : +window.setTimeout(loop, msDelay);
      }
    }

    if (value) {
      if (msDelay > 0) {
        loop();
      }
    } else {
      msDelay < 16
        ? window.cancelAnimationFrame(timeoutId)
        : window.clearTimeout(timeoutId);
    }
  });
</script>

<div>
  <h1>Game of Life, using Svelte</h1>
  <Settings />
  <hr />
  <div class:playing={$play}>
    {#if $store.renderer === "html"}
      <Life />
    {:else}
      <LifeCanvas />
    {/if}
  </div>
</div>

<style>
  :global(input),
  :global(select),
  :global(button),
  :global(textarea),
  :global(body) {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(body) {
    padding: 2rem;
  }

  :global(html) {
    font-size: 14px;
  }

  :global(input):not([type="range"]):not([type="checkbox"]),
  :global(label),
  :global(select),
  :global(button),
  :global(textarea) {
    margin: 0;
    border: 1px solid black;
    padding: 0;
    display: inline-block;
    vertical-align: middle;
    white-space: normal;
    background: none;
    appearance: none;

    border-radius: 0;
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
    font-weight: bold;

    box-sizing: content-box;
  }

  :global(hr) {
    border: none;
    height: 1px;
    background-color: black;
    margin: 2em 0;
  }

  .playing {
    pointer-events: none;
  }

  :global(button).secondary {
    font-weight: normal;
    border-color: #666666;
    color: #666666;
  }

  :global(h1) {
    font-size: 1.5rem;
    margin-top: 0;
  }
</style>
