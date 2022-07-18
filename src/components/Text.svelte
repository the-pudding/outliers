<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;

  export let grafs = text.split("\n");
</script>

<Block {id} type="text">
  {#each grafs as graf}
    <p class="mb-5 text-lg">{@html graf}</p>
  {/each}
</Block>
