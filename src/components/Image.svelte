<script>
  import Block from "$components/Block.svelte";
  import ImageRaw from "./ImageRaw.svelte";

  export let id;
  export let src
  export let alt;
  export let caption
</script>

<Block {id} type="image">
  <figure>
    <ImageRaw {src} alt={alt ?? caption} />
    <figcaption class="text-label text-sm text-gray-500">{caption ?? ""}</figcaption>
  </figure>
</Block>
