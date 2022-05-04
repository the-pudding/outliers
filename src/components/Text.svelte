<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;

  export let grafs = text.split("\n");
</script>

<Block {id} type="text">
  {#each grafs as graf, i}
    <p class="mb-4">{@html graf}</p>
  {/each}
</Block>
