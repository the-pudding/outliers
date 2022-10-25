<script>
  import Block from "$components/Block.svelte";
  import ImageRaw from "$components/ImageRaw.svelte";
  
  export let text
</script>

  <div class="trip-wrapper">
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
      height: calc(100vw*0.65);
      padding: 2rem 2rem 0rem 2rem;
      max-width: 60rem;
      max-height: 60rem;
      min-height: 50rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
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
      top: 25%;
      left: 20%;
    }

    #gardena1-triptych {
      top: 30%;
      right: 0;
    }

    #gardena2-triptych {
      bottom: 0;
      left: 15%;
    }

    #madera-triptych, #gardena1-triptych, #gardena2-triptych {
      width: 45%
    }

    @media only screen and (min-width: 1000px) {
      #madera-triptych, #gardena1-triptych, #gardena2-triptych {
        width: 50%
      }

      #madera-triptych {
        left: 10%;
        top: 10%
      }

      #gardena2-triptych {
        bottom: 5%;
        left: 5%;
      }
    }

    @media only screen and (min-width: 1300px) {
      #madera-triptych, #gardena1-triptych, #gardena2-triptych {
        width: 55%
      }

      #madera-triptych {
        left: 10%;
        top: 10%
      }

      #gardena2-triptych {
        bottom: 5%;
        left: 0;
      }
    }
  </style>
