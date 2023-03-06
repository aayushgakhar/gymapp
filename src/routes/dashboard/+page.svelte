<script>
    const muscles = [
        'arms',
        'chest',
        'legs',
        'shoulders',
        'back'
    ];
</script>

<h3>dashboard</h3>

{#each muscles as muscle}
    <div>
    <a href="/dashboard/{muscle}">{muscle}</a>
    </div>
{/each}
