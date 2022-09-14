<script>
// import { beforeUpdate } from "svelte";


  // import Block from "$components/Block.svelte";

  export let id;
  export let text;
  export let subhead;
  // export let type;
  // export let stepIndex
  export let className = "";
  // export let year

  const grafs = text.split("\n");

  const positioningClasses = {
    "madera-ggp": "col-start-1 col-span-5",

    "madera-mom": "col-start-1 col-span-5 ",

    "gardena-mom-and-me": "col-start-5 col-span-5",

    "gardena-preschool": "col-start-5 col-span-5",

    "fremont": "col-start-7 col-span-5",

  };

  // beforeUpdate(() => {
  //   console.info("LeadText", stepIndex)
  // })
</script>

<div class={`${className} grid grid-cols-12 gap-3 w-full max-w-5xl`}>
  <div class={`${positioningClasses[id]} p-4`}>
    {#if subhead}
    <p class="text-label mt-6 mb-2 text-3xl">{subhead}</p>
    {/if}
    {#each grafs as graf}
      <p class="text-label text-lg mb-4">{@html graf}</p>
    {/each}
  </div>
</div>
