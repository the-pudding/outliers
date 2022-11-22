<script>
  import loadImage from "$utils/loadImage";
  import fremont from "$svg/story/street_grid_fremont.svg";
  import gardena from "$svg/story/street_grid_gardena.svg";
  import madera from "$svg/story/street_grid_madera.svg";
  import { onMount } from "svelte";
  import { selectAll, easeLinear } from "d3";

  const isDev = process.env.NODE_ENV === "development";
  const placeholder = "https://via.placeholder.com/800x300";

  const rootpath = isDev ? "/" : "/2022/11/upward-mobility/";
  export let step;

  let maderaPaths;
  let gardenaPaths;
  let fremontPaths;

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
    });
  }

  function pathOrder(step) {
    if (step == 0) {
      drawPaths(maderaPaths);
    } else if (step == 3) {
      drawPaths(gardenaPaths);
    } else if (step == 6) {
      drawPaths(fremontPaths);
    }
  }

  $: pathOrder(step);

  onMount(() => {
    maderaPaths = selectAll("#madera-streets path");
    gardenaPaths = selectAll("#gardena-streets path");
    fremontPaths = selectAll("#fremont-streets path");
  });
</script>

<div class:visible={step >= 0 && step < 3} id="madera-wrapper">
  <div class="svg-wrapper">{@html madera}</div>
  <div class="img-wrapper">
    <img src="assets/img/madera-streets.png" alt="street grid lines of madera, ca." />
  </div>
</div>
<div class:visible={step > 2 && step < 6} id="gardena-wrapper">
  <div class="svg-wrapper">{@html gardena}</div>
  <div class="img-wrapper">
    <img src="assets/img/gardena-streets.png" alt="street grid lines of gardena, ca." />
  </div>
</div>
<div class:visible={step >= 6} id="fremont-wrapper">
  <div class="svg-wrapper">{@html fremont}</div>
  <div class="img-wrapper">
    <img src="assets/img/fremont-streets.png" alt="street grid lines of fremont, ca." />
  </div>
</div>

<style>
  div {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 1;
    opacity: 0;
    transition: opacity 1s;
  }

  .visible {
    opacity: 1;
  }

  .svg-wrapper,
  .img-wrapper {
    opacity: 1;
    width: 100%;
    height: 100vh;
  }

  #madera-wrapper {
    width: 100%;
    top: 0;
    left: 0;
  }

  #gardena-wrapper {
    width: 100%;
    top: 0;
    left: 0;
  }

  #fremont-wrapper {
    width: 100%;
    top: 0;
    left: 0;
  }

  @media only screen and (min-width: 700px) {
    #madera-wrapper {
      width: calc(100% - 8rem);
    }

    #gardena-wrapper {
      width: calc(100% - 8rem);
    }

    #fremont-wrapper {
      width: calc(100% - 8rem);
    }
  }
</style>
