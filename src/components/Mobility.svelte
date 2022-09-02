<script>
  import ImageRaw from "$components/ImageRaw.svelte";

  import { beforeUpdate, onMount } from "svelte";

  import { feature } from "topojson-client";
  import { featureCollection } from "@turf/helpers";
  
  import {select} from "d3-selection"
  import { geoAlbers, geoPath } from "d3-geo";
  import { zoom as d3_zoom, zoomIdentity, zoomTransform } from "d3-zoom"

  import copy from "$data/doc.json";
  import usaTopoJson from "$data/geo/us-topo.json"
import { scaleBand } from "d3";
  // ------------------------

  let svg;
  let g
  let timelineDiv

  const zoomed = ({transform}) => {
    const _g = select(g)
    _g.attr("transform", transform)
    _g.selectAll("path").attr("stroke-width", 1 / transform.k)
  }
  
  const zoom = d3_zoom().scaleExtent([1, 14]).on("zoom", zoomed)
  const usaFeatureCollection = feature(usaTopoJson, usaTopoJson.objects.states)
  // drop Alaska, Hawaii && PR
  const states = usaFeatureCollection.features.filter(d => ![2, 15, 72].includes(d.id))

  const homes = ["Madera", "Gardena", "Fremont"]

  let projection = geoAlbers()
    .fitSize([960, 500], featureCollection(states));

  let path = geoPath().projection(projection);

  const resetZoom = (event) => {
    // if (svg === undefined) return null
    // select(svg).transition().duration(750)
    //   .call(
    //     zoom.transform,
    //     zoomIdentity,
    //     zoomTransform(svg).invert([WIDTH / 2, WIDTH / 2])
    //   )
  }

  const zoomOnClick = (event) => {
    // const [[x0, y0], [x1, y1]] = path.bounds(gardenaTract)

    // const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / WIDTH, (y1-y0) / WIDTH))
    // const translateX = -(x0 + x1) / 2
    // const translateY = -(y0 + y1) / 2

    // if (svg === undefined) return null
    // const _svg = select(svg)
    // _svg.transition()
    //   .duration(750)
    //   .call(
    //     zoom.transform,
    //     zoomIdentity
    //       .translate(WIDTH / 2, WIDTH / 2)
    //       .scale(scale)
    //       .translate(translateX, translateY)
    //   )

    // _svg.select(`[data-geoid="${GARDENA_GEO_ID}"]`)
    //   .attr("class", "fill-pink-500 opacity-7")
    

  }

  onMount(async () => {
    select(svg).call(zoom).on("wheel.zoom", null);

    // setup timeline?
    // const timeline = select(timelineDiv) s
    // const dimensions = timeline.node().getBoundingClientRect()
    
    // const { width, height } = dimensions
    // const scale = scaleBand().domain(["Madera, Gardena, Fremont"]).range([height, 0])



  });

  beforeUpdate(async () => {
    // TODO: toggle graphic changes
  });

  const photoSrcList = ["madera", "gardena", "gardena2"]
  const photoPositionClasses = {
    madera: "top-[25%] rotate-3",
    gardena: "top-[10%] -rotate-12",
    gardena2: "top-[25%] rotate-6",
  }
</script>

<div class="w-full h-screen relative z-[60] p-4 rotat">
  <section class="grid custom-cols h-full max-w-7xl my-0 mx-auto">
    <div bind:this={timelineDiv} class="flex flex-col justify-between h-full items-end">
      {#each homes as home}
        <div class="text-label">
          <div class="flex gap-1">
            <div class="flex flex-col items-end">
              <p>{home}</p>
              <p>1996</p>
            </div>
            <span class="text-hero">○</span>
          </div>
        </div>
        {#if home !== "Fremont"}
          <div class="w-[2px] m-1 h-2/3 bg-hero"></div>
        {/if}

      {/each}
    </div>
    
    <div class="relative w-4/6 my-0 mx-auto p-10">
      {#each photoSrcList as src, index}
        <div class={`absolute ${photoPositionClasses[src]}`}>
          <ImageRaw src={`assets/img/${src}.jpg`} />
        </div>
      {/each}
    </div>
    

    <div>
      stats?
    </div>
  </section>
</div>

<style>
  .custom-cols {
    grid-template-columns: 0.5fr 4fr 0.5fr;
  }

  .text-hero {
    color: var(--color-hero);
  }
  .bg-hero {
    background-color: var(--color-hero);
  }
</style>
