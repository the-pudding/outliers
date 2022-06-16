<script>
  import { select } from "d3-selection";
  import { geoAlbers, geoPath } from "d3-geo";
  import { afterUpdate, onMount } from "svelte";
  import { feature } from "topojson-client";
  //   import data from "$data/dev-tracts-simplified-topo.json";
  import textures from "textures";

  // let data;
  let states = [];
  let land;
  let svg;
  let t = {
    url() {
      return "";
    }
  };
  const projection = geoAlbers();
  let path = geoPath().projection(projection);

  onMount(async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9/raw/79564dfa2c56745ebd62f5655a6cc19d2cffa1ea/us.json"
    );
    const json = await response.json();
    states = feature(json, json.objects.states).features;
    land = feature(json, json.objects.land);

    t = textures.lines().heavier().size(10).stroke("#D9CEC5");

    select(svg).call(t);
  });

  export let id;
</script>

<div {id} class="w-full mx-auto flex justify-center my-12">
  <!-- class="stroke-white fill-slate-200" -->
  <svg bind:this={svg} class="w-full h-auto" width="960" height="500" viewBox="0 0 960 500">
    <g>
      {#each states as state}
        <path d={path(state)} class="stroke-white" fill={t.url()} stroke-width="2" />
      {/each}
    </g>
    <g>
      <path d={path(land)} fill="transparent" stroke="#BF3459" />
    </g>
  </svg>
</div>
