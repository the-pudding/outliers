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
  let w;

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
    await popIn(largeUSPaths, "opacity", 1, 250, 0);
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
    headlineSpan = selectAll(".hed-block");
    console.log(w, headlineSpan)
    run();
  });

</script>

<svelte:window bind:innerWidth={w}/>

<div class="w-full relative z-50 h-4/5 mb-6">
  <!-- <div class="absolute w-full"> -->
    <Header />
  <!-- </div> -->
  <div class="overlays">
    <div class="intro-svg">{@html usMap}</div>
    <div class="intro-cutout"><img src="/assets/img/aaron_cutout.png" alt="the author as a toddler dressed up in a white shirt, black pants, a black bowtie, and yellow suspenders"></div>
  </div>
  {#if w < 700}
  <div class="hed">
    <p class="hed-text">On Upward Mobility</p>
      <div class="intro-block">
        <p class="intro-text">{copy.description}</p>
        <p class="byline">By <a href="https://pudding.cool" title={copy.byline}>{copy.byline}</a></p>
        <p class="byline sm">With <a href="https://pudding.cool/author/jan-diehm/">Jan Diehm</a> and <a href="https://pudding.cool/author/michelle-mcghee/">Michelle McGhee</a></p>
      </div>
  </div>
  {:else} 
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
  {/if}
  <h1 aria-label="On Upward Mobility">On Upward Mobility</h1>
</div>

<style>
  .overlays {
    position: relative;
    height: calc(100vw/1.75);
    max-width: 80rem;
    margin: 0 auto;
  }
  .intro-svg, .intro-cutout {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .hed {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    max-width: 80rem;
    margin: 3rem auto 0 auto;
  }

  .hed-block {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    position: relative;
  }

  .hed-text {
    font-family: var(--dubois-wide);
    text-transform: uppercase;
    font-size: 4rem;
    padding: 0;
    line-height: 1;
  }

  .hed-text span {
    display: inline-block;
  }

  .intro-text, .byline {
    font-size: 16px;
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
    border-top: none;
    position: relative;
    padding: 1rem 0;
    margin-top: 0rem;
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

  @media only screen and (min-width: 550px) {
    .intro-text {
      font-size: 20px;
    }

    .hed {
      padding: 0 2rem;
    }
  }

  @media only screen and (min-width: 700px) {
    .hed-text {
      font-size: 3.5rem;
      padding: 0 1rem;
    }

    .hed {
      display: flex;
      flex-direction: row;
      margin: 6rem auto 0 auto;
    }

    .intro-block {
      border-top: 2px solid var(--color-db-red);
      position: relative;
      padding: 1rem 1rem 0 1rem;
      margin-top: 0rem;
    }
  }

  @media only screen and (min-width: 800px) {
    .hed-text {
      font-size: 4.125rem;
    }
  }

  @media only screen and (min-width: 1000px) {
    .hed-text {
      font-size: 5.5rem;
    }
  }
</style>
