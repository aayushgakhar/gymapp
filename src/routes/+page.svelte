<script>
    import { page } from "$app/stores"

    const username = $page.data.session? $page.data.session.user?.name: 'Guest';
    console.log($page.data.session);
</script>

<div>
{#if $page.data.session}
<h3>Hello {username }</h3>
<a href="/dashboard">Dashboard</a>
{:else}
<a href="/auth/signin">Sign in</a>
{/if}
</div>

