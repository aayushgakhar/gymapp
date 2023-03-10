<script>
    import {page} from '$app/stores';
	const supabase = $page.data.supabase;
	async function getData() {
		const { data, error } = await supabase.from('profiles').select();
		if (error) throw new Error(error.message);

		return data;
	}
</script>

<div class='container'>
{#if !$page.data.session}
	<h1>Access Denied</h1>
	<p>
		<a href="/auth/signin"> You must be signed in to view this page </a>
	</p>
{:else}
	<h1>Profile</h1>
	<div>Email: {$page.data.session?.user?.email}</div>
	{#await getData()}
<div class="p-4 space-y-4" class:animate-pulse={true}>
	<div class="placeholder animate-pulse" />
	<div class="placeholder animate-pulse" />
	<div class="placeholder animate-pulse" />
	</div>
{:then data}
	
	{#each data as row}
		<li>{row.first_name} {row.last_name}</li>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
	
{/if}
</div>
