<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;
</script>

<Block {id} type="subhead">
  <h2 class="font-bold mt-6 mb-8 text-3xl">{@html text}</h2>
</Block>
