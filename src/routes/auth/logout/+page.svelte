<script>
	import { page } from "$app/stores"
</script>

<main>
	<!-- <h1>Logout</h1> -->
	{#if $page.data.session}
	<form action="?/signout" method="POST" class="auth-form">
		<button type="submit" class="btn btn-primary">Logout</button>
	</form>
	{:else}
	<p>You are logged out.</p>
	{/if}
</main>
