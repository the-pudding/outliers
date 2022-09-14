<script>
  import Header from "$components/Header.svelte";
  import ImageRaw from "./ImageRaw.svelte";

  import copy from "$data/doc.json";

</script>

<div class="w-full relative z-50 h-4/5 py-4 mb-6 green">
  <!-- <div class="absolute w-full"> -->
    <Header />
  <!-- </div> -->
  
  <div class="w-full h-full flex max-w-7xl my-0 mx-auto justify-center items-center px-4 flex-wrap-reverse">
    <div class="md:w-1/3 p-4">
      <h1 class="text-5xl mb-4 text-white">{copy.title}</h1>
      <p class="text-lg mb-4 text-white">{copy.description}</p>
      <p class="text-base text-white">
        By <a class="text-white" href="https://pudding.cool" title={copy.byline}>{copy.byline}</a>
      </p>
    </div>
  
    <div class="md:w-2/3 lg:min-h-[700px] flex items-center ">
      <!-- assets/img/hero.jpg -->
      <div class=" border-2 border-black">
        <ImageRaw src="assets/img/hero.jpg" />
      </div>
    </div>

  </div>
</div>

<style>
  .green {
    background-color: var(--color-hero);
  }
</style>
