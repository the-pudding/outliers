<script>
  import Block from "$components/Block.svelte";

  export let id;
  export let text;
  export let title;
  export let key = "";

  const grafs = text.split("\n");
</script>

<Block {id} type="text">
  <section id="methodology">
    <h3 class="mb-4 text-xl font-bold">{@html title}</h3>
    <ul>
      {#each grafs as graf}
        <li class={`mb-5 text-lg ${key}`}>{@html graf}</li>
      {/each}
    </ul>
  </section>
</Block>

<style>
  #methodology {
    margin: 3rem 0 8rem 0;
    border-top: 1px solid var(--color-off-black);
    padding: 1rem 0 0 0;
  }

  h3 {
    font-size: 24px;
    font-family: var(--dubois-wide);
    text-transform: uppercase;
  }

  ul{
    list-style: square;
    padding-left: 1rem;
  }

  li {
    font-family: var(--sans);
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  :global(#methodology a) {
    color: var(--color-off-black);
  }

  :global(#methodology a:hover) {
    color: var(--color-db-red);
  }
</style>
