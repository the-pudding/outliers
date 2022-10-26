<script>
  import copy from "$data/doc.json";

  import Text from "$components/Text.svelte";
  import Subhead from "$components/Subhead.svelte";
  import Image from "$components/Image.svelte";
  import Hero from "$components/Hero.svelte";
  import Map from "$components/Map.svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import Triptych from "$components/Triptych.svelte";
  import RadialChart from "$components/RadialChart.svelte";
  import Slide from "$components/Slide.svelte";
  import Methodology from "$components/Methodology.svelte";
  import LeadImageContainer from "$components/LeadImageContainer.svelte";
  import LeadText from "$components/LeadText.svelte";

  const blocks = {
    text: Text,
    image: Image,
    subhead: Subhead,
    map: Map,
    hero: Hero,
    triptych: Triptych,
    slide: Slide,
    methodology: Methodology,
    leadtext: LeadText,
  };

  export let introScrollValue;
  export let mobilityScrollValue
  export let id;
</script>

<article>
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
    <LeadImageContainer stepIndex={introScrollValue} />
    <!-- <div class="spacer" /> -->
    <Scrolly bind:value={introScrollValue} bind:id className="flex items-center justify-center flex-col">
      <!-- <div class="grid grid-cols-12"> -->
      {#each copy.outcomes as slide, i}
        <LeadText 
        stepIndex={introScrollValue}
        className={`h-screen ${ introScrollValue === i ? "active" : "" }`}
        {...slide}
        />
        <!-- <div class="step" class:active={introScrollValue === i}> -->
            <!-- <svelte:component
              this={blocks[slide.block] ?? Text}
              id={slide.id ?? `slide-${i}`}
              {...slide}
            /> -->
        <!-- </div> -->
      {/each}
    <!-- </div> -->
    </Scrolly>
    <!-- <div class="spacer" /> -->
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
  <!-- Radial bar chart -->
  <section id="radial-bar" class="relative">
    <div class="sticky top-0">
      <RadialChart stepIndex={mobilityScrollValue} />
    </div>
    <Scrolly bind:value={mobilityScrollValue} bind:id>
      {#each copy.slides2 as slide, i}
        <div class="step" class:active={mobilityScrollValue === i}>
          <div
            class="bg-tan mx-auto md:w-7/12 sm:w-11/12 max-w-xl text-lg"
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
  /* .spacer {
    height: 75vh;
  } */

  .step {
    height: 125vh;
  }

  #radial-bar {
    padding: 0 1rem;
  }

  .bg-tan {
    background-color: rgba(255, 250, 242, 0.95);
    padding: 2rem 2rem 1rem 2rem;
    border: 1px solid var(--color-off-black);
    box-shadow: 0px 0px 10px rgba(222, 203, 186, 0.5);
  }
</style>
