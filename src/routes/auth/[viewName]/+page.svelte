<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	$: viewName = $page.params.viewName;

	let views = {
		login: { id: 'sign_in', title: 'Sign In' },
		register: { id: 'sign_up', title: 'Sign Up' },
		magic: { id: 'magic_link', title: 'Magic Link' },
		forgot: { id: 'forgotten_password', title: 'Forgotten Password' },
		update: { id: 'update_password', title: 'Update Password' },
		logout: { id: 'sign_out', title: 'Sign Out' }
	};

	$: _view = views[viewName].id;

	const supabaseClient = $page.data.supabase;
	const signInWithProvider = async (provider) => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: provider
		});
	};
	const submitSocialLogin = async ({ action, cancel }) => {
		switch (action.searchParams.get('provider')) {
			case 'google':
				await signInWithProvider('google');
				break;
			case 'discord':
				await signInWithProvider('discord');
				break;
			case 'github':
				await signInWithProvider('github');
				break;
			default:
				break;
		}
		cancel();
	};
</script>

<main class="p-10 h-full">
	{#if viewName === 'login'}
		{#if $page.data.session}
			<p>You are logged in.</p>
			<a href="/dashboard">Dashboard</a>
		{:else}
			<h3>Login</h3>
			<form action="?/signin" method="POST">
				<label class="label" for=""> Email </label>
				<input class="input" type="text" name="email" />
				<label class="label" for="password"> Password </label>
				<input class="input" type="password" name="password" />
				<button type="submit" class="btn variant-filled-secondary mt-5">Login</button>
			</form>
			<form class="socials" method="POST" use:enhance={submitSocialLogin}>
				<button formaction="?/login&provider=github" class="btn variant-ghost-primary m-10"
					>Login with Github</button
				>
				<!-- <button formaction='?/login&provider=discord' class='btn btn-ghost'>Discord</button>
		<button formaction='?/login&provider=google' class='btn btn-ghost'>Google</button> -->
			</form>
		{/if}
	{:else if viewName === 'logout'}
		<!-- <h1>Logout</h1> -->
		{#if $page.data.session}
			<form class="h-full" action="?/signout" method="POST">
				<label class="label" for="submit">Are you sure?</label>
				<a class="btn variant-ringed-primary mt-5" href="/">Cancel</a>
        <button type="submit" class="btn variant-filled mt-20 mt-1">Logout</button>
			</form>
		{:else}
			<p>You are logged out.</p>
			<a class="btn variant-filled" href="/">Home</a>
		{/if}
	{:else if viewName === 'register'}
		{#if $page.data.session}
			<p>You are logged in.</p>
			<a href="/dashboard">Dashboard</a>
		{:else}
			<h3>Register</h3>
			<form action="?/register" method="POST">
				<label class="label" for=""> Email </label>
				<input class="input" type="text" name="email" />
				<label class="label" for=""> Password </label>
				<input class="input" type="password" name="password" />
				<button class="btn variant-filled-primary m-10">Register</button>
			</form>
		{/if}
	{:else if viewName === 'magic' || viewName === 'forgot' || viewName === 'update'}
		<h1>{viewName}</h1>
		<Auth
			{supabaseClient}
			theme=""
			providers={['github']}
			appearance={{
				theme: ThemeSupa,
				className: {
					label: 'textaligncenter'
				}
			}}
			view={_view}
		/>
	{/if}
</main>

<style>
</style>
