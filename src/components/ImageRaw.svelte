<script>
    import loadImage from "$utils/loadImage";
  
    const isDev = process.env.NODE_ENV === "development";
    const placeholder = "https://via.placeholder.com/800x300";
  
    const rootpath = isDev ? "/" : "/outliers/"
  
    export let id;
    export let src
    export let alt;
    export let className
    export let width
    export let height
  </script>
  
  
    {#await loadImage(`${rootpath}${src}`)}
      <span class={className} {width} {height} />
    {:then img}
      <img class={className} {width} {height} {id} src={img.src} {alt} />
    {:catch}
      <img class={className} {width} {height} {id} src={placeholder} alt="placeholder" />
    {/await}
  
  