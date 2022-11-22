<script>
  import { beforeUpdate } from "svelte";

  import RadialPath from "./RadialPath.svelte";

  import { scaleLinear, pointRadial, format } from "d3";
  import {
    activeKey,
    activeDirection,
    initialKeySet,
    activeKeySet,
    activeStep,
    activeProgress
  } from "./stores";

  import copy from "$data/doc.json";

  // for reference/data check
  //
  // ---
  // const GARDENA_GEO_ID = "06037541001";
  // const FREMONT_GEO_ID = "06001441924";
  // ---

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

  const dataset = keys.map((key) => ({
    key,
    gardena: gardenaTract[key].value,
    fremont: fremontTract[key].value
  }));

  const WIDTH = 550;
  const HEIGHT = 600;

  const yScale = scaleLinear().domain([0, 1]).range([0, -Math.PI]);
  const paddingScale = scaleLinear()
    .domain([0, dataset.length + 4])
    .range([120, HEIGHT / 2]);

  // extent size
  const axisDomain = [0, 0.25, 0.5];
  const ticks = [0, 0.5];

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

  export let stepIndex;
  export let stepDirection;

  beforeUpdate(() => {
    if (stepIndex == undefined) return;

    const slide = copy.slides2[stepIndex];

    activeDirection.set(stepDirection);

    activeKey.set(`${slide.field}-${slide.id}`);

    // set up to N
    const index = $initialKeySet.indexOf($activeKey);
    activeKeySet.set($initialKeySet.filter((_, i) => i <= index));

    // if we end near the end of the view with only the gardena
    // path visible, set all the keys to an empty array
    if (
      $activeStep.direction === "up" &&
      $activeStep.state === "exit" &&
      $activeKeySet.length === 1 &&
      $activeKey === $initialKeySet[0] &&
      $activeProgress === 0
    ) {
      // exiting the chart, unspin the last path
      activeKeySet.set([]);
    }
  });
</script>

<div
  class="flex items-center justify-center h-[80vh] md:h-screen px-4 mx-auto my-0 max-w-7xl relative z-[999]"
>
  <div class="grid items-center max-h-full grid-cols-12 grid-rows-6 gap-3">
    <div class="col-span-6 row-span-4 row-start-4 lg:col-span-2 lg:row-span-full right-pad">
      <p class="mb-4 text-2xl font-bold uppercase dubois">Gardena</p>
      <ul class="flex flex-col gap-4 text-sm uppercase list-none dubois">
        {#each dataset as d, i}
          <li
            data-index={i}
            data-field="gardena"
            data-key={d.key}
            class={`flex flex-col transition-opacity duration-700 ${
              $activeKeySet.includes(`gardena-${i}`) ? "opacity-100" : "opacity-25"
            }`}
          >
            <div class="flex items-center self-start gap-1">
              <div class={`w-4 h-4 border border-black rounded-full dot-${dotMap[d.key]}`} />
              <p class="font-bold">{@html gardenaTract[d.key].label}</p>
            </div>
            <p class="inline-block p-1 rounded-sm lg:p-0 description">{@html copy.labels[d.key]}</p>
          </li>
        {/each}
      </ul>
    </div>
    <div class="col-span-12 row-span-3 row-start-1 lg:col-span-8 lg:row-span-full">
      <svg
        class="w-full h-full mt-0 sm:mt-10 lg:mt-0"
        viewBox={[-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT]}
      >
        <g transform="translate(0, 50)">
          <!-- left axis -->
          <g transform="translate(0, -25)">
            {#each axisDomain as d}
              <g>
                <path class="axis-stroke" stroke-width={0.5} d={getPath(d, "left")} />
                {#if ticks.includes(d)}
                  <text
                    class="uppercase text-label dubois axis-text"
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
          <g transform="translate(0, -25)">
            {#each axisDomain as d}
              <g>
                <path class="axis-stroke" stroke-width={0.5} d={getPath(d, "right")} />
                {#if ticks.includes(d) && d !== 0 && d !== 1}
                  <text
                    class="uppercase text-label dubois axis-text"
                    dx="-1em"
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
            {#each dataset as d, index}
              <RadialPath {d} {index} {paddingScale} {yScale} field="gardena" />
            {/each}
          </g>
          <g id="fremont-paths">
            {#each dataset as d, index}
              <RadialPath {d} {index} {paddingScale} {yScale} field="fremont" />
            {/each}
          </g>
        </g>
      </svg>
    </div>
    <div class="col-span-6 row-span-4 row-start-4 lg:col-span-2 lg:row-span-full left-pad">
      <p class="mb-4 text-2xl font-bold text-right uppercase dubois">Fremont</p>
      <ul class="flex flex-col gap-4 text-sm text-right uppercase list-none dubois">
        {#each dataset as d, i}
          <li
            data-index={i}
            data-field="fremont"
            data-key={d.key}
            class={`flex flex-col transition-opacity duration-700 ${
              $activeKeySet.includes(`fremont-${i}`) ? "opacity-100" : "opacity-25"
            }`}
          >
            <div class="flex items-center self-end gap-1">
              <p class="font-bold">{@html fremontTract[d.key].label}</p>
              <div class={`w-4 h-4 border border-black rounded-full dot-${dotMap[d.key]}`} />
            </div>
            <div>
              <p class="inline-block p-1 rounded-sm lg:p-0 description">
                {@html copy.labels[d.key]}
              </p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .left-pad {
    padding-left: 1rem;
  }
  .right-pad {
    padding-right: 1rem;
  }
  .axis-stroke {
    stroke: var(--color-off-black);
    stroke-width: 1px;
  }
  .axis-text {
    fill: var(--color-off-black);
    font-size: 1.15rem;
  }
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

  @media only screen and (min-width: 400px) {
    .axis-text {
      font-size: 1rem;
    }
  }

  @media only screen and (min-width: 500px) {
    .axis-text {
      font-size: 0.75rem;
    }
  }

  @media only screen and (min-width: 700px) {
    .axis-text {
      font-size: 0.6rem;
    }
  }
</style>
