<script>
    import Block from "$components/Block.svelte";
  
    export let id;
    export let text;
    export let key = ""
  
    const grafs = text.split("\n");
    
    const dropcap = id === "dropcap"
  </script>
  
  <Block {id} type="slide">
    {#each grafs as graf}
      <p class:dropcap class={`mb-5 text-lg ${key} text-label`}>{@html graf}</p>
    {/each}
  </Block>
  