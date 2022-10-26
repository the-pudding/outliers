<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;
</script>

<Block {id} type="subhead">
  <h2 class="font-bold text-3xl">{@html text}</h2>
</Block>

<style>
  h2 {
    margin: 6rem 0 2rem 0;
    font-size: 3rem;
  }
</style>
