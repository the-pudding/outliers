<script>
  import Block from "$components/Block.svelte";
  import ImageRaw from "$components/ImageRaw.svelte";
  
  export let text
</script>

  <div class="w-full relative z-0 max-w-5xl h-4/5 mx-auto my-0 flex flex-col justify-between p-8">
    <div class="border-2 border-black md:max-w-2xl md:ml-12">
      <ImageRaw src="assets/img/madera.jpg" />
    </div>
    <div class="border-2 border-black md:max-w-xl md:self-end md:-m-96 md:mr-0">
      <ImageRaw src="assets/img/gardena.jpg" />
    </div>
    <div class="border-2 border-black md:max-w-xl md:-ml-0">
      <ImageRaw src="assets/img/gardena2.jpg" />
    </div>
    <Block>
      <p class="text-label mt-2">{@html text ?? ""}</p>
    </Block>
  </div>

  <style>
    .text-label {
      font-family: var(--dubois);
      text-transform: uppercase;
      color: var(--color-off-white);
      font-size: 14px;
    }
  </style>
