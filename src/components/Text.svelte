<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;
</script>

<Block {id} type="text">
  <p>{@html text}</p>
</Block>
