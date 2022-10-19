<script>
  import Header from "$components/Header.svelte";
  import ImageRaw from "./ImageRaw.svelte";
  import usMap from "$svg/story/intro_map.svg";
  import { selectAll, interpolateString, easeLinear } from "d3";
  import { onMount } from "svelte";

  import copy from "$data/doc.json";

  let cutoutPhoto;
  let largeUSPaths;
  let smallUSPaths
  let filledPath;
  let headlineSpan;

  function drawPaths(pathCollection) {
    return new Promise((resolve) => {
      const paths = pathCollection;
      const lineNodes = pathCollection._groups[0];
      const lineLengths = [...lineNodes].map((el) => el.getTotalLength());

      paths
        .attr("stroke-dasharray", (d, i) => lineLengths[i])
        .attr("stroke-dashoffset", (d, i) => lineLengths[i])
        .transition()
        //.delay((d, i) => i * 100)
        .duration(1500)
        .ease(easeLinear)
        .attr("stroke-dashoffset", 0)
        .on("end", resolve);
    })
  }
  
  function popIn(item, property, val, delay, dur) {
    return new Promise((resolve) => {
      item
        .transition()
        .delay(delay)
        .duration(dur)
        .ease(easeLinear)
        .style(property, val)
        .on("end", resolve);
    })
  }

  async function run() {
    await drawPaths(largeUSPaths);
    await popIn(smallUSPaths, "opacity", 1, 250, 0);
    await drawPaths(smallUSPaths);
    await popIn(filledPath, "fill", "#262626", 250, 0);
    await popIn(cutoutPhoto, "opacity", 1, 230, 0);
    await popIn(headlineSpan, "top", "-100px", 250, 500);
  }

  onMount(() => {
    cutoutPhoto = selectAll(".intro-cutout img");
    filledPath = selectAll("#map_x5F_filled");
    largeUSPaths = selectAll("#large_x5F_us path");
    smallUSPaths = selectAll("#small_x5F_us path");
    headlineSpan = selectAll("h1 span, .intro-text");
    run();
  });

</script>

<div class="w-full relative z-50 h-4/5 mb-6">
  <!-- <div class="absolute w-full"> -->
    <Header />
  <!-- </div> -->
  <div class="overlays">
    <div class="intro-svg">{@html usMap}</div>
    <div class="intro-cutout"><img src="/assets/img/aaron_cutout.png"></div>
  </div>
  <h1>On <span>Upward</span> Mobility</h1>
  <div class="intro-text">
    <p class="mb-4">{copy.description}</p>
    <p>By <a href="https://pudding.cool" title={copy.byline}>{copy.byline}</a></p>
  </div>
</div>

<style>
  .overlays {
    position: relative;
    height: calc(100vw/1.75);
  }
  .intro-svg, .intro-cutout {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .intro-text {
    position: relative;
    top: 200px;
    margin: 0 0 5rem 27%;
    max-width: 22rem;
    font-family: var(--dubois);
    text-transform: uppercase;
    font-size: 18px;
  }

  .intro-text a {
    font-weight: 700;
    color: var(--color-off-black) !important;
  }

  .intro-cutout img {
    opacity: 0;
  }

  :global(.intro-cutout) {
    z-index: 1000;
  }

  :global(.intro-svg svg) {
    width: 100%;
  }

  :global(.intro-svg svg #large_x5F_us path) {
    stroke-width: 2px;
  }

  h1 {
    font-family: var(--dubois-wide);
    text-align: center;
    text-transform: uppercase;
    font-size: 86px;
  }

  h1 span {
    display: inline-block;
    position: relative;
    top: 200px;
    margin: 0 1rem;
  }
</style>
