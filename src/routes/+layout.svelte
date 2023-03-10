<script>
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Gym app</title>
</svelte:head>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<svelte:fragment slot="trail">
				<section>
					<LightSwitch />
				</section>
				{#if $page.data.session}
					<a class="btn variant-ringed-primary" href="/auth/logout"> Logout </a>
					{#if $page.data.session?.user?.user_metadata?.avatar_url}
						<a href="/profile">
							<Avatar src={$page.data.session?.user?.user_metadata?.avatar_url} />
						</a>
					{/if}
				{:else}
					<a class="btn variant-ringed-primary" href="/auth/login"> Sign In </a>
					<a class="btn variant-filled-primary" href="/auth/register"> Sign Up </a>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="headline">
				<a href="/">GymApp</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/profile">Profile</a></li>
			</ul>
		</nav>
	</svelte:fragment>
	<!-- <svelte:fragment slot='sidebarRight'>Sidebar Right</svelte:fragment> -->
	<!-- <svelte:fragment slot='pageHeader'>Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<div class="container">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot='pageFooter'>Page Footer</svelte:fragment> -->
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>

<style>
</style>
