<script lang="ts">
  import { current_tag_filter } from "$lib/store";
  import type { ticket_data } from "$lib/supabaseapi";
  import { countTags, get_tag_index, Tags } from "$lib/tagmanager";

  var data: any;
  export var view_tickets: Array<ticket_data>;
  $: {
    if (view_tickets) {
      data = [...countTags(view_tickets)];
    }
  }
</script>

<div class="flex-wrap flex gap-2 float-end">
  {#if data}
    {#each data as d}
      <button
        class="badge variant-filled"
        on:click={() => {
          console.log(get_tag_index(d.tag));
          $current_tag_filter = get_tag_index(d.tag);
        }}>{d.tag}: {d.count}</button
      >
    {/each}
  {/if}
</div>
