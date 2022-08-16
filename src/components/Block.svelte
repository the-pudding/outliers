<script>
  export let id;
  export let type;
</script>

<div {id} class={`block ${type} w-full max-w-xl mb-4 mx-auto`}>
  <slot />
</div>
