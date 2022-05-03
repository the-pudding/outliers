<script>
  import copy from "$data/doc.json";

  import Text from "$components/Text.svelte";
  import Subhead from "$components/Subhead.svelte";
  import Image from "$components/Image.svelte";

  const blocks = {
    text: Text,
    image: Image,
    subhead: Subhead
  };
</script>

<article>
  {#each copy.blocks as props, i}
    <svelte:component this={blocks[props.block] ?? Text} id={props.id ?? `graf-${i}`} {...props} />
  {/each}
</article>
