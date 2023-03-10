<script>
    import { drawerStore } from '@skeletonlabs/skeleton';
</script>

<nav class="list-nav p-4">
    <ul>
        <li><a href="/" on:click={drawerStore.close}>Home</a></li>
        <li><a href="/dashboard" on:click={drawerStore.close}>Dashboard</a></li>
        <li><a href="/profile" on:click={drawerStore.close}>Profile</a></li>
    </ul>
</nav>