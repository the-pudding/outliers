<script>
  import ImageRaw from "$components/ImageRaw.svelte";
  import StreetSvg from "$components/StreetSvg.svelte";
  import locator from "$svg/story/ca_locator.svg";
  import { beforeUpdate } from "svelte";
  import { onMount } from "svelte";
  import { selectAll, easeLinear } from "d3";
  let section
  export let stepIndex

  // beforeUpdate(() => {
  //   console.info("Mobility", stepIndex)
  // })

  let maderaDot;
  let gardenaDot;
  let fremontDot;
  let m2gLine;
  let g2fLine;
  let m2gArrow;
  let g2fArrow;
  let w;

  const positioningClasses = {
    "madera-ggp":  {
      triggerStep: 1,
      endStep: 3,
      position: "row-start-1 col-start-2 col-span-6",
      positionMobile: "row-start-2 col-start-1 col-span-8"
    },
    "madera-mom": {
      triggerStep: 2,
      endStep: 3,
      position:"row-start-2 col-start-6 col-span-6",
      positionMobile: "row-start-3 col-start-3 col-span-8"
    },
    "gardena-mom-and-me": {
      triggerStep: 4,
      endStep: 6,
      position: "row-start-1 col-start-2 col-span-5",
      positionMobile: "row-start-2 col-start-1 col-span-6"
    },
    "gardena-preschool": {
      triggerStep: 5,
      endStep: 6,
      position: "row-start-3 col-start-3 col-span-5",
      positionMobile: "row-start-3 col-start-5 col-span-6"
    },
    "fremont": {
      triggerStep: 7,
      endStep: 9,
      position: "row-start-3 col-start-6 col-span-6",
      positionMobile: "row-start-3 col-start-1 col-span-8"
    }
  }

  function drawPaths(pathCollection) {
    return new Promise((resolve) => {
      const paths = pathCollection;
      const lineNodes = pathCollection._groups[0];
      const lineLengths = [...lineNodes].map((el) => el.getTotalLength());

      paths
        .attr("stroke-dasharray", (d, i) => lineLengths[i])
        .attr("stroke-dashoffset", (d, i) => lineLengths[i])
        .transition()
        //.delay((d, i) => i * 100)
        .duration(500)
        .ease(easeLinear)
        .attr("stroke-dashoffset", 0)
        .on("end", resolve);
    })
  }

  onMount(() => {
    maderaDot = selectAll("#madera_dot");
    gardenaDot = selectAll("#gardena_dot");
    fremontDot = selectAll("#fremont_dot");
    m2gLine = selectAll("#m2g_line");
    g2fLine = selectAll("#g2f_line");
    m2gArrow = selectAll("#m2g_arrow");
    g2fArrow = selectAll("#g2f_arrow");
  });

  beforeUpdate(() => {
    document.querySelectorAll("#wrapper > div").forEach((node, index) => {
      const dataIndex = parseInt(node.dataset.index);
      const dataEnd = parseInt(node.dataset.end);
      if (stepIndex === dataIndex) {
        //selectAll("#wrapper > div").classed("opacity-0", true)
        node.classList.remove("opacity-0")
        node.classList.add("opacity-100")
      } else if (stepIndex === dataEnd)  {
        selectAll("#wrapper > div").classed("opacity-100", false)
        selectAll("#wrapper > div").classed("opacity-0", true)
      }
    })

  })

  function updateLocator(stepIndex) {

    if (stepIndex != undefined && stepIndex < 1) {
      maderaDot
        .transition()
        .duration(250)
        .ease(easeLinear)
        .style("opacity", 1);

      gardenaDot.style("opacity", 0);
      fremontDot.style("opacity", 0);
      m2gLine.style("opacity", 0);
      m2gArrow.style("opacity", 0);
      g2fLine.style("opacity", 0);
      g2fArrow.style("opacity", 0);
    } else if (stepIndex >= 0 && stepIndex < 3) {
      gardenaDot.style("opacity", 0);
      fremontDot.style("opacity", 0);
      m2gLine.style("opacity", 0);
      m2gArrow.style("opacity", 0);
      g2fLine.style("opacity", 0);
      g2fArrow.style("opacity", 0);
    } else if (stepIndex == 3) {
      m2gLine.style("opacity", 1);
      drawPaths(m2gLine)
      m2gArrow
        .transition()
        .delay(500)
        .duration(250)
        .ease(easeLinear)
        .style("opacity", 1);
      gardenaDot
        .transition()
        .duration(250)
        .ease(easeLinear)
        .style("opacity", 1);
      
      fremontDot.style("opacity", 0);
      g2fLine.style("opacity", 0);
      g2fArrow.style("opacity", 0);
    }
    else if (stepIndex >= 3 && stepIndex < 6) {
      gardenaDot
        .transition()
        .duration(250)
        .ease(easeLinear)
        .style("opacity", 1);

      fremontDot.style("opacity", 0);
      g2fLine.style("opacity", 0);
      g2fArrow.style("opacity", 0);
    } else if (stepIndex == 6) {
      g2fLine.style("opacity", 1);
      drawPaths(g2fLine)
      g2fArrow
        .transition()
        .delay(500)
        .duration(250)
        .ease(easeLinear)
        .style("opacity", 1);
      fremontDot
        .transition()
        .duration(250)
        .ease(easeLinear)
        .style("opacity", 1);
    } else if (stepIndex >= 6) {
      fremontDot
        .transition()
        .duration(250)
        .ease(easeLinear)
        .style("opacity", 1);
    }
  }

  $: updateLocator(stepIndex)
