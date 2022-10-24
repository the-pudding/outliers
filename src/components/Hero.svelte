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
  let introBlockW;

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
        .duration(1000)
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
    await popIn(cutoutPhoto, "opacity", 1, 250, 0);
    await popIn(headlineSpan, "top", "-100px", 250, 250);
  }

  onMount(() => {
    cutoutPhoto = selectAll(".intro-cutout img");
    filledPath = selectAll("#map_x5F_filled");
    largeUSPaths = selectAll("#large_x5F_us path");
    smallUSPaths = selectAll("#small_x5F_us path");
    headlineSpan = selectAll(".hed-text span, .intro-block");
    run();
  });

</script>

<div class="w-full relative z-50 h-4/5 mb-6">
  <!-- <div class="absolute w-full"> -->
    <Header />
  <!-- </div> -->
  <div class="overlays">
    <div class="intro-svg">{@html usMap}</div>
    <div class="intro-cutout"><img src="/assets/img/aaron_cutout.png" alt="the author as a toddler dressed up in a white shirt, black pants, a black bowtie, and yellow suspenders"></div>
  </div>
  <div class="hed">
    <div><p class="hed-text">On</p></div>
    <div class="hed-block">
      <p class="hed-text"><span bind:clientWidth={introBlockW}>Upward</span></p>
      <div class="intro-block">
        <p class="intro-text" style="max-width: {introBlockW}px">{copy.description}</p>
        <p class="byline">By <a href="https://pudding.cool" title={copy.byline}>{copy.byline}</a></p>
        <p class="byline sm">With <a href="https://pudding.cool/author/jan-diehm/">Jan Diehm</a> and <a href="https://pudding.cool/author/michelle-mcghee/">Michelle McGhee</a></p>
      </div>
    </div>
    <div><p class="hed-text">Mobility</p></div>
  </div>
  <h1 aria-label="On Upward Mobility">On Upward Mobility</h1>
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

  .hed {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 6rem 0 0 0;
    padding: 0 1rem;
  }

  .hed-block {
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }

  .hed-text {
    font-family: var(--dubois-wide);
    text-transform: uppercase;
    font-size: 86px;
    padding: 0 1rem;
  }

  .hed-text span {
    display: inline-block;
  }

  .intro-text, .byline {
    font-size: 20px;
    font-family: var(--dubois);
    text-transform: uppercase;
    padding: 0 0 2rem 0;
  }

  .byline {
    padding: 0;
    font-size: 16px;
  }

  .byline a {
    font-weight: 700;
    color: var(--color-off-black) !important;
  }

  .sm {
    font-size: 14px;
    padding: 0;
  }

  .intro-block {
    border-top: 2px solid var(--color-db-red);
    position: relative;
    padding: 1rem 1rem 0 1rem;
    margin-top: -1rem;
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
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }
</style>
