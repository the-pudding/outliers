<script>
  import { beforeUpdate } from "svelte";

  import { scaleLinear, select, arc as d3_arc, pointRadial, interpolate, format } from "d3";

  import copy from "$data/doc.json";

  // for reference/data check
  //
  // ---
  // const GARDENA_GEO_ID = "06037541001";
  // const FREMONT_GEO_ID = "06001441924";
  // ---

  // converting dollars to precents to display on chart
  const MAX_MED_HH_INC = 120000;

  const gardenaTract = {
    share_black2010: {
      value: 0.48,
      label: "48%"
    },
    share_black_stayed: {
      value: 0.42,
      label: "42%"
    },
    medhhinc_1990: {
      value: 0.84,
      label: "$81k (84th percentile)"
    },
    medhhinc_2016: {
      value: 0.28,
      label: "$40k (28th percentile)"
    }
  };
  const fremontTract = {
    share_black2010: {
      value: 0.04,
      label: "4%"
    },
    share_black_stayed: {
      value: 0.49,
      label: "49%"
    },
    medhhinc_1990: {
      value: 0.86, // 86th percentile
      label: "$81k (86th percentile)"
    },
    medhhinc_2016: {
      value: 0.96, // 96th percentile
      label: "$120k (96th percentile)"
    }
  };

  const keys = Object.keys(fremontTract);

  const dotMap = {
    share_black2010: "blue",
    share_black_stayed: "green",
    medhhinc_1990: "red",
    medhhinc_2016: "yellow"
  };

  const fillMap = {
    share_black2010: "#5367A2",
    share_black_stayed: "#82A884",
    medhhinc_1990: "#D8284F",
    medhhinc_2016: "#EFAE38"
  };

  const dataset = keys.map((key) => ({
    key,
    gardena: gardenaTract[key].value,
    fremont: fremontTract[key].value
  }));

  const getSlideIndex = (field, key) => {
    const slide = copy.slides2.find((d) => d.field === field && d.key === key);
    return parseInt(slide?.id ?? 0);
  };

  const WIDTH = 550;
  const HEIGHT = 600;

  const yScale = scaleLinear().domain([0, 1]).range([0, -Math.PI]);
  const paddingScale = scaleLinear()
    .domain([0, dataset.length + 4])
    .range([120, HEIGHT / 2]);

  // extent size
  const axisDomain = [0, 0.25, 0.5];
  const ticks = [0, 0.5];

  const arc = (d, i, dir, field) =>
    d3_arc()
      .innerRadius(paddingScale(i) - 15)
      .outerRadius(paddingScale(i + 1) - 20)
      .startAngle(0);

  const getAxis = (d, direction = "left") => {
    if (direction === "left") {
      return pointRadial(yScale(d), 60);
    } else {
      return pointRadial(-yScale(d), 60);
    }
  };

  const formatAxis = (d) => format(".0%")(d);

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
    const dataIndex = getSlideIndex(slide.field, slide.key);

    const stepData = dataset[dataIndex ?? 0];
    const direction = slide.field === "gardena" ? 1 : -1;
    const radialPath = select(
      `#${slide.field}-paths > path[data-key="${slide.field}-${slide.key}"]`
    );

    const el = document.querySelector(`li[data-key="${slide.field}-${slide.key}"]`);

    if (!el?.classList.contains("!opacity-100")) {
      el?.classList.add("!opacity-100");
    } else {
      el?.classList.remove("!opacity-100");
    }

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

<div class="flex items-center justify-center h-screen px-4 mx-auto my-0 max-w-7xl">
  <div class="grid items-center max-h-full grid-cols-12 grid-rows-6 gap-3">
    <div class="col-span-6 row-span-4 row-start-4 lg:col-span-2 lg:row-span-full">
      <p class="mb-4 text-2xl font-bold uppercase dubois">Gardena</p>
      <ul class="flex flex-col gap-4 text-sm uppercase list-none dubois">
        {#each dataset as d}
          <li data-key={`gardena-${d.key}`} class="flex flex-col opacity-25">
            <div class="flex items-center self-start gap-1">
              <div class={`w-4 h-4 border border-black rounded-full dot-${dotMap[d.key]}`} />
              <p class="font-bold">{@html gardenaTract[d.key].label}</p>
            </div>
            <p>{@html copy.labels[d.key]}</p>
          </li>
        {/each}
      </ul>
    </div>
    <div class="col-span-12 row-span-3 row-start-1 lg:col-span-8 lg:row-span-full">
      <svg class="w-full h-full" viewBox={[-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT]}>
        <g transform="translate(0, 50)">
          <!-- left axis -->
          <g>
            {#each axisDomain as d}
              <g>
                <path class="stroke-gray-600" stroke-width={0.5} d={getPath(d, "left")} />
                {#if ticks.includes(d)}
                  <text
                    font-size={10}
                    class="uppercase text-label dubois fill-gray-600"
                    dx="-0.25em"
                    dy="0.35em"
                    x={getAxis(d, "left")[0]}
                    y={getAxis(d, "left")[1]}
                  >
                    {formatAxis(d)}
                  </text>
                {/if}
              </g>
            {/each}
          </g>
          <!-- right axis -->
          <g>
            {#each axisDomain as d}
              <g>
                <path class="stroke-gray-600" stroke-width={0.5} d={getPath(d, "right")} />
                {#if ticks.includes(d) && d !== 0 && d !== 1}
                  <text
                    font-size={10}
                    class="uppercase text-label dubois fill-gray-600"
                    dx="-0.35em"
                    dy="0.35em"
                    x={getAxis(d, "right")[0]}
                    y={getAxis(d, "right")[1]}
                  >
                    {formatAxis(d)}
                  </text>
                {/if}
              </g>
            {/each}
          </g>
          <g id="gardena-paths">
            {#each dataset as d}
              <path
                data-key={`gardena-${d.key}`}
                fill={fillMap[d.key]}
                stroke={"#262626"}
                stroke-width={1}
                d={arc(d, getSlideIndex(d.field, d.key), 1, "gardena")}
              />
            {/each}
          </g>
          <g id="fremont-paths">
            {#each dataset as d}
              <path
                data-key={`fremont-${d.key}`}
                fill={fillMap[d.key]}
                stroke={"#262626"}
                stroke-width={1}
                d={arc(d, getSlideIndex(d.field, d.key), -1, "fremont")}
              />
            {/each}
          </g>
        </g>
      </svg>
    </div>
    <div class="col-span-6 row-span-4 row-start-4 lg:col-span-2 lg:row-span-full">
      <p class="mb-4 text-2xl font-bold text-right uppercase dubois">Fremont</p>
      <ul class="flex flex-col gap-4 text-sm text-right uppercase list-none dubois">
        {#each dataset as d}
          <li data-key={`fremont-${d.key}`} class="flex flex-col opacity-25">
            <div class="flex items-center self-end gap-1">
              <p class="font-bold">{@html fremontTract[d.key].label}</p>
              <div class={`w-4 h-4 border border-black rounded-full dot-${dotMap[d.key]}`} />
            </div>
            <p>{@html copy.labels[d.key]}</p>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .dubois {
    font-family: var(--dubois);
  }
  .dot-yellow {
    background-color: var(--color-db-yellow);
  }
  .dot-red {
    background-color: var(--color-db-red);
  }
  .dot-green {
    background-color: var(--color-db-green);
  }
  .dot-blue {
    background-color: var(--color-db-blue);
  }
</style>