</script>

<svelte:window bind:innerWidth={w}/>

<!-- class="grid grid-cols-12 grid-rows-2"  -->
<!-- <div id="grid-photos" class="w-full h-screen relative z-[60] p-4 max-w-5xl my-0 mx-auto"> -->
  <section class="top-0 sticky h-screen flex">
    <div 
      bind:this={section} 
      id="wrapper" 
      class="grid grid-cols-12 grid-rows-6 gap-3 w-full"
    >
      {#each Object.keys(positioningClasses) as key, index}
        {#if w > 900}
        <div data-index={positioningClasses[key].triggerStep} data-end={positioningClasses[key].endStep} class={`${positioningClasses[key].position} transition-opacity duration-500 opacity-0`}>
          <div class="border-2 border-black">
            <ImageRaw 
              className="w-full"
              src={`assets/img/intro/${key}.jpg`} 
            />
          </div>
        </div> 
        {:else}
        <div data-index={positioningClasses[key].triggerStep} data-end={positioningClasses[key].endStep} class={`${positioningClasses[key].positionMobile} transition-opacity duration-500 opacity-0`}>
          <div class="border-2 border-black">
            <ImageRaw 
              className="w-full"
              src={`assets/img/intro/${key}.jpg`} 
            />
          </div>
        </div> 
        {/if}     
      {/each}
      </div>
      <div class="city-svg-wrapper">
        <StreetSvg 
          step={stepIndex}
        />
      </div>
      <div class="locator-svg-wrapper">
        {@html locator}
      </div>
  </section>
<!-- </div> -->

<style>
  section {
    width: 100%;
  }

  #wrapper {
    z-index: 1000;
    width: 100%;
    padding: 2rem;
    margin: 0;
  }
  .city-svg-wrapper {
    width: 100%;
    height: 100vh;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1;
    margin: 0 auto;
    max-width: 50rem;
  }

  .locator-svg-wrapper {
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 1;
    width: 8rem;
    height: 8rem;
    transform: translate(0, -50%);
    display: none;
    justify-content: center;
  }

  :global(.locator-svg-wrapper svg) {
    width: 100%;
  }

  @media only screen and (min-width: 700px) {
    #wrapper {
      border-left: 1px solid var(--color-off-black);
      margin: 2rem 2rem 2rem 8rem;
    }
    .locator-svg-wrapper {
      display: flex;
    }
    .city-svg-wrapper {
      margin: 0 0 0 8rem;
      max-width: 50rem;
    }
  }

  @media only screen and (min-width: 900px) {
    #wrapper {
      margin: 2rem 2rem 2rem 12rem;
    }
    .city-svg-wrapper {
      margin: 0 0 0 12rem;
      max-width: 50rem;
    }
    .locator-svg-wrapper {
      width: 12rem;
      height: 12rem;
    }
  }
</style>
