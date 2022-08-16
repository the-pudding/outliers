<script>
  import Header from "$components/Header.svelte";
  import ImageRaw from "./ImageRaw.svelte";

  import copy from "$data/doc.json";

</script>

<div class="w-full relative z-50 h-4/5 py-4 mb-6 green">
  <!-- <div class="absolute w-full"> -->
    <Header />
  <!-- </div> -->
  
  <div class="w-full h-full flex justify-center items-center px-4">
    <div class="w-1/3">
      <h1 class="text-5xl mb-4 text-white">{copy.title}</h1>
      <p class="text-lg mb-2 text-white">{copy.description}</p>
      <p class="text-base text-white">
        By <a class="underline" href="https://pudding.cool" title={copy.byline}>{copy.byline}</a>
      </p>
    </div>
  
    <div class="w-2/3 min-h-[700px]">
      <!-- assets/img/hero.jpg -->
      <div class=" border-2 border-black">
        <ImageRaw src="assets/img/hero.jpg" />
      </div>
    </div>

  </div>
</div>

<style>
  .green {
    background-color: #7cb68c;
  }
</style>
