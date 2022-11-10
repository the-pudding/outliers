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
  import Stains from "$components/Stains.svelte";

  const blocks = {
    text: Text,
    image: Image,
    subhead: Subhead,
    map: Map,
    hero: Hero,
    triptych: Triptych,
    slide: Slide,
    methodology: Methodology,
    leadtext: LeadText
  };

  let introH;
  let preMapH;
  let outroH;
  let radialH;

  export let introScrollValue;
  export let mobilityScrollValue;
  export let id;
</script>

<article>
  <!-- Display header -->
  <Hero />
  <!-- Intro -->
  <section class="intro-section" bind:clientHeight={introH}>
    <div class="text-wrapper">
      {#each copy.intro as props, i}
        <svelte:component
          this={blocks[props.block] ?? Text}
          id={props.id ?? `graf-${i}`}
          {...props}
        />
      {/each}
    </div>
    {#if introH != undefined}
      <Stains height={introH}/>
    {/if}
  </section>
  <!-- scrolly -->
  <section class="relative-custom">
    <LeadImageContainer stepIndex={introScrollValue} />
    <!-- <div class="spacer" /> -->
    <Scrolly bind:value={introScrollValue} bind:id className="flex flex-col">
      <!-- <div class="grid grid-cols-12"> -->
      {#each copy.outcomes as slide, i}
        <LeadText
          stepIndex={introScrollValue}
          className={`h-screen ${introScrollValue === i ? "active" : ""}`}
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
  <section id="text" class="px-4" bind:clientHeight={preMapH}>
    <div class="text-wrapper">
      {#each copy.blocks as props, i}
        <svelte:component
          this={blocks[props.block] ?? Text}
          id={props.id ?? `graf-${i}`}
          {...props}
        />
      {/each}
    </div>
    {#if preMapH != undefined}
      <Stains height={preMapH}/>
    {/if}
  </section>
  <!-- Radial bar chart -->
  <section class="relative-custom" bind:clientHeight={radialH}>
    <div class="sticky top-0">
      <RadialChart stepIndex={mobilityScrollValue} />
      {#if radialH != undefined}
        <Stains height={radialH}/>
      {/if}
    </div>
    <Scrolly bind:value={mobilityScrollValue} bind:id>
      {#each copy.slides2 as slide, i}
        <div class="step" class:active={mobilityScrollValue === i}>
          <div class="mx-auto text-lg max-w-[400px] md:max-w-xl bg-tan">
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
  <section id="text-2" class="px-4" bind:clientHeight={outroH}>
    <div class="text-wrapper">
      {#each copy.blocks2 as props, i}
        <svelte:component
          this={blocks[props.block] ?? Text}
          id={props.id ?? `graf-${i}`}
          {...props}
        />
      {/each}
    </div>
    {#if outroH != undefined}
      <Stains height={outroH}/>
    {/if}
  </section>
</article>

<style>
  /* .spacer {
    height: 75vh;
  } */

  .text-wrapper {
    position: relative;
    z-index: 999;
  }

  .relative-custom {
    width: 100%;
    margin: 3rem 0;
  }

  .step {
    height: 125vh;
  }

  .bg-tan {
    background-color: rgba(255, 250, 242, 0.95);
    padding: 2rem 2rem 1rem 2rem;
    border: 1px solid var(--color-off-black);
    box-shadow: 0px 0px 10px rgba(222, 203, 186, 0.5);
  }

  .intro-section {
    margin-top: 4rem;
    padding: 0 1rem;
  }

  @media only screen and (min-width: 550px) {
    .intro-section {
      margin-top: 6rem;
      padding: 0 2rem;
    }
  }

  @media only screen and (min-width: 700px) {
    .intro-section {
      margin-top: 6rem;
      padding: 0;
    }
  }
</style>
