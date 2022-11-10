<script>
    import { onMount } from "svelte";

    let innerHeight;
    let innerWidth;
    let body;
    let html;
    let height;
    let numStains;
    let numStainsArray;
    let stains;
    let stainImgs = ["assets/img/stain1.png", "assets/img/stain1.png", "assets/img/stain1.png", "assets/img/stain1.png"];

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    onMount(() => {
        body = document.body;
        html = document.documentElement;
        height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        numStains = Math.round(height / 5000);
        numStainsArray = [...Array(numStains).keys()]

        stains = numStainsArray.map((d, i) => ({
            ...d,
            randomW: getRandomInt(innerWidth-200),
            randomH: getRandomInt(height-200),
            img: stainImgs[getRandomInt(stainImgs.length)]
        }))
        console.log(stains)
    });
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div id="stains" style="height: {height}px">
    {#if stains != undefined}
        {#each stains as stain, i}
            <div style="top: {stain.randomH}px; left: {stain.randomW}px; transform: rotate({getRandomInt(360)}deg); background-image: url('{stain.img}'), url('/assets/img/bg_texture.png')"></div>
        {/each}
    {/if}
</div>

<style>
    #stains {
        z-index: 1;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    #stains div {
        width: 200px;
        height: 200px;
        position: absolute;
        background-size: contain;
        background-blend-mode: darken;
        background-color: var(--color-db-bg-tan);
        background-repeat: no-repeat;
        opacity: 0.35;
    }
</style>