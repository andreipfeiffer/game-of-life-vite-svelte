<script lang="ts">
  import { onMount } from "svelte";
  import { getInitialState } from "./utils";
  import { store, play, updateNextPopulation } from "./store";

  import { getPresets } from "./presets";
  import { DEFAULT_SIZE, LifetimeValues } from "./constants";

  const presets = getPresets();

  function loadPreset(id: string) {
    const newPreset = presets.find((p) => p.id === id);

    if (!newPreset) {
      return;
    }

    const newWidth = newPreset?.width || $store.width;
    const newHeight = newPreset?.height || $store.height;
    const newSize = newPreset?.size || DEFAULT_SIZE;

    $store.width = newWidth;
    $store.height = newHeight;
    $store.size = newSize;
    $store.preset = id;
    $store.population = getInitialState(newPreset.grid, newWidth, newHeight);

    localStorage.setItem("presetId", id);
  }

  onMount(() => {
    const initialPreset = localStorage.getItem("presetId") || "";
    if (initialPreset) loadPreset(initialPreset);
  });
</script>

<div>
  Preset:
  <select
    bind:value={$store.preset}
    on:change={(e) => loadPreset(e.target.value)}
  >
    <option value="">Select a preset</option>
    {#each presets as preset}
      <option value={preset.id}>{preset.description}</option>
    {/each}
  </select>

  <select
    bind:value={$store.renderer}
    on:change={(e) => ($store.renderer = e.target.value)}
    style="margin-left: -1px;"
  >
    <option value="html">HTML</option>
    <option value="canvas">Canvas</option>
  </select>

  Width:
  <input
    type="number"
    bind:value={$store.width}
    on:input={(e) => ($store.width = e.target.valueAsNumber)}
    class="input"
  />

  Height:
  <input
    type="number"
    bind:value={$store.height}
    on:input={(e) => ($store.height = e.target.valueAsNumber)}
    class="input"
  />

  Size:
  <input
    type="number"
    bind:value={$store.size}
    on:input={(e) => ($store.height = e.target.valueAsNumber)}
    class="input"
  />

  <br /><br />

  <div style="display: flex; align-items: center;">
    <button on:click={() => updateNextPopulation()}>Next</button>

    &nbsp;

    <button on:click={() => ($play = !$play)}>{$play ? "Stop" : "Play"}</button>

    {#if $store.preset}
      <button
        on:click={() => loadPreset($store.preset)}
        style="margin-left: -1px;">↺</button
      >
    {/if}

    <input
      type="range"
      bind:value={$store.lifetime}
      min={1}
      max={5}
      on:input={(e) => ($store.lifetime = e.target.value)}
      list="lifetime-options"
      style="margin: 0 1em;"
    />

    <datalist id="lifetime-options">
      {#each Object.entries(LifetimeValues) as [k, v]}
        <option value={k} label={v.label} />
      {/each}
    </datalist>

    <div>{LifetimeValues[$store.lifetime].label}</div>
  </div>
</div>

<style>
  .input {
    width: 50px;
    margin: 0 5px;
  }
</style>
