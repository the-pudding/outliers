<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;

  export let grafs = text.split("\n");

  const dropcap = id === "dropcap"
</script>

<Block {id} type="text">
  {#each grafs as graf}
    <p class:dropcap class="mb-5 text-lg">{@html graf}</p>
  {/each}
</Block>

<style>
  p.dropcap:first-letter {
    font-size: 3rem;
    line-height: 1;

    padding-right: 0.2rem;
    padding-left: 0.1rem;
  }
</style>