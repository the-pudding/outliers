<script>
  import { onMount } from "svelte";
  import mapbox from "mapbox-gl";

  let container;
  let map;

  const load = () => {
    map = new mapbox.Map({
      container,
      style: "mapbox://styles/dock4242/cl12rp23h001i15l6gy75w6e4",
      center: [10, 10],
      zoom: 3 // 0 = earth, 3 = continent, 10 = roads, 15 = buildings
    });
  };

  const fly = () => {
    map.flyTo({
      center: [-122.257426, 37.829682],
      zoom: 10,
      essential: true
    });
  };

  onMount(() => {
    mapbox.accessToken =
      "pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ";
    load();
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css" on:load={load} />
</svelte:head>

<div bind:this={container} />
<button on:click={fly}>fly</button>

<style>
  div {
    height: 500px;
    width: 100%;
  }
</style>
