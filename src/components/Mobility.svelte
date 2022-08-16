<script>
  import { beforeUpdate, onMount } from "svelte";

  import { feature } from "topojson-client";
  import { featureCollection } from "@turf/helpers";
  
  import {select} from "d3-selection"
  import { geoAlbers, geoPath } from "d3-geo";
  import { zoom as d3_zoom, zoomIdentity, zoomTransform } from "d3-zoom"

  import copy from "$data/doc.json";
  import mobilityTopoJson from "$data/geo/mobility-topo.json"
  // ------------------------

  const GARDENA_GEO_ID = "06037541001"
  const FREMONT_GEO_ID = "06001441924"

  const WIDTH = 500
  const HEIGHT = 960

  let svg;
  let g

  const zoomed = ({transform}) => {
    const _g = select(g)
    _g.attr("transform", transform)
    _g.selectAll("path").attr("stroke-width", 1 / transform.k)
  }
  
  const zoom = d3_zoom().scaleExtent([1, 14]).on("zoom", zoomed)

  const losAngelesHoods = feature(mobilityTopoJson, mobilityTopoJson.objects.la)

  const hoods = losAngelesHoods.features.filter((d) =>
    ["Gardena", "West Compton"].includes(d.properties.Name)
  );

  const tracts = feature(mobilityTopoJson, mobilityTopoJson.objects.tracts)

  const laTracts = tracts.features.filter(d => d.properties.county === "037")

  const gardenaTract = laTracts.find(d => d.properties.GEOID10 === GARDENA_GEO_ID)
  const fremontTract = laTracts.find(d => d.properties.GEOID10 === FREMONT_GEO_ID)

  let projection = geoAlbers()
    .fitSize([WIDTH, WIDTH], featureCollection(laTracts));

  let path = geoPath().projection(projection);

  const resetZoom = (event) => {
    if (svg === undefined) return null
    select(svg).transition().duration(750)
      .call(
        zoom.transform,
        zoomIdentity,
        zoomTransform(svg).invert([WIDTH / 2, WIDTH / 2])
      )
  }

  const zoomOnClick = (event) => {
    const [[x0, y0], [x1, y1]] = path.bounds(gardenaTract)

    const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / WIDTH, (y1-y0) / WIDTH))
    const translateX = -(x0 + x1) / 2
    const translateY = -(y0 + y1) / 2

    if (svg === undefined) return null
    const _svg = select(svg)
    _svg.transition()
      .duration(750)
      .call(
        zoom.transform,
        zoomIdentity
          .translate(WIDTH / 2, WIDTH / 2)
          .scale(scale)
          .translate(translateX, translateY)
      )

    _svg.select(`[data-geoid="${GARDENA_GEO_ID}"]`)
      .attr("class", "fill-pink-500 opacity-7")
    

  }

  onMount(async () => {
    select(svg).call(zoom).on("wheel.zoom", null);
  });

  beforeUpdate(async () => {
    // TODO: toggle graphic changes
  });
</script>

<div class="w-full h-screen relative z-0">
  <div>
    <button
      on:click={zoomOnClick}
      type="button"
      class="label relative inline-flex items-center m-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 active:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >Click to zoom</button
    >
    <button
      on:click={resetZoom}
      type="button"
      class="label relative inline-flex items-center m-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 active:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >Click to reset</button
    >

  </div>

  <div class="w-full flex ">
    <div class="border-red-600 border-2 flex-initial w-1/3">
      <svg class="" bind:this={svg} viewBox={`0 0 ${WIDTH} ${WIDTH}`}>
        <g bind:this={g}>
          <g id="los-angeles">
            {#each laTracts as tract}
              <path
                data-geoid={`${tract.properties.GEOID10}`}
                d={path(tract)}
                class="fill-slate-200 stroke-white"
                stroke-width={0.5}
              />
            {/each}
          </g>
          <g id="los-angeles-hoods">
            {#each hoods as hood}
            <path
              d={path(hood)}
              class="fill-red-600 opacity-50"
              stroke-width={0.5}
            />
            {/each}
          </g>
    
        </g>
      </svg>
    </div>
    <div class="border-black border-2 flex-initial w-2/3">
      Chart stuff?
    </div>
  </div>

</div>

<style></style>
