<script>
  import copy from "$data/doc.json";

  import Text from "$components/Text.svelte";
  import Subhead from "$components/Subhead.svelte";
  import Image from "$components/Image.svelte";
  import Mapbox from "$components/Mapbox.svelte";
  import Hero from "$components/Hero.svelte";
  import Map from "$components/Map.svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import Mobility from "$components/Mobility.svelte";
  import Triptych from "./Triptych.svelte";
import RadialChart from "./RadialChart.svelte";

  const blocks = {
    text: Text,
    image: Image,
    subhead: Subhead,
    mapbox: Mapbox,
    map: Map,
    hero: Hero,
    triptych: Triptych
  };

  export let introScrollValue;
  export let mobilityScrollValue
  export let id;
</script>

<article class="bg-custom">
  <!-- Display header -->
  <Hero />
  <!-- Intro -->
  <section class="px-4">
    {#each copy.intro as props, i}
      <svelte:component
        this={blocks[props.block] ?? Text}
        id={props.id ?? `graf-${i}`}
        {...props}
      />
    {/each}
  </section>
  <!-- scrolly -->
  <section class="relative">
    <div id="map" class="sticky top-0">
      <Mapbox index={introScrollValue} />
      <!-- <Triptych index={introScrollValue} /> -->
    </div>
    <div class="spacer" />
    <Scrolly bind:value={introScrollValue} bind:id>
      {#each copy.slides as slide, i}
        <div class="step" class:active={introScrollValue === i}>
          <div
            class="bg-slate-100 mx-auto px-4 py-2 border-2 border-slate-100 rounded md:w-7/12 sm:w-11/12 max-w-xl text-lg"
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
      <!-- <Mobility index={mobilityScrollValue} /> -->
      <RadialChart index={mobilityScrollValue} />
    </div>
    <Scrolly bind:value={mobilityScrollValue} bind:id>
      {#each copy.slides2 as slide, i}
        <div class="step" class:active={mobilityScrollValue === i}>
          <div
            class="bg-slate-100 mx-auto px-4 py-2 border-2 border-slate-100 rounded md:w-7/12 sm:w-11/12 max-w-xl text-lg"
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
