<script>
  import { select } from "d3-selection";
  import { geoAlbers, geoPath } from "d3-geo";
  import { onMount } from "svelte";
  import { feature } from "topojson-client";
  import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
  import getCentroid from "@turf/centroid";
  import textures from "textures";
  import * as us from "us";

  import southData from "$data/us-south-topo.json";

  let states = [];
  let stateCoordinates = [];
  let land;
  let svg;
  let southBoundary;
  let southCoordinates = [];
  let t = {
    url() {
      return "";
    }
  };
  const projection = geoAlbers();
  let path = geoPath().projection(projection);

  onMount(async () => {
    /**
     * Data prep
     */
    const response = await fetch(
      "https://gist.githubusercontent.com/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9/raw/79564dfa2c56745ebd62f5655a6cc19d2cffa1ea/us.json"
    );
    const json = await response.json();
    // country border
    land = feature(json, json.objects.land);
    // southern boundary
    southBoundary = feature(southData, southData.objects.region);
    // calculate centroids
    southCoordinates = projection(getCentroid(southBoundary).geometry.coordinates);
    // states
    const _states = feature(json, json.objects.states).features;
    states = _states
      .map((state) => {
        const properties =
          us.STATES.find((s) => s.fips === `${state.id < 10 ? `0${state.id}` : state.id}`) ?? {};
        const stateFeature = getCentroid(state);
        const [southFeature] = southBoundary.features;
        const is_south = booleanPointInPolygon(stateFeature, southFeature);
        const centroid = stateFeature.geometry.coordinates;

        return {
          ...state,
          properties: {
            ...properties,
            centroid,
            is_south
          }
        };
      })
      .filter((d) => d.properties?.name !== undefined);

    stateCoordinates = states
      .filter((d) => !d.properties.is_south && d.properties.name !== "Florida")
      .map((state) => {
        const [x, y] = projection(state.properties.centroid);
        const name = state.properties?.abbr ?? "";
        return {
          x,
          y,
          name
        };
      });

    /**
     * setup textures
     */
    t = textures.lines().heavier().size(10).stroke("#D9CEC5");

    select(svg).call(t);
  });

  export let id;
</script>

<div {id} class="w-full mx-auto flex justify-center my-12">
  <!-- class="stroke-white fill-slate-200" -->
  <svg bind:this={svg} class="w-full h-auto" width="960" height="500" viewBox="0 0 960 500">
    <!-- map drop shadow -->
    <defs>
      <filter id="map-shadow" x="0" y="0" width="100%" height="100%">
        <feGaussianBlur in="SourceAlpha" result="blurOut" stdDeviation="3" />
      </filter>
      <!-- https://stackoverflow.com/a/46123184/868724 -->
      <filter id="whiteOutlineEffect" color-interpolation-filters="sRGB">
        <feMorphology in="SourceAlpha" result="MORPH" operator="dilate" radius="2" />
        <feColorMatrix
          in="MORPH"
          result="WHITENED"
          type="matrix"
          values="-1 0 0 0 1, 0 -1 0 0 1, 0 0 -1 0 1, 0 0 0 1 0"
        />
        <feMerge>
          <feMergeNode in="WHITENED" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g id="geography">
      <!-- shadow -->
      <path d={path(land)} fill="white" filter="url(#map-shadow)" />
      <!-- states -->
      <g>
        {#each states as state}
          <path
            d={path(state)}
            class={state.properties.is_south ? "stroke-white" : "stroke-slate-100"}
            fill={"white"}
            stroke-width={2}
          />
        {/each}
      </g>
      <!-- country border -->
      <path d={path(land)} fill="transparent" stroke="#D9CEC5" />
      <!-- southern border -->
      <path
        d={path(southBoundary)}
        fill={t.url()}
        stroke="#D9AE5F"
        stroke-width="3"
        stroke-opacity="0.25"
      />
    </g>
    <g id="labels">
      <!-- southern label -->
      <text
        text-anchor="start"
        x={`${southCoordinates[0] / 1.25}`}
        y={`${southCoordinates[1]}`}
        class="fill-slate-500 label"
        filter="url(#whiteOutlineEffect)"
        font-size="14"
      >
        Southern states
      </text>

      <g>
        {#each stateCoordinates as state}
          <text
            text-anchor="middle"
            x={state.x}
            y={state.y}
            class="label fill-slate-400"
            filter="url(#whiteOutlineEffect)"
            font-size="10"
          >
            {state.name}
          </text>
        {/each}
      </g>
    </g>
  </svg>
</div>

<style>
  .label {
    font-family: -apple-system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
