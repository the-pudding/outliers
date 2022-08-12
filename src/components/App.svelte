<script>
  import copy from "$data/doc.json";

  import Text from "$components/Text.svelte";
  import Subhead from "$components/Subhead.svelte";
  import Image from "$components/Image.svelte";
  import Mapbox from "$components/Mapbox.svelte";
  import Hero from "$components/Hero.svelte";
  import Map from "$components/Map.svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import Header from "$components/Header.svelte";
  import Mobility from "$components/Mobility.svelte";

  const blocks = {
    text: Text,
    image: Image,
    subhead: Subhead,
    mapbox: Mapbox,
    map: Map,
    hero: Hero
  };

  export let introScrollValue;
  export let mobilityScrollValue
  export let id;
</script>

<article>
  <!-- Display header -->
  <Hero>
    <div class="flex flex-col">
      <Header />
      <h1 class="text-5xl mb-4">{copy.title}</h1>
      <p class="text-2xl mb-2">{copy.description}</p>
      <p class="text-base">
        By <a class="underline" href="https://pudding.cool" title={copy.byline}>{copy.byline}</a>
      </p>
    </div>
  </Hero>
  <!-- Intro -->
  <section id="intro" class="relative">
    <div id="map" class="sticky top-0">
      {#if introScrollValue === undefined || introScrollValue < 2}
        <div id="intro" class="bg-black text-white h-screen" />
      {/if}
      <Mapbox index={introScrollValue} />
    </div>
    <div class="spacer" />
    <Scrolly bind:value={introScrollValue} bind:id>
      {#each copy.slides as slide, i}
        <div class="step" class:active={introScrollValue === i}>
          <div
            class="bg-slate-100 mx-auto px-4 py-2 border-2 border-slate-100 rounded md:w-7/12 sm:w-11/12 text-lg"
          >
            <svelte:component
              this={blocks[slide.block] ?? Text}
              id={slide.id ?? `slide-${i}`}
              {...slide}
            />
          </div>
        </div>
      {/each}
    </Scrolly>
    <div class="spacer" />
  </section>
  <!-- text before mobility chart -->
  <section id="text" class="px-4">
    {#each copy.blocks as props, i}
      <svelte:component
        this={blocks[props.block] ?? Text}
        id={props.id ?? `graf-${i}`}
        {...props}
      />
    {/each}
  </section>
  <!-- Mobility chart -->
  <section id="mobility" class="relative">
    <div id="chart2" class="sticky top-0">
      <Mobility />
    </div>
    <Scrolly bind:value={mobilityScrollValue} bind:id>
      {#each copy.slides2 as slide, i}
        <div class="step" class:active={mobilityScrollValue === i}>
          <div
            class="bg-slate-100 mx-auto px-4 py-2 border-2 border-slate-100 rounded md:w-7/12 sm:w-11/12 text-lg"
          >
            <svelte:component
              this={blocks[slide.block] ?? Text}
              id={slide.id ?? `slide-${i}`}
              {...slide}
            />
          </div>
        </div>
      {/each}
    </Scrolly>
  </section>
  <!-- conclusion text -->
  <section id="text-2" class="px-4">
    {#each copy.blocks2 as props, i}
      <svelte:component
        this={blocks[props.block] ?? Text}
        id={props.id ?? `graf-${i}`}
        {...props}
      />
    {/each}
  </section>
</article>

<style>
  .spacer {
    height: 75vh;
  }

  .step {
    height: 125vh;
  }
</style>
