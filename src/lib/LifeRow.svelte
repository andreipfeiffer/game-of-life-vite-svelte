<script>
  import LifeCell from "./LifeCell.svelte";

  export let row;
</script>

<div class="row">
  {#each row as cell}
    <LifeCell alive={cell} />
  {/each}
</div>
