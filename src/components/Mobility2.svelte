<script>
    import { onMount, beforeUpdate } from "svelte";
    import mapbox from "mapbox-gl";
    
    import copy from "$data/doc.json";
  
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
    mapboxConfig.set("smog", {
      center: [-118.270405, 33.8899148],
      zoom: 16,
      pitch: 80
    });
    mapboxConfig.set("playa-del-rey", {
      center: [-118.43411, 33.95663],
      zoom: 14,
      pitch: 80
    });
    mapboxConfig.set("fremont", {
      center: [-122.001, 37.5306],
      zoom: 11,
      pitch: 0
    });
    mapboxConfig.set("transition", {
      center: [-121.969, 37.562],
      zoom: 16,
      pitch: 80
    });
  
    const load = () => {
      map = new mapbox.Map({
        container,
        // style: "mapbox://styles/dock4242/cl12rp23h001i15l6gy75w6e4",
        style: "mapbox://styles/aboutaaron/cl3157ite000a15pn86mr94gv", // style URL
        ...mapboxConfig.get("default"),
        // min/max zoom determined by tileset
        minZoom: 10,
        maxZoom: 13,
      });
      const maxzoom = Math.max(...[...mapboxConfig.values()].map((d) => d?.zoom).filter((d) => d));
      // add controls
      map.addControl(
        new mapbox.NavigationControl({
          showZoom: false
        })
      );
      // disable map zoom when using scroll
      map.scrollZoom.disable();
      // disable map rotation using right click + drag
      map.dragRotate.disable();
      // disable map rotation using touch rotation gesture
      map.touchZoomRotate.disableRotation();
  
    }
  
    onMount(() => {
      mapbox.accessToken = "pk.eyJ1IjoiYWJvdXRhYXJvbiIsImEiOiJsRTRpMGJnIn0.aprlJ6wE1JQqBx4EH1lkMQ";
      // "pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ";
      load();
    });
  
    beforeUpdate(() => {
      const slide = copy.slides2[index ?? 0];
      const hasId = Object.prototype.hasOwnProperty.call(slide, "id");
      if (!hasId || index === undefined) return null;
  
      map.flyTo(mapboxConfig.get(slide.id));
      map.once("moveend", () => {
        if (slide.id === "gardena") {
          // quickly rotate back if coming from previous step
          map.rotateTo(0, { duration: 2500 });
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
          map.setFilter("neighborhoods-highlighted", ["in", "Name", ""]);
          map.rotateTo(80, { duration: 6500 });
          map.setFog({
            // range: [-1, 1.5],
            color: "transparent",
            "horizon-blend": 0.1
          });
        } else if (slide.id === "smog") {
          // add fog to simulate smog
          // Add fog
          map.setFog({
            // range: [-1, 1.5],
            color: "rgba(194, 189, 158, 1.0)",
            "horizon-blend": 0.1
          });
        } else if (slide.id === "playa-del-rey") {
          map.setFilter("fremontN-highlighted", ["in", "NAME", ""]);
          map.setFilter("neighborhoods-highlighted", ["in", "Name", "Playa del Rey"]);
          map.rotateTo(-120, { duration: 6500 });
          map.setFog({
            // range: [-1, 1.5],
            color: "transparent",
            "horizon-blend": 0.1
          });
        } else if (slide.id === "fremont") {
          // TODO: highlight fremont
          map.setFilter("fremontN-highlighted", ["!=", "NAME", ""]);
          map.rotateTo(0, { duration: 2500 });
        } else if (slide.id === "transition") {
          map.setFilter("fremontN-highlighted", ["in", "NAME", ""]);
          map.rotateTo(280, { duration: 6500 });
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
  