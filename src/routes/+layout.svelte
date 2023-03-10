<script>
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar, Avatar, LightSwitch, Toast, Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navigation from '../lib/Navigation.svelte';
	import Icon from '@iconify/svelte';

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

<Drawer>
	<Navigation />
</Drawer>
<Toast />

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 md:w-56">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="md:hidden btn btn-sm mr-4" on:click={()=>drawerStore.open({})}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					
					<strong class="text-xl uppercase">
						
						<a href="/"> 
							<Icon class='text-4xl inline-block' icon='healthicons:gym'/>
							<span class='hidden md:inline-block'>GymApp</span>
						</a>
					</strong>
				</div>
				
			</svelte:fragment>
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
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation/>
	</svelte:fragment>
	<!-- <svelte:fragment slot='sidebarRight'>Sidebar Right</svelte:fragment> -->
	<!-- <svelte:fragment slot='pageHeader'>Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<div class="container m-10">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot='pageFooter'>Page Footer</svelte:fragment> -->
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>

<style>
</style>
