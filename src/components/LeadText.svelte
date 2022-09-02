<script>
// import { beforeUpdate } from "svelte";


  // import Block from "$components/Block.svelte";

  export let id;
  export let text;
  export let subhead;
  // export let type;
  export let stepIndex
  export let className = "";
  // export let year

  const grafs = text.split("\n");

  const positioningById = {
    madera: "col-span-5 col-start-2 lg:col-span-4 lg:col-start-3",
    gardena: "col-span-5 col-start-7 lg:col-span-4 lg:col-start-7",
    fremont: "col-span-5 col-start-2 lg:col-span-4 lg:col-start-3"
  };

  // beforeUpdate(() => {
  //   console.info("LeadText", stepIndex)
  // })
</script>

<div class={`${className} grid grid-cols-12`}>
  <div class={`${positioningById[id]} p-4`}>
    <p class="text-label mt-6 mb-2 text-3xl">{subhead}</p>
    {#each grafs as graf}
      <p class="text-label text-lg mb-4">{@html graf}</p>
    {/each}
  </div>
</div>
