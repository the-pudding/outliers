import {writable, readable} from "svelte/store"
import copy from "$data/doc.json";

// sequential key list order
export const initialKeySet = readable(copy.slides2.map(d => `${d.field}-${d.id}`))
export const activeKeySet = writable([])
// active key in list
export const activeKey = writable()
// direction
export const activeDirection = writable()
// step event
export const activeStep = writable({
    direction: null,
    state: null
})
// scroll progress of active step
export const activeProgress = writable(0)