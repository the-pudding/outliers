<script>
  import copy from "$data/doc.json";

  import Text from "$components/Text.svelte";
  import Subhead from "$components/Subhead.svelte";
  import Image from "$components/Image.svelte";
  import Mapbox from "$components/Mapbox.svelte";
  import Hero from "$components/Hero.svelte";
  import Map from "$components/Map.svelte";

  const blocks = {
    text: Text,
    image: Image,
    subhead: Subhead,
    mapbox: Mapbox,
    map: Map
  };
</script>

<article class="px-4">
  <Hero>
    <h1 class="text-3xl font-bold underline">{copy.title}</h1>
  </Hero>

  {#each copy.blocks as props, i}
    <svelte:component this={blocks[props.block] ?? Text} id={props.id ?? `graf-${i}`} {...props} />
  {/each}
</article>
