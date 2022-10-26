<script>
  import ImageRaw from "$components/ImageRaw.svelte";
  import { beforeUpdate } from "svelte";
  // import { beforeUpdate } from "svelte";
  let section
  export let stepIndex

  // beforeUpdate(() => {
  //   console.info("Mobility", stepIndex)
  // })

  const positioningClasses = {
    "madera-ggp": "row-start-1 col-start-6 col-span-6",
    "madera-farm": "row-start-1 col-start-6 col-span-6",
    "madera-mom": "row-start-2 col-start-7 col-span-6",

    "gardena-mom-and-me": "row-start-2 col-start-1 col-span-4",
    "gardena-air": "row-start-2 col-start-1 col-span-4",
    "gardena-preschool": "row-start-3 col-start-1 col-span-4",

    "fremont": " row-start-2 col-start-1 col-span-6",
    "fremont-2": " row-start-2 col-start-1 col-span-6",
    "fremont-income": " row-start-2 col-start-1 col-span-6",
  }

  beforeUpdate(() => {
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
  <section class="sticky top-0 flex items-center justify-center h-screen">

  <div 
    bind:this={section} 
    id="wrapper" 
    class="grid w-full max-w-5xl grid-cols-12 grid-rows-6 gap-3 h-4/5"
  >
    {#each Object.keys(positioningClasses) as key, index}
      <div data-index={index} class={`${positioningClasses[key]} transition-opacity duration-500 opacity-0`}>
        <div class="border-2 border-black">
          <ImageRaw 
            className="w-full"
            src={`assets/img/intro/${key}.jpg`} 
          />
        </div>
      </div>      
    {/each}
    </div>
  </section>
<!-- </div> -->
