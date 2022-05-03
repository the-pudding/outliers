<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let src;
  export let alt;
</script>

<Block {id} type="image">
  <img {src} {alt} />
</Block>
