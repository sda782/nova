<script lang="ts">
  import { page } from "$app/stores";
  import { current_tag_filter } from "$lib/store";
  import { Tags } from "$lib/tagmanager";
  import type { ticket_data } from "../lib/supabaseapi";
  import AddTag from "./AddTag.svelte";
  import TagViewer from "./TagViewer.svelte";
  const title = "Nova ✨";
  export let data;
  let view_tickets: Array<ticket_data> = [];
  function order_by_id(tickets: Array<ticket_data>) {
    return tickets.sort((a, b) => a.id - b.id);
  }
  function update(tickets: Array<ticket_data>, tag_filter: Tags | null) {
    view_tickets = [...order_by_id(tickets)];
    if (tag_filter !== null) {
      const t: Tags = tag_filter;
      view_tickets = [
        ...view_tickets.filter((d: ticket_data) =>
          d.formattted_tags.includes(t),
        ),
      ];
    }
  }

  $: update($page.data.tickets, $current_tag_filter);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="container mx-auto">
  <h1 class="h1 my-8">{title}</h1>
  <button
    class="btn variant-filled mb-4"
    on:click={() => ($current_tag_filter = null)}>reset filter</button
  >
  <div class="table-container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Created</th>
          <th>Report</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {#if view_tickets}
          {#each order_by_id(view_tickets) as d}
            <tr>
              <td>{d.id}</td>
              <td
                ><span class="badge variant-filled"
                  >{d.created_at.slice(0, 10)}</span
                ></td
              >
              <td>{d.report}</td>
              <td>
                {#if d.formattted_tags}
                  <TagViewer bind:d />
                {/if}
                <AddTag bind:d />
              </td>
            </tr>
          {/each}
        {:else}
          <p>No tickets</p>
        {/if}
      </tbody>
    </table>
  </div>
</div>
