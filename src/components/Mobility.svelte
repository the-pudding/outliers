<script>
  import ImageRaw from "$components/ImageRaw.svelte";
  import { beforeUpdate } from "svelte";
  // import { beforeUpdate } from "svelte";
  let section
  export let stepIndex

  // beforeUpdate(() => {
  //   console.info("Mobility", stepIndex)
  // })

  const photos = [
    "madera",
    "gardena",
    "gardena2",
  ]

  const positioningClasses = {
    madera: "col-start-7 rotate-6",
    gardena: "col-start-1 -rotate-6",
    gardena2: "col-start-7 row-start-3 rotate-12",
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

<div id="grid-photos" class="w-full h-screen relative z-[60] p-4 max-w-5xl my-0 mx-auto">
  <section id="wrapper" bind:this={section} class="grid grid-cols-12 grid-rows-3">
    {#each photos as key, index}
      <div data-index={index} class={`${positioningClasses[key]} max-h-60 transition-opacity duration-500 opacity-0`}>
        <ImageRaw 
          className="max-w-md" 
          src={`assets/img/${key}.jpg`} 
        />
      </div>      
    {/each}
  </section>
</div>
