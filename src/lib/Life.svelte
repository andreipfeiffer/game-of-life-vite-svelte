<script>
  import { store } from "./store";
  import LifeRow from "./LifeRow.svelte";

  const SIZE_THRESHOLD = 15;

  // Class binding for dynamic styles
  $: lifeClass = `life ${$store.size < SIZE_THRESHOLD ? "small-size" : ""}`;
</script>

<div class={lifeClass} style="--size: {$store.size}px">
  {#each $store.population as row}
    <LifeRow {row} />
  {/each}
</div>

<style>
  :global(.life) {
    border-collapse: collapse;
    font-size: 0;
    display: flex;
    flex-direction: column;
    width: fit-content;
    box-shadow: 0 0 0 1px#00000022;
  }
  :global(.life.small-size) {
    border: 1px black solid;
    box-shadow: none;
  }

  :global(.row) {
    display: flex;
  }

  :global(.cell) {
    display: inline-block;
    background-color: white;
    box-shadow: inset 0 0 0 1px#00000022;
    padding: 0;
    width: var(--size);
    height: var(--size);
  }
  :global(.cell-alive) {
    background-color: black;
  }
  :global(.small-size .cell) {
    box-shadow: none;
    margin: 0;
  }
</style>
