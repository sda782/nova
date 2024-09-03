<script lang="ts">
	import { page } from "$app/stores";
	const title = "Nova ✨";
	export let data;
	function order_by_id(
		tickets: Array<{
			id: number;
			created_at: string;
			report: string;
			tags: string;
		}>,
	) {
		return tickets.sort((a, b) => a.id - b.id);
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<div class="container mx-auto">
	<h1 class="h1 my-8">{title}</h1>
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
				{#if $page.data.tickets}
					{#each order_by_id($page.data.tickets) as d}
						<tr>
							<td>{d.id}</td>
							<td>{d.created_at.slice(0, 10)}</td>
							<td>{d.report}</td>
							<td>{d.tags}</td>
						</tr>
					{/each}
				{:else}
					<p>No tickets</p>
				{/if}
			</tbody>
		</table>
	</div>
</div>
