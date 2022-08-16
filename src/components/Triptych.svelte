<script>
  import Block from "$components/Block.svelte";
  import ImageRaw from "$components/ImageRaw.svelte";
  
  export let text
</script>

<div class="w-full h-4/5 relative z-0">
  <div class="max-w-5xl h-4/5 mx-auto my-0 flex flex-col justify-between p-4">
    <div class="border-2 border-black max-w-2xl">
      <ImageRaw src="assets/img/madera.jpg" />
    </div>
    <div class="border-2 border-black max-w-xl self-end -m-96 mr-0">
      <ImageRaw src="assets/img/gardena.jpg" />
    </div>
    <div class="border-2 border-black max-w-xl -ml-12">
      <ImageRaw src="assets/img/gardena2.jpg" />
    </div>
    <Block>
      <p class="caption text-gray-500 mt-2">{@html text ?? ""}</p>
    </Block>
  </div>
</div>

<style>
  .caption {
    font-family: var(--sans);
  }
</style>