import { writable, type Writable } from "svelte/store";
import type { Tags } from "./tagmanager";

export const current_tag_filter: Writable<Tags | null> = writable(null)