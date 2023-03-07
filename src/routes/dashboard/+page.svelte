<script>
    import { page } from "$app/stores"
    const muscles = [
        'arms',
        'chest',
        'legs',
        'shoulders',
        'back'
    ];
</script>


{#if $page.data.session}
<h1>dashboard</h1>
<p>
  {#each muscles as muscle}
    <div>
    <a href="/dashboard/{muscle}">{muscle}</a>
    </div>
{/each}
</p>
<p>Session expiry: {$page.data.session?.expires}</p>
{:else}
<h1>Access Denied</h1>
<p>
  <a href="/auth/signin">
    You must be signed in to view this page
  </a>
</p>
{/if}


