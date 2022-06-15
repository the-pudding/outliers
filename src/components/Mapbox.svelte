<script>
  import copy from "$data/doc.json";
  import losAngelesNeighborhoods from "$data/la-county-geo.json";
  import { onMount, beforeUpdate } from "svelte";
  import mapbox from "mapbox-gl";

  export let index = undefined;

  let container;
  let map;

  // set mapbox config detials based on slide index
  const mapboxConfig = new Map();
  mapboxConfig.set("default", {
    center: [-122.257426, 37.829682],
    zoom: 10, // 0 = earth, 3 = continent, 10 = roads, 15 = buildings
    pitch: 0
  });
  mapboxConfig.set("gardena", {
    center: [-118.2998, 33.8818],
    zoom: 11,
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

    // add neighborhoods data to map
    map.on("load", () => {
      map.addSource("county", {
        type: "geojson",
        data: losAngelesNeighborhoods
      });
      // add base neighborhood layer
      map.addLayer({
        id: "neighborhoods",
        type: "fill",
        source: "county", // reference the data source
        paint: {
          "fill-opacity": 0,
          "fill-outline-color": "transparent"
        },
        filter: ["==", "$type", "Polygon"]
      });
      // add highlight layer
      map.addLayer({
        id: "neighborhoods-highlighted",
        type: "fill",
        source: "county", // reference the data source
        paint: {
          "fill-color": "#D9AE5F",
          "fill-opacity": 0.5,
          "fill-outline-color": "transparent"
        },
        // empty filter to display: none;
        filter: ["in", "Name", ""]
      });
    });
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
      if (slide.id === "gardena") {
        // Query the counties layer visible in the map.
        // Only onscreen features are returned.
        // Use filter to collect only results
        // with the same county name.
        map.setFilter("neighborhoods-highlighted", [
          "any",
          ["in", "Name", "Gardena"],
          ["in", "Name", "West Compton"]
        ]);
      } else if (slide.id === "sandel") {
        map.rotateTo(80, { duration: 6500 });
      } else if (slide.id === "playa-del-rey") {
        map.rotateTo(-120, { duration: 6500 });
      } else {
        map.setFilter("neighborhoods-highlighted", ["in", "Name", ""]);
        map.rotateTo(0, { duration: 2500 });
      }
    });
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css" on:load={load} />
</svelte:head>

<div bind:this={container} class="w-full h-screen relative z-0" />
