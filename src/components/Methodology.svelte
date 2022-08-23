<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;
  export let title
  export let key = "";

  const grafs = text.split("\n");
</script>

<Block {id} type="text">
  <section id="methodology" class=" bg-slate-100 shadow-lg rounded-lg pointer-events-auto p-4 text-label">
    <h3 class="font-bold mb-4 text-xl">{@html title}</h3>
    {#each grafs as graf}
      <p class={`mb-5 text-lg ${key}`}>{@html graf}</p>
    {/each}
  </section>
</Block>
