import { writable } from 'svelte/store';

export const lock = writable(false);
export const duration = writable(0);
export const progress = writable(0);
export const seekTime = writable(0);
export const setTime = writable(0);
