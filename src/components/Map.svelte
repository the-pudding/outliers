<script>
  import { extent } from "d3-array"
  import { geoAlbers, geoPath } from "d3-geo";
  import { interpolateBrBG } from "d3-scale-chromatic"
  import { scaleDiverging, scalePow } from "d3-scale"

  import { onMount } from "svelte";
  import { feature } from "topojson-client";
  import * as us from "us";

  import Block from "$components/Block.svelte";

  import migrationData from "$data/great-migration-places-topo.json";

  import usData from "$data/geo/us-topo.json"
  import citiesData from "$data/geo/cities-geo.json"

  let states = [];
  let cities = [];
  let spikes = [];
  let domain = [];
  let land;
  let svg;
  let svgLegend;
  let rampColor;
  let x;

  // default
  let field = "black_pop_pct_chg_1910_1940";

  const fieldMap = {
    '1910-1940': 'black_pop_pct_chg_1910_1940',
    '1940-1970': 'black_pop_pct_chg_1940_1970',
  }

  /**
   *
   * @param {object} d
   * @param {string} key
   */
  const get = (d, key) => d.properties[key];

  /**
   *
   * @param {object} d
   * @param {string} key
   */
  const generateSpike = (d, key) => {
    const MAX_SPIKE_HEIGHT = 180;
    const keys = Object.values(fieldMap);

    // Array [ -0.246, 0.436 ]
    const domain = extent(Array(keys.map((k) => spikes.map((d) => d.properties[k]))).flat(2));

    const spikeScale = scalePow().exponent(2).domain(domain).range([0, MAX_SPIKE_HEIGHT]);

    const mountain = (d, mx = 5) => `M${-mx / 2} 0 Q0 ${-spikeScale(d)} ${mx / 2} 0`;

    return mountain(d.properties[key]);
  };

  /**
   *
   * @param {object} d
   * @param {string} key
   * @param {boolean} rotate
   */
  const translate = (d, key = field, rotate = true) => {
    const transform = `translate(${projection(d.geometry.coordinates)})`;
    const value = get(d, key);

    if (value >= 0 || !rotate) {
      return transform;
    } else {
      return `${transform} rotate(180)`;
    }
  };

  /**
   * @param {object} d
   */
  let colorScale = (d) => "";

  let t = {
    url() {
      return "";
    }
  };
  const projection = geoAlbers();
  const path = geoPath().projection(projection);

  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  onMount(async () => {
    /**
     * Data prep
     */

    land = feature(usData, usData.objects.land);
    cities = citiesData.features;
    spikes = feature(migrationData, migrationData.objects.points).features.filter(
      (d) => d.geometry
    );
    states = feature(usData, usData.objects.states)
      .features.map((state) => {
        const properties =
          us.STATES.find((s) => s.fips === `${state.id < 10 ? `0${state.id}` : state.id}`) ?? {};
        return {
          ...state,
          properties: {
            ...properties
          }
        };
      })
      .filter((d) => d.properties?.name !== undefined);

    domain = extent(spikes.map((d) => d.properties[field]));

    colorScale = scaleDiverging().domain([domain[0], 0, domain[1]]).interpolator(interpolateBrBG);
    rampColor = colorScale.interpolator();
  });

  const handleOnClick = (event)  => {
    const key = event.target.textContent
    field = fieldMap[key]
  }

  export let header;
  export let text;
  export let source;
</script>

<div class="w-full mx-auto flex justify-center my-12">
  <div class="w-full">
    <Block>
      <h3 class="text-label font-bold text-xl">{@html header}</h3>
      <p class="text-label text-base mb-4">{@html text}</p>

      <div id="legend">
        <!-- <p class="text-label text-sm">Percentage change in the Black population</p> -->
        <div class="flex items-center">
          <!-- <p class="text-label text-sm mr-3">{@html domain[0] ?? ""}</p> -->
          <p class="text-label text-sm mr-3">Lower</p>
          <svg
            bind:this={svgLegend}
            class="legend"
            width={320}
            height={45}
            viewBox={`0 0 ${320} ${45}`}
          >
            <image
              x={0}
              y={18}
              width={320}
              height={10}
              preserveAspectRatio="none"
              xlink:href={rampColor ? ramp(rampColor).toDataURL() : undefined}
            />
            <!-- <g bind:this={svgLegend} transform={`translate(0, ${26}`} /> -->
          </svg>
          <!-- <p class="text-label text-sm ml-3">{@html domain[1] ?? ""}</p> -->
          <p class="text-label text-sm ml-3">Higher</p>
        </div>
      </div>

      <!-- <span class="relative z-0 inline-flex shadow-sm rounded-md">
        <button
          on:click={handleOnClick}
          type="button"
          class="text-label relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 active:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >1910-1940</button
        >
        <button
          on:click={handleOnClick}
          type="button"
          class="-ml-px text-label relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 active:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >1940-1970</button
        >
      </span> -->
    </Block>

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
              class="fill-white stroke-gray-200"
              width={1}
              height={1}
              stroke-width={1}
            />
          {/each}
        </g>
        <!-- country border -->
        <path d={path(land)} fill="transparent" />
      </g>
      <!-- spikes -->
      <g id="spikes" stroke-width="0.25">
        {#each spikes as spike}
          <path
            class=" stroke-gray-400"
            transform={translate(spike, field)}
            d={generateSpike(spike, field)}
            fill={colorScale(spike.properties[field])}
            stroke-width={1}
          />
        {/each}
      </g>
      <!-- cities -->
      <g id="cities">
        {#each cities as city}
          <g transform={translate(city, field, false)}>
            <circle class="stroke-white fill-gray-700" stroke-width={1} r={2} />
            <text class="text-shadow text-label fill-gray-500" font-size={8} x={5} y={-3}
              >{city.properties.NAME}</text
            >
          </g>
        {/each}
      </g>
    </svg>

    <Block>
      <p class="text-label text-gray-500">Source: {@html source}</p>
    </Block>
  </div>
</div>

<style>
  .legend {
    overflow: visible;
    display: block;
  }
</style>
