<script>
    import {page} from '$app/stores';
</script>

<div class='container'>
{#if $page.data.session}
	<h1>Profile</h1>
{:else}
	<h1>Access Denied</h1>
	<p>
		<a href="/auth/signin"> You must be signed in to view this page </a>
	</p>
{/if}
</div>
