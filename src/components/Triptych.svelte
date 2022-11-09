<script>
  import Block from "$components/Block.svelte";
  import ImageRaw from "$components/ImageRaw.svelte";
  import inView from "$actions/inView.js";
  import { onMount } from "svelte";
  import { selectAll, easeLinear } from "d3";

  let visiblePhoto = false;
  let photos;

  function showPhotos() {
    console.log(photos);
      photos
        .transition()
        .delay((d, i) => i * 250)
        .duration(500)
        .ease(easeLinear)
        .style("opacity", 1)
  }

  onMount(() => {
    photos = selectAll(".trip-wrapper .border-2")
  });
  
  export let text
</script>

  <div class="trip-wrapper"
    use:inView
    on:enter={() => showPhotos()}>
    <div class="w-full relative z-0 max-w-5xl mx-auto my-0 flex flex-col justify-between">
      <div class="border-2 border-black" id="madera-triptych">
        <ImageRaw src="assets/img/madera.jpg" />
      </div>
      <div class="border-2 border-black" id="gardena1-triptych">
        <ImageRaw src="assets/img/gardena.jpg" />
      </div>
      <div class="border-2 border-black" id="gardena2-triptych">
        <ImageRaw src="assets/img/gardena2.jpg" />
      </div>
    </div>
    <Block>
      <p class="text-label mt-2">{@html text ?? ""}</p>
    </Block>
  </div>

  <style>
    .trip-wrapper {
      height: calc(100vw*1.25);
      padding: 1rem 1rem 0rem 1rem;
      max-width: 60rem;
      max-height: 60rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }

    .trip-wrapper .border-2 {
      opacity: 0;
    }

    .relative {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .text-label {
      font-family: var(--dubois);
      text-transform: uppercase;
      color: var(--color-off-white);
      font-size: 14px;
      margin-bottom: 4rem;
    }

    .border-2 {
      position: absolute;
    }

    #madera-triptych {
      top: 0;
      left: 0;
    }

    #gardena1-triptych {
      top: 25%;
      right: 0;
    }

    #gardena2-triptych {
      bottom: 0;
      left: 0;
    }

    #madera-triptych, #gardena1-triptych, #gardena2-triptych {
      width: 65%;
    }

    @media only screen and (min-width: 700px) {
      .trip-wrapper {
        height: calc(100vw*1.25);
        padding: 2rem 2rem 0rem 2rem;
      }

      #madera-triptych, #gardena1-triptych, #gardena2-triptych {
        width: 65%;
      }

      #gardena2-triptych {
        left: 2%;
      }
    }

    @media only screen and (min-width: 900px) {
      .trip-wrapper {
        height: calc(100vw*1.25);
      }

      #madera-triptych, #gardena1-triptych, #gardena2-triptych {
        width: 55%;
      }

      #gardena2-triptych {
        left: 2%;
      }
    }
  </style>