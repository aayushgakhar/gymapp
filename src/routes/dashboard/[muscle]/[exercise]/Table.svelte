<script>
	import { } from '@skeletonlabs/skeleton';
    
    export let data;
	let logForm;
    // console.log(data);
</script>


<!-- Responsive Container (recommended) -->
<div class="table-container p-5">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Date</th>
				<th>Sets</th>
				<th>Reps</th>
				<th>Weight</th>
				<th>Note</th>
				<th>Remove</th>

			</tr>
		</thead>
		<tbody>
			{#each data as row}
				<tr>
					<td>{(row.created_at.slice(0,10))}</td>
					<td>{row.sets}</td>
					<td>{row.reps}</td>
					<td>{row.weight}</td>
					<td>{row.note}</td>
					<td> 
						<form
							class="max-w-sm"
							method="post"
							action="?/update"
							bind:this={logForm}
						>
						<button type="submit" value="{row.created_at}" name="time">
							<h3>
						<i class="bi bi-x-circle-fill " name="uuid" value={row.uuid}></i> 
					</h3>
						</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
		
	</table>
</div>
