<script>
	import { page } from '$app/stores';
	const muscles = ['arms', 'chest', 'legs', 'shoulders', 'back'];
</script>

{#if $page.data.session}
	<h1>Dashboard</h1>
	<div>


		<div class="">Remember to start with a weight 
			that you can comfortably lift and gradually increase 
			the weight as you get stronger. Also, make sure to 
			use proper form to avoid injury.💪</div>
		{#each muscles as muscle}
		<a href="/dashboard/{muscle}">
			<div class="card card-hover p-5 m-4  variant-soft-surface">
		
				<a href="/dashboard/{muscle}" class="card-header">{muscle}</a>
			</div>
		</a>
		{/each}
	</div>
	
{:else}
	<h1>Access Denied</h1>
	<p>
		<a href="/auth/signin"> You must be signed in to view this page </a>
	</p>
{/if}
