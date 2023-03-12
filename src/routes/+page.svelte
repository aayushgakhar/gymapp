<script>
	import { page } from '$app/stores';

	const username = $page.data.session ? $page.data.session.user?.user_metadata?.name : 'Guest';
</script>

<div class="">
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
