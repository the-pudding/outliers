<script>
  export let id;
  export let type;
  export let className
</script>

<div {id} class={`block ${type} ${className} w-full mb-4`}>
  <slot />
</div>

<style>
  .block {
    margin: 0;
    max-width: none;
  }

  @media only screen and (min-width: 700px) {
    .block {
      margin: 0 auto;
      max-width: 36rem;
    }
  }
</style>
