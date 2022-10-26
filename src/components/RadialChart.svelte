<script>
  import { beforeUpdate } from "svelte";

  import { scaleLinear, select,  arc as d3_arc, pointRadial, interpolate } from "d3";
 
  import copy from "$data/doc.json";

  
  // for reference/data check
  //
  // ---
  // const GARDENA_GEO_ID = "06037541001";
  // const FREMONT_GEO_ID = "06001441924";
  // ---

  // converting dollars to precents to display on chart
  const MAX_MED_HH_INC = 120000

  const gardenaTract = {
    share_black2010: {
      value: 0.48,
      label: "48%"
    },
    share_black_stayed: {
      value: 0.42,
      label: "42%",
    },
    medhhinc_1990: {value: 81000 / MAX_MED_HH_INC, label: "$81k"},
    medhhinc_2016: {value: 40000 / MAX_MED_HH_INC, label: "$40k"},
  }
  const fremontTract = {
    share_black2010: {
      value: 0.04,
      label: "4%"
    },
    share_black_stayed: {
      value: 0.49,
      label: "49%",
    },
    medhhinc_1990: {value: 84000 / MAX_MED_HH_INC, label: "$84k"},
    medhhinc_2016: {value: 120000 / MAX_MED_HH_INC, label: "$120k"},
  }

  const keys = Object.keys(fremontTract);

  const dotMap = {
    share_black2010: 'blue',
    share_black_stayed: 'green',
    medhhinc_1990: 'brown',
    medhhinc_2016: 'yellow',
  }

  const fillMap = {
    share_black2010: '#5367A2',
    share_black_stayed: '#82A884',
    medhhinc_1990: '#8F6952',
    medhhinc_2016: '#EFAE38',
    // kir_top20_pooled_pooled_p75: '#E89994'
  };


  const dataset = keys.map((key) => ({
    key,
    gardena: gardenaTract[key].value,
    fremont: fremontTract[key].value,
  }));

  const getSlideIndex = (field, key) => {
    const slide = copy.slides2.find(d => d.field === field && d.key === key)
    return parseInt(slide?.id ?? 0)
  }

  const WIDTH = 550;
  const HEIGHT = 600;

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
    const dataIndex = getSlideIndex(slide.field, slide.key)

    const stepData = dataset[dataIndex ?? 0];
    const direction = slide.field === "gardena" ? 1 : -1;
    const radialPath = select(
      `#${slide.field}-paths > path[data-key="${slide.field}-${slide.key}"]`
    );

    const el = document.querySelector(`li[data-key="${slide.field}-${slide.key}"]`)

    if (!el?.classList.contains("!opacity-100")) {
      el?.classList.add("!opacity-100")
    } else {
      el?.classList.remove("!opacity-100")
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

<div class="relative z-0 flex items-center justify-center w-full h-screen">
  <div class="grid grid-cols-12 gap-3 max-w-7xl">
    
    <div class="flex items-center justify-center col-span-2 text-label">
      <div>
        <p class="text-lg font-bold dubois-wide-24">Gardena</p>
  
        <ul class="text-sm list-none indent-left">
          {#each dataset as d}
            <li data-key={`gardena-${d.key}`} class={`mb-4 opacity-25 dubois-14 dot dot-left dot-${dotMap[d.key]}`}><b>{@html gardenaTract[d.key].label}</b><br>{@html copy.labels[d.key]}</li>  
          {/each}
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
                <path stroke="#D2B48C" stroke-width={0.5} d={getPath(d, "left")} />
                {#if ticks.includes(d)}
                  <text
                    font-size={10}
                    class="text-label dubois"
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
                <path stroke="#D2B48C" stroke-width={0.5} d={getPath(d, "right")} />
                {#if ticks.includes(d) && d !== 0 && d !== 1}
                  <text
                    font-size={10}
                    class="text-label dubois"
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
            {#each dataset as d}
              <path
                data-key={`gardena-${d.key}`}
                fill={fillMap[d.key]}
                stroke={'#262626'}
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
                stroke={'#262626'}
                stroke-width={1}
                d={arc(d, getSlideIndex(d.field, d.key), -1, "fremont")}
              />
            {/each}
          </g>
        </g>
      </svg>
    </div>

    <div class="flex items-center justify-center col-span-2 text-right text-label">
      <div>
        <p class="text-lg font-bold dubois-wide-24">Fremont</p>
  
        <ul class="text-sm list-none indent-right">

          {#each dataset as d}
            <li data-key={`fremont-${d.key}`} class={`mb-4 opacity-25 dubois-14 dot dot-right dot-${dotMap[d.key]}`}><b>{@html fremontTract[d.key].label}</b><br>{@html copy.labels[d.key]}</li>  
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .dubois-wide-24 {
    font-size: 24px;
    font-family: var(--dubois-wide);
    text-transform: uppercase;
    padding: 0 0 1rem 0;
  }

  .dubois-14 {
    font-size: 14px;
    font-family: var(--dubois);
    text-transform: uppercase;
  }

  .dubois {
    font-family: var(--dubois);
    text-transform: uppercase;
    fill: var(--color-off-black);
  }

  .indent-right {
    padding-right: 1rem;
  }
  .indent-left {
    padding-left: 1rem;
  }

  .dot::before {
    display: inline-block;
    width:1rem;
    height:1rem;
    border-radius: 50%;
    content: '';
    border: 1px solid var(--color-off-black);
    position: relative;
  }
    
  .dot-right::before {
    top: 0.15rem;
    left: 3rem;
  }

  .dot-left::before {
    top: 0.15rem;
    left: -0.25rem;
    margin-left: -1rem;
  }

  .dot-pink::before {
      background-color: var(--color-db-pink);
  }
  .dot-yellow::before {
      background-color: var(--color-db-yellow);
  }
  .dot-brown::before {
      background-color: var(--color-db-brown);
  }
  .dot-green::before {
      background-color: var(--color-db-green);
  }
  .dot-blue::before {
      background-color: var(--color-db-blue);
  }
</style>
