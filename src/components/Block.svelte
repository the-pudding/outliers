<script>
  export let id;
  export let type;
  export let className
</script>

<div {id} class={`block ${type} ${className} w-full max-w-xl mb-4 mx-auto`}>
  <slot />
</div>
