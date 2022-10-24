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

    "madera-farm": "col-start-1 col-span-5",

    "madera-mom": "col-start-1 col-span-5 ",

    "gardena-mom-and-me": "col-start-7 col-span-5",
    
    "gardena-air": "col-start-7 col-span-5",

    "gardena-preschool": "col-start-7 col-span-5",

    "fremont": "col-start-1 col-span-5",

    "fremont-2": "col-start-1 col-span-5",

    "fremont-income": "col-start-1 col-span-5",

  };

  // beforeUpdate(() => {
  //   console.info("LeadText", stepIndex)
  // })
</script>

<div class={`${className} grid grid-cols-12 gap-3 w-full max-w-5xl`}>
  <div class={`${positioningClasses[id]} p-4`}>
    {#if subhead}
    <p class={`subhed subhed-${subhead.split(',')[0]} text-label mt-6 mb-2 text-3xl`}>{subhead}</p>
    {/if}
    {#each grafs as graf}
      <p class="text-label text-lg mb-4">{@html graf}</p>
    {/each}
  </div>
</div>

<style>
  .subhed.text-label {
    font-family: var(--dubois-wide);
    text-transform: uppercase;
    font-size: 24px;
  }

  .subhed-Madera::before, .subhed-Gardena::before, .subhed-Fremont::before {
      display: inline-block;
	    width:1rem;
	    height:1rem;
      border-radius: 50%;
	    content: '';
	    border: 1px solid var(--color-off-black);
	    position: relative;
      margin-right: 0.25rem;
      left: 0rem;
      top: 0rem;
  }

  .subhed-Madera::before {
    background-color: var(--color-db-pink);
  }
  .subhed-Gardena::before {
    background-color: var(--color-db-yellow);
  }
  .subhed-Fremont::before {
    background-color: var(--color-db-green);
  }
</style>
