<script>
	import { } from '@skeletonlabs/skeleton';
    
    export let data;
    // console.log(data);
</script>


<!-- Responsive Container (recommended) -->
<div class="table-container p-5">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Position</th>
				<th>Name</th>
				<th>Symbol</th>
				<th>Weight</th>
			</tr>
		</thead>
		<tbody>
			{#each data as row}
				<tr>
					<td>{row.id}</td>
					<td>{row.exercise}</td>
					<td>{row.rep}</td>
					<td>{row.sets}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="3">Calculated Total Weight</th>
				<td></td>
			</tr>
		</tfoot>
	</table>
</div>
