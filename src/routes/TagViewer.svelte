<script lang="ts">
  import { current_tag_filter } from "$lib/store";
  import type { ticket_data } from "$lib/supabaseapi";
  import { Tags } from "$lib/tagmanager";
  export let d: ticket_data;
  function set_filter(t: Tags) {
    $current_tag_filter = t;
    console.log($current_tag_filter);
  }
</script>

{#each d.formattted_tags as tag}
  <button
    class="badge variant-filled me-2 mb-2"
    on:click={() => set_filter(tag)}>{Tags[tag]}</button
  >
{/each}
