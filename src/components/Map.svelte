<script>
  import { extent, scaleLinear, scalePow } from "d3";
  import { geoAlbers, geoPath } from "d3-geo";
  import { onMount } from "svelte";
  import { feature } from "topojson-client";
  import textures from "textures";
  import * as us from "us";

  import migrationData from "$data/great-migration-places-topo.json"

  let states = [];
  let cities = []
  let land;
  let svg;

  /**
   * 
   * @param {object} d
   * @param {string} key
   */
  let get = (d, key) => d.properties[key]

  /**
   * 
   * @param {object} d
   */
  let generateSpike = (d) => ""

  let t = {
    url() {
      return "";
    }
  };
  const projection = geoAlbers();
  let path = geoPath().projection(projection);

  let transform = (d, key) => {
    const translate = `translate(${projection(d.geometry.coordinates)})`
    const value = get(d, key)

    if (value >= 0) {
      return translate
    } else {
      return `${translate} rotate(180)`
    }
  }

  onMount(async () => {
    /**
     * Data prep
     */
    const response = await fetch(
      "https://gist.githubusercontent.com/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9/raw/79564dfa2c56745ebd62f5655a6cc19d2cffa1ea/us.json"
    );
    const json = await response.json();

    land = feature(json, json.objects.land);
    cities = feature(migrationData, migrationData.objects.points).features.filter(d => d.geometry)
    states = feature(json, json.objects.states).features.map((state) => {
        const properties =
          us.STATES.find((s) => s.fips === `${state.id < 10 ? `0${state.id}` : state.id}`) ?? {};
        return {
          ...state,
          properties: {
            ...properties,
          }
        };
      })
      .filter((d) => d.properties?.name !== undefined);

      // spike(cities)

    generateSpike = (d, key) => {
      const MAX_SPIKE_HEIGHT = 80
      const WIDTH = 7

      const keys = ['black_pop_pct_chg_1910_1940', 'black_pop_pct_chg_1940_1970']

      // Array [ -0.246, 0.436 ]
      const domain = extent(Array(keys.map(k => cities.map(d => d.properties[k]))).flat(2))
      // const domain = [-0.25, 0.75]
      const spikeScale = scalePow()
        .exponent(2)
        .domain(domain).range([0, MAX_SPIKE_HEIGHT])

      const length = spikeScale(d.properties[key])

      return `M${-WIDTH / 2},0L0,${-length}L${WIDTH / 2},0`
    }

    /**
     * setup textures
     */
    // t = textures.lines().heavier().size(10).stroke("#D9CEC5");

    // select(svg).call(t);
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
      <!-- <path d={path(land)} fill="white" filter="url(#map-shadow)" /> -->
      <!-- <path d={path(land)} fill="transparent" stroke="black" /> -->
      <!-- states -->
      <g>
        {#each states as state}
          <path
            d={path(state)}
            class="stroke-slate-100"
            fill="lightgray"
            width={1}
            height={1}
            stroke-width={2}
          />
        {/each}
      </g>
      <!-- country border -->
      <path d={path(land)} fill="transparent" />
    </g>
    <g id="cities"
      stroke-opacity="0.5"
      fill-opacity="0.3"
    >
      {#each cities as city}
        <path
          transform={transform(city, 'black_pop_pct_chg_1910_1940')}
          d={generateSpike(city, 'black_pop_pct_chg_1910_1940')}
          stroke={get(city, "black_pop_pct_chg_1910_1940") < 0 ? "hotpink" : "green"}
          fill={get(city, "black_pop_pct_chg_1910_1940") < 0 ? "hotpink" : "green"}
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  /* .label {
    font-family: -apple-system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  } */
</style>
