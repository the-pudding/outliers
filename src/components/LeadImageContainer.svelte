<script>
  import ImageRaw from "$components/ImageRaw.svelte";
  import StreetSvg from "$components/StreetSvg.svelte";
  import { beforeUpdate } from "svelte";
  // import { beforeUpdate } from "svelte";
  let section
  export let stepIndex

  // beforeUpdate(() => {
  //   console.info("Mobility", stepIndex)
  // })

  const positioningClasses = {
    "madera-ggp":  {
      triggerStep: 0,
      position: "row-start-1 col-start-6 col-span-6",
    },
    "madera-mom": {
      triggerStep: 2,
      position:"row-start-2 col-start-7 col-span-6",
    },
    "gardena-mom-and-me": {
      triggerStep: 3,
      position: "row-start-2 col-start-1 col-span-4",
    },
    "gardena-preschool": {
      triggerStep: 5,
      position: "row-start-3 col-start-1 col-span-4",
    },
    "fremont": {
      triggerStep: 6,
      position: "row-start-3 col-start-6 col-span-6",
    }
  }

  beforeUpdate(() => {
    console.log(stepIndex);
    document.querySelectorAll("#wrapper > div").forEach((node, index) => {
      if (stepIndex === parseInt(node.dataset.index)) {
        // add opacity
        node.classList.remove("opacity-0")
        node.classList.add("opacity-100")
      } else {
        // remove opacity
        node.classList.remove("opacity-100")
        node.classList.add("opacity-0")
      }
    })

  })
</script>

<!-- class="grid grid-cols-12 grid-rows-2"  -->
<!-- <div id="grid-photos" class="w-full h-screen relative z-[60] p-4 max-w-5xl my-0 mx-auto"> -->
  <section class="top-0 sticky h-screen flex items-center justify-center">
    <div 
      bind:this={section} 
      id="wrapper" 
      class="grid grid-cols-12 grid-rows-6 gap-3 w-full h-4/5 max-w-5xl"
    >
      {#each Object.keys(positioningClasses) as key, index}
        <div data-index={positioningClasses[key].triggerStep} class={`${positioningClasses[key].position} transition-opacity duration-500 opacity-0`}>
          <div class="border-2 border-black">
            <ImageRaw 
              className="w-full"
              src={`assets/img/intro/${key}.jpg`} 
            />
          </div>
        </div>      
      {/each}
      </div>
      <div class="city-svg-wrapper">
        <StreetSvg 
          step={stepIndex}
        />
      </div>
  </section>
<!-- </div> -->

<style>
  #wrapper {
    z-index: 1000;
  }
  .city-svg-wrapper {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 1;
  }
</style>
