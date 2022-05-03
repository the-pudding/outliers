<script>
  import copy from "$data/doc.json";

  import Block from "$components/Block.svelte";
  import Text from "$components/Text.svelte";
  import Subhead from "$components/Subhead.svelte";
  import Image from "$components/Image.svelte";

  const blocks = {
    text: Text,
    image: Image,
    subhead: Subhead
  };
</script>

<article class="px-4">
  <Block>
    <h1 class="text-3xl font-bold underline">{copy.title}</h1>
  </Block>

  {#each copy.blocks as props, i}
    <svelte:component this={blocks[props.block] ?? Text} id={props.id ?? `graf-${i}`} {...props} />
  {/each}
</article>
