<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let src = "https://via.placeholder.com/800x300";
  export let alt;
</script>

<Block {id} type="image">
  <img {src} {alt} />
</Block>
