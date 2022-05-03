<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;
</script>

<Block {id} type="subhead">
  <h2 class="text-xl">{@html text}</h2>
</Block>
