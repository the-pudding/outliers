<script>
  import Block from "$components/Block.svelte";
  import loadImage from "$utils/loadImage";
  import ImageRaw from "./ImageRaw.svelte";

  const isDev = process.env.NODE_ENV === "development";
  const placeholder = "https://via.placeholder.com/800x300";

  const rootpath = isDev ? "/" : "/tbd/"

  export let id;
  export let src
  export let alt;
</script>

<Block {id} type="image">
  <ImageRaw {src} {alt} />
</Block>
