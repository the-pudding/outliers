<script>
  import { axisBottom, color, extent, interpolateBrBG, interpolateRound, scaleDiverging, scaleLinear, scalePow, select } from "d3";
  import { geoAlbers, geoPath } from "d3-geo";
  import { onMount } from "svelte";
  import { feature } from "topojson-client";
  import textures from "textures";
  import * as us from "us";

  import Block from "$components/Block.svelte";

  import migrationData from "$data/great-migration-places-topo.json"

  let states = [];
  let cities = []
  let spikes = []
  let land;
  let svg;
  let svgLegend
  let rampColor
  let x
  
  // black_pop_pct_chg_1910_1940
  // black_pop_pct_chg_1940_1970
  export let field = 'black_pop_pct_chg_1910_1940'

  /**
   * 
   * @param {object} d
   * @param {string} key
   */
  const get = (d, key) => d.properties[key]

  /**
   * 
   * @param {object} d
   * @param {string} key
   */
  const generateSpike = (d, key) => {
      const MAX_SPIKE_HEIGHT = 180
      const keys = ['black_pop_pct_chg_1910_1940', 'black_pop_pct_chg_1940_1970']

      // Array [ -0.246, 0.436 ]
      const domain = extent(Array(keys.map(k => spikes.map(d => d.properties[k]))).flat(2))
      
      const spikeScale = 
        scalePow()
        .exponent(2)
        .domain(domain).range([0, MAX_SPIKE_HEIGHT])

      const mountain = (d, mx = 5) => 
        `M${-mx / 2} 0 Q0 ${-spikeScale(d)} ${mx / 2} 0`;

      return mountain(d.properties[key])
    }

  /**
   * 
   * @param {object} d
   * @param {string} key
   * @param {boolean} rotate
   */
   const translate = (d, key = field, rotate = true) => {
    const transform = `translate(${projection(d.geometry.coordinates)})`
    const value = get(d, key)
    
    if (value >= 0 || !rotate) {
      return transform
    } else {
      return `${transform} rotate(180)`
    }
  }

  /**
   * @param {object} d  
   */
  let colorScale = (d) => ""

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
    const response = await fetch(
      "https://gist.githubusercontent.com/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9/raw/79564dfa2c56745ebd62f5655a6cc19d2cffa1ea/us.json"
    );

    const cityRes = await fetch("https://gist.githubusercontent.com/awoodruff/2844d64b21785fb0a7715afabadedcbf/raw/62f934bb254ea40f340c13d03bf1871bb059442c/citylabels.geojson")
    const majorCities = await cityRes.json()
    const json = await response.json();
    
    land = feature(json, json.objects.land);
    cities = majorCities.features
    spikes = feature(migrationData, migrationData.objects.points).features.filter(d => d.geometry)
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

    const domain = extent(
      spikes.map(d => d.properties[field])
    )
    
    colorScale = scaleDiverging().domain([domain[0], 0, domain[1]]).interpolator(interpolateBrBG)
  });

  export let header
  export let text
  export let source
</script>

<div class="w-full mx-auto flex justify-center my-12">
  <div class="w-full">
    <Block>
      <h3 class="label font-bold text-xl">{@html header}</h3>
      <p class="label text-base mb-4">{@html text}</p>
      
      <div id="legend">
        <svg bind:this={svgLegend} class="legend" width={320} height={50} viewBox={`0 0 ${320} ${50}`}>
          <image
            x={0}
            y={18}
            width={320}
            height={10}
            preserveAspectRatio="none"
            xlink:href={ rampColor ? ramp(rampColor).toDataURL() : undefined}
          />
          <!-- <g bind:this={svgLegend} transform={`translate(0, ${26}`} />             -->
        </svg>
      </div>
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
              class="fill-slate-100 stroke-white"
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
      <g 
        id="spikes"
        stroke-width="0.25"
      >
        {#each spikes as spike}
          <path
            transform={translate(spike, field)}
            d={generateSpike(spike, field)}
            fill={colorScale(spike.properties[field])}
            class="stroke-slate-400"
          />
        {/each}
      </g>
      <!-- cities -->
      <g id="cities">
        {#each cities as city}
          <g transform={translate(city, field, false)}>
            <circle class="stroke-white fill-gray-700" stroke-width={1} r={2} />
            <text class="text-shadow label fill-gray-500" font-size={8} x={5} y={-3}>{city.properties.NAME}</text>
          </g>
        {/each}
      </g>
    </svg>

    <Block>
      <p class="label text-sm text-gray-500">Source: {@html source}</p>
    </Block>
  </div>
</div>

<style>
  .label {
    font-family: -apple-system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .text-shadow {
    text-shadow: -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white, 1px 1px 2px white;
  }

  .legend {
    overflow: visible;
    display: block;
  }
</style>
