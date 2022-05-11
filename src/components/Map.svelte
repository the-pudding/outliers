<script>
  import { geoAlbers, geoPath } from "d3-geo";
  import { onMount } from "svelte";
  import { feature } from "topojson-client";
  //   import data from "$data/dev-tracts-simplified-topo.json";

  let data;
  const projection = geoAlbers();
  const path = geoPath().projection(projection);

  onMount(async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9/raw/79564dfa2c56745ebd62f5655a6cc19d2cffa1ea/us.json"
    );
    const json = await response.json();
    const states = feature(json, json.objects.states);
    data = path(states);
  });

  export let id;
</script>

<div {id} class="w-full mx-auto flex justify-center my-12">
  <svg class="w-full h-auto" width="960" height="500" viewBox="0 0 960 500">
    <path d={data} class="stroke-white fill-slate-200" />
  </svg>
</div>
