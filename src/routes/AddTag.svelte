<script lang="ts">
  import { update_ticket_tags, type ticket_data } from "$lib/supabaseapi";
  import { get_tags_index, parseTags, Tags } from "$lib/tagmanager";
  import { onMount } from "svelte";

  export var d: ticket_data;
  var select: HTMLSelectElement;
  var hide: boolean = true;
  var valid_tags: Array<Tags> = [];
  function toggle_options() {
    hide = !hide;
  }
  function on_select_change() {
    if (select.value !== "default") {
      const t: string = select.value;
      d.formattted_tags = [...d.formattted_tags, parseTags(t)[0]];
      valid_tags = [...get_valid_tags()];
      update_ticket_tags(d);
    }
    select.value = "";
  }
  function get_valid_tags(): Array<Tags> {
    return get_tags_index().filter((v) => !d.formattted_tags.includes(v));
  }
  onMount(() => {
    valid_tags = [...get_valid_tags()];
  });
</script>

<button
  class="badge variant-filled {!hide ? 'hidden' : ''}"
  on:click={() => toggle_options()}>+</button
>
<select
  class="badge variant-filled w-[100px] {hide ? 'hidden' : ''}"
  value="default"
  on:change={on_select_change}
  bind:this={select}
  on:blur={() => toggle_options()}
>
  <option value="default"></option>
  {#each valid_tags as tag}
    <option value={Tags[tag]}>{Tags[tag]}</option>
  {/each}
</select>
