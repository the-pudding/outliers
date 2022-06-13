<script>
  import copy from "$data/doc.json";
  import { onMount, beforeUpdate } from "svelte";
  import mapbox from "mapbox-gl";

  export let index = undefined;

  let container;
  let map;
  let flying = false;

  // set mapbox config detials based on slide index
  const mapboxConfig = new Map();
  mapboxConfig.set("default", {
    center: [-122.257426, 37.829682],
    zoom: 10, // 0 = earth, 3 = continent, 10 = roads, 15 = buildings
    pitch: 0
  });
  mapboxConfig.set("gardena", {
    center: [-118.2998, 33.8818],
    zoom: 10,
    pitch: 40
  });
  mapboxConfig.set("sandel", {
    center: [-118.270405, 33.8899148],
    zoom: 18,
    pitch: 50
  });
  mapboxConfig.set("playa-del-rey", {
    center: [-118.43411, 33.95663],
    zoom: 14,
    pitch: 60
  });
  mapboxConfig.set("fremont", {
    center: [-122.001, 37.5306],
    zoom: 11,
    pitch: 0
  });

  const rotateCamera = (timestamp) => {
    if (!map) return;
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    map.rotateTo((timestamp / 100) % 360, { duration: 0 });
    // Request the next frame of the animation.
    requestAnimationFrame(rotateCamera);
  };

  const load = () => {
    map = new mapbox.Map({
      container,
      // style: "mapbox://styles/dock4242/cl12rp23h001i15l6gy75w6e4",
      style: "mapbox://styles/aboutaaron/cl3157ite000a15pn86mr94gv", // style URL
      ...mapboxConfig.get("default")
    });

    // disable map zoom when ussing scroll
    map.scrollZoom.disable();
    // disable map rotation using right click + drag
    map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();
  };

  onMount(() => {
    mapbox.accessToken = "pk.eyJ1IjoiYWJvdXRhYXJvbiIsImEiOiJsRTRpMGJnIn0.aprlJ6wE1JQqBx4EH1lkMQ";
    // "pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ";
    load();
  });

  beforeUpdate(() => {
    const slide = copy.slides[index ?? 0];
    const hasId = Object.prototype.hasOwnProperty.call(slide, "id");
    if (!hasId || index === undefined) return null;

    map.flyTo(mapboxConfig.get(slide.id));
    map.once("moveend", () => {
      if (slide.id === "sandel") {
        map.rotateTo(80, { duration: 6500 });
      } else if (slide.id === "playa-del-rey") {
        map.rotateTo(-120, { duration: 6500 });
      } else {
        map.rotateTo(0, { duration: 2500 });
      }
    });
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css" on:load={load} />
</svelte:head>

<div bind:this={container} class="w-full h-screen relative z-0" />
