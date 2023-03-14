<script>
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import {
		AppShell,
		AppBar,
		Avatar,
		LightSwitch,
		Toast,
		Drawer,
		drawerStore
	} from '@skeletonlabs/skeleton';
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
	<LightSwitch class='ml-8'/>
</Drawer>
<Toast />

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 md:w-56">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4 md:hidden" on:click={() => drawerStore.open({})}>
						<span>
							<svg viewBox="0 0 100 80" class="h-4 w-4 fill-token">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>

					<strong class="text-xl uppercase">
						<a href="/">
							<Icon class="inline-block text-4xl" icon="healthicons:gym" />
							<span class="hidden md:inline-block">GymApp</span>
						</a>
					</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<section class="hidden md:inline-block">
					<LightSwitch />
				</section>
				{#if $page.data.session}
					<a class="btn variant-ringed-primary" href="/auth/logout"> Logout </a>

					<a href="/profile">
						{#if $page.data.session?.user?.user_metadata?.avatar_url}
							<Avatar src={$page.data.session?.user?.user_metadata?.avatar_url} width="w-10" />
						{:else}
							<Avatar initials={$page.data.session?.user?.user_metadata?.name} width="w-10" />
						{/if}
					</a>
				{:else}
					<a class="btn variant-ringed-primary" href="/auth/login"> Sign In </a>
					<a class="btn variant-filled-primary" href="/auth/register"> Sign Up </a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- <svelte:fragment slot='sidebarRight'>Sidebar Right</svelte:fragment> -->
	<!-- <svelte:fragment slot='pageHeader'>Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<div class="container p-5 md:p-10">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot='pageFooter'>Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">© gakhar, 2023</svelte:fragment> -->
</AppShell>

<style>
</style>
