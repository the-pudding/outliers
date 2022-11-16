<script>
  import scrollama from "scrollama";
  import { onMount } from "svelte";

  import Slide from "$components/Slide.svelte";
  import RadialChart from "$components/upward-mobility/RadialChart.svelte";
  import Stains from "$components/Stains.svelte";

  import copy from "$data/doc.json";

  let activeIndex;
  let activeStepDirection;
  let radialH;

  const handleStepEnter = (response) => {
    activeIndex = response.index;
    activeStepDirection = response.direction;
  };

  onMount(() => {
    const scroller = scrollama();
    scroller
      .setup({
        step: `div .step`,
        debug: true,
        offset: 0.5
      })
      .onStepEnter(handleStepEnter);
  });
</script>

<div>
  <div class="sticky z-0 -top-1" bind:clientHeight={radialH}>
    <RadialChart stepIndex={activeIndex} stepDirection={activeStepDirection} />
    {#if radialH != undefined}
      <Stains height={radialH} />
    {/if}
  </div>
  <div>
    {#each copy.slides2 as slide, i}
      <div class="relative z-50 step" class:active={activeIndex === i}>
        <div class="mx-auto text-lg max-w-[400px] md:max-w-xl bg-tan">
          <Slide id={slide.id ?? `slide-${i}`} {...slide} />
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .step {
    height: 125vh;
  }

  .bg-tan {
    background-color: rgba(255, 250, 242, 0.95);
    padding: 2rem 2rem 1rem 2rem;
    border: 1px solid var(--color-off-black);
    box-shadow: 0px 0px 10px rgba(222, 203, 186, 0.5);
  }

  .relative {
    margin: 0 1rem;
  }
</style>
