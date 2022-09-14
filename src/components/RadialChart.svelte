<script>
  import { onMount, beforeUpdate } from "svelte";

  import { feature } from "topojson-client";
  import { scaleLinear, select, selectAll, arc as d3_arc, pointRadial, interpolate } from "d3";
  import {
    interpolateBlues,
    interpolateGreens,
    interpolateGreys,
    interpolateOranges,
    interpolatePurples
  } from "d3-scale-chromatic";

  import copy from "$data/doc.json";
  import mobilityTopoJson from "$data/geo/mobility-topo.json";

  // ---

  const GARDENA_GEO_ID = "06037541001";
  const FREMONT_GEO_ID = "06001441924";

  // TODO: simplify by using CSV sted of topojson
  const tracts = feature(mobilityTopoJson, mobilityTopoJson.objects.tracts);
  const { properties: gardenaTract } = tracts.features.find(
    (d) => d.properties.GEOID10 === GARDENA_GEO_ID
  );
  const { properties: fremontTract } = tracts.features.find(
    (d) => d.properties.GEOID10 === FREMONT_GEO_ID
  );

  const keys = [
    // id
    // 'GEOID10',
    // neighborhood
    // 'jobs_highpay_5mi_2015',
    // 'med_hhinc1990',
    "share_black2010",
    // 'singleparent_share2000',
    // outcomes
    "kir_top20_black_pooled_p75",
    "kir_black_pooled_p75",
    //
    "kir_top20_pooled_pooled_p75",
    // 'kir_black_pooled_p50',
    "kir_black_pooled_p25"
  ];

  const labelMap = {
    share_black2010: "Black Pop. %",
    kir_top20_black_pooled_p75: "Likely Black residents to be top 20% of earners",
    kir_black_pooled_p75: "Likely Percentile Rank for Black residents w/ High-Earning Parents",
    kir_black_pooled_p25: "Likely Percentile Rank for Black residents w/ Low-Earning Parents",
    kir_top20_pooled_pooled_p75: "Likely Percential Rank for All residents"
  };

  const colorMap = {
    share_black2010: interpolateBlues,
    kir_top20_black_pooled_p75: interpolateGreens,
    kir_black_pooled_p75: interpolateGreys,
    kir_black_pooled_p25: interpolateOranges,
    kir_top20_pooled_pooled_p75: interpolatePurples
  };

  const dataset = keys.map((key) => ({
    key,
    gardena: gardenaTract[key],
    fremont: fremontTract[key]
  }));

  const WIDTH = 550;
  const HEIGHT = 600;

  const getColorScale = (key) => colorMap[key];
  const yScale = scaleLinear().domain([0, 1]).range([0, -Math.PI]);
  const paddingScale = scaleLinear()
    .domain([0, dataset.length + 4])
    .range([120, HEIGHT / 2]);

  // extent size
  const axisDomain = [0, 0.25, 0.5,];
  // range(0, 1, 0.05)
  const ticks = [0, 0.5];

  const arc = (d, i, dir, field) =>
    d3_arc()
      .innerRadius(paddingScale(i) - 15)
      .outerRadius(paddingScale(i + 1) - 20)
      .startAngle(0);
  // .endAngle(dir * yScale(d[field]))();

  const getAxis = (d, direction = "left") => {
    if (direction === "left") {
      return pointRadial(yScale(d), 60);
    } else {
      return pointRadial(-yScale(d), 60);
    }
  };

  // https://stackoverflow.com/a/29318884/868724
  const parseArc = (path) => path.split("L")[1].split("A")[0];

  const getPath = (d, direction = "left") => {
    if (direction === "left") {
      return `
        M${pointRadial(yScale(d), paddingScale(0) - 40)}
        L${pointRadial(yScale(d), paddingScale(dataset.length / 2))}
      `;
    } else {
      // right
      return `
        M${pointRadial(-yScale(d), paddingScale(0) - 40)}
        L${pointRadial(-yScale(d), paddingScale(dataset.length / 2))}
      `;
    }
  };

  // index from step
  export let stepIndex = undefined;

  beforeUpdate(async () => {
    const slide = copy.slides2[stepIndex ?? 0];
    // stepIndex is >5 but dataset is not
    // so using dataset.length to make sure we start back at zero
    // when switching to fremont index
    const dataIndex = stepIndex <= dataset.length - 1 ? stepIndex : stepIndex - dataset.length;
    const stepData = dataset[dataIndex ?? 0];
    const direction = slide.field === "gardena" ? 1 : -1;
    const radialPath = select(
      `#${slide.field}-paths > path[data-key="${slide.field}-${slide.key}"]`
    );

    radialPath
      .datum(stepData) // bound data to path
      .transition()
      .duration(750)
      .attrTween("d", (d) => {
        if (d === undefined) return;

        const startAngle = 0;
        const endAngle = direction * yScale(d[slide.field]);
        const interpolater = interpolate(startAngle, endAngle);

        return (t) => {
          return arc(d, dataIndex, direction, slide.field).endAngle(interpolater(t))();
        };
      });
  });
