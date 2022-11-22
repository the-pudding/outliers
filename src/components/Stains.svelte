<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  export let height;

  let randomW;
  let randomH;
  let randomRotate;
  let randomStain;
  let numStains;
  let numStainsArray;
  let stains;
  let width;
  let stainImgs = [
    "assets/img/stain1.png",
    "assets/img/stain2.png",
    "assets/img/stain3.png",
    "assets/img/stain4.png",
    "assets/img/stain5.png"
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  onMount(() => {
    randomW = getRandomInt(width) - 200;
    randomH = getRandomInt(height) - 200;
    randomRotate = getRandomInt(360);
    randomStain = getRandomInt(stainImgs.length);
    numStains = Math.round(height / 1000);
    numStainsArray = [...Array(numStains).keys()];

    stains = numStainsArray.map((d, i) => ({
      ...d,
      randomW: getRandomInt(innerWidth - 200),
      randomH: getRandomInt(height - 200),
      randomRotate: getRandomInt(360),
      img: stainImgs[getRandomInt(stainImgs.length)]
    }));
  });
</script>

<div class="stains" style="height: {height}px" bind:clientWidth={width}>
  {#if stains != undefined}
    {#each stains as stain, i}
      <div
        style="top: {stain.randomH}px; left: {stain.randomW}px; transform: rotate({stain.randomRotate}deg); background-image: url('{stain.img}'), url('https://pudding.cool/2022/11/upward-mobility/assets/img/bg_texture.png')"
      />
    {/each}
  {/if}
</div>

<style>
  .stains {
    /* setting to 100% blows out container */
    width: 90%;
    overflow-x: hidden;
    position: absolute;
    top: 0;
  }

  .stains div {
    width: 200px;
    height: 200px;
    position: absolute;
    background-size: contain;
    background-blend-mode: darken;
    background-color: var(--color-db-bg-tan);
    background-repeat: no-repeat;
    opacity: 0.35;
  }
</style>
