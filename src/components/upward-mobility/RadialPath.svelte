<script>
  import { arc as d3_arc, interpolate } from "d3";
  import { beforeUpdate } from "svelte";

  import { activeKeySet } from "./stores";

  const fillMap = {
    share_black2010: "#5367A2",
    share_black_stayed: "#82A884",
    medhhinc_1990: "#D8284F",
    medhhinc_2016: "#EFAE38"
  };

  export let field;
  export let index;
  export let d;
  export let paddingScale;
  export let yScale;

  const key = `${field}-${index}`;

  const dir = field === "gardena" ? 1 : -1;
  const startAngle = 0;
  const endAngle = dir * yScale(d[field]);

  const arc = d3_arc()
    .innerRadius(paddingScale(index) - 15)
    .outerRadius(paddingScale(index + 1) - 20)
    .startAngle(startAngle);
  // .endAngle(endAngle);

  const pathD = arc.endAngle(endAngle)(d);

  const interpolater = interpolate(startAngle, endAngle);
  const curve = (node, { delay = 0, duration = 400 }) => ({
    delay,
    duration,
    css: (t) => `d: path("${arc.endAngle(interpolater(t))(d)}")`
  });

  let isActive = false;

  beforeUpdate(async () => {
    isActive = $activeKeySet.includes(key);
  });
</script>

{#if isActive}
  <path
    transition:curve
    data-index={index}
    data-field={field}
    data-key={d.key}
    fill={fillMap[d.key]}
    class="stroke-1 stroke-gray-900"
    d={pathD}
  />
{/if}