</script>

<div class="flex items-center justify-center w-full h-screen relative z-0">
  <div class="grid grid-cols-12 gap-3 max-w-7xl">
    
    <div class="col-span-2 text-label text-right flex justify-center items-center">
      <div>
        <p class="text-lg font-bold">Gardena</p>
        <p class="text-sm mb-6">Predicted outcomes</p>
  
        <ul class="list-none text-sm">
          <li class="mb-4">Share of Black kids in neighborhood: <b>TK %</b></li>
          <li class="mb-4 opacity-25">Share of Black kids with high-income earning parents: <b>TK %</b></li>
          <li class="mb-4 opacity-25">Expected income by age 35: <b>$TK</b></li>
          <li class="mb-4 opacity-25">Share of Black kids in neighborhood: <b>TK %</b></li>
          <li class="mb-4 opacity-25">Share of Black kids in neighborhood: <b>TK %</b></li>
        </ul>
      </div>
    </div>

    <div class="col-span-8">
      <svg viewBox={[-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT]}>
        <g transform="translate(0, 50)">
          <!-- left axis -->
          <g>
            {#each axisDomain as d}
              <g>
                <path class="stroke-slate-400" stroke-width={0.5} d={getPath(d, "left")} />
                {#if ticks.includes(d)}
                  <text
                    font-size={10}
                    class="fill-slate-500 text-label"
                    dx="-0.25em"
                    dy="0.35em"
                    x={getAxis(d, "left")[0]}
                    y={getAxis(d, "left")[1]}
                  >
                    {d}
                  </text>
                {/if}
              </g>
            {/each}
          </g>
          <!-- right axis -->
          <g>
            {#each axisDomain as d}
              <g>
                <path class="stroke-slate-400" stroke-width={0.5} d={getPath(d, "right")} />
                {#if ticks.includes(d) && d !== 0 && d !== 1}
                  <text
                    font-size={10}
                    class="fill-slate-500 text-label"
                    dx="-0.35em"
                    dy="0.35em"
                    x={getAxis(d, "right")[0]}
                    y={getAxis(d, "right")[1]}
                  >
                    {d}
                  </text>
                {/if}
              </g>
            {/each}
          </g>
    
          <g id="gardena-paths">
            {#each dataset as d, i}
              <path
                data-key={`gardena-${d.key}`}
                fill={getColorScale(d.key)(d.gardena)}
                stroke={getColorScale(d.key)(1)}
                fill-opacity={0.25}
                stroke-width={1}
                d={arc(d, i, 1, "gardena")}
              />
            {/each}
          </g>
          <g id="fremont-paths">
            {#each dataset as d, i}
              <path
                data-key={`fremont-${d.key}`}
                fill={getColorScale(d.key)(d.gardena)}
                stroke={getColorScale(d.key)(1)}
                fill-opacity={0.25}
                stroke-width={1}
                d={arc(d, i, -1, "fremont")}
              />
            {/each}
          </g>
        </g>
      </svg>
    </div>

    <div class="col-span-2 text-label flex justify-center items-center">
      <div>
        <p class="text-lg font-bold">Fremont</p>
        <p class="text-sm mb-6">Predicted outcomes</p>
  
        <ul class="list-none text-sm">
          <li class="mb-4">Share of Black kids in neighborhood: <b>TK %</b></li>
          <li class="mb-4 opacity-25">Share of Black kids with high-income earning parents: <b>TK %</b></li>
          <li class="mb-4 opacity-25">Expected income by age 35: <b>$TK</b></li>
          <li class="mb-4 opacity-25">Share of Black kids in neighborhood: <b>TK %</b></li>
          <li class="mb-4 opacity-25">Share of Black kids in neighborhood: <b>TK %</b></li>
        </ul>
      </div>
    </div>
  </div>
</div>
