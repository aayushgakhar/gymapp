<script>
	import { page } from '$app/stores';
	// import supabase from '$lib/supabase'
	const supabase = $page.data.supabase;
	async function getData() {
		const { data, error } = await supabase.from('logs').select();
		if (error) throw new Error(error.message);

		return data;
	}

	const username = $page.data.session ? $page.data.session.user?.user_metadata?.name : 'Guest';
</script>

<div>
	{#if $page.data.session}
		<h3>Hello {username}</h3>
		<a href="/dashboard">Dashboard</a>
	{:else}
		<p>
			Please
			<a href="/auth/register">sign up</a> or
			<a href="/auth/login">login</a>
		</p>
	{/if}
</div>

<!-- <h1>My favorite games</h1> -->
{#await getData()}
	<p>Fetching data...</p>
{:then data}
	{#each data as row}
		<li>{row.name}</li>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
