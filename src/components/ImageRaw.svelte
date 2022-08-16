<script>
    import loadImage from "$utils/loadImage";
  
    const isDev = process.env.NODE_ENV === "development";
    const placeholder = "https://via.placeholder.com/800x300";
  
    const rootpath = isDev ? "/" : "/tbd/"
  
    export let id;
    export let src
    export let alt;
  </script>
  
  <div>
    {#await loadImage(`${rootpath}${src}`)}
      <span />
    {:then img}
      <img {id} src={img.src} {alt} />
    {:catch}
      <img {id} src={placeholder} alt="placeholder" />
    {/await}
  </div>
  