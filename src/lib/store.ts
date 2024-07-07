import { writable } from "svelte/store";
import { getInitialState, getNextPopulation } from "./utils";
import { LifetimeValues } from "./constants";

export const play = writable(false);

export const store = writable({
  // play: false,
  renderer: "html",
  lifetime: +Object.keys(LifetimeValues).reverse()[0],
  width: 1,
  height: 1,
  size: 30,
  preset: "",
  population: getInitialState([], 1, 1),
});

export function updateNextPopulation() {
  store.update(store => ({
    ...store,
    population: getNextPopulation(store.population)
  }));
}