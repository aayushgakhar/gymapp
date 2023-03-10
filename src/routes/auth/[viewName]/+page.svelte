<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	$: viewName = $page.params.viewName;

	let views = {
		login: {
			id: 'sign_in',
			title: 'Sign In'
		},
		register: {
			id: 'sign_up',
			title: 'Sign Up'
		},
		magic: {
			id: 'magic_link',
			title: 'Magic Link'
		},
		forgot: {
			id: 'forgotten_password',
			title: 'Forgotten Password'
		},
		update: {
			id: 'update_password',
			title: 'Update Password'
		},
		logout: {
			id: 'sign_out',
			title: 'Sign Out'
		},
		verify: {
			id: 'verify',
			title: 'Verify your email'
		}
	};

	$: _view = views[viewName].id;

	let borderRadius = '30px';

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

	export let form;
	export let data;
</script>

<main class=" h-full">
	{#if viewName === 'login'}
		{#if $page.data.session}
			<p>You are logged in.</p>
			<a href="/dashboard">Dashboard</a>
		{:else}
			<h3>Login</h3>
			<form class="py-5 max-w-sm" action="?/signin" method="POST">
				{#if form?.success}
					<p>Success</p>
				{:else if form?.error}
					<aside class="m-5 alert variant-ghost-primary">
						<div><Icon icon="ic:round-warning" /></div>
						<div class="alert-message">
							<h3>{form.error}</h3>
							{#if form?.error === 'Email not confirmed'}
								<div>Check your email for a link to verify your email address or signup.</div>
								<a class="btn variant-filled-primary" href="/auth/register">Sign up</a>
							{:else if form?.error === 'Invalid login credentials'}
								<a class="btn variant-ghost-primary" href="/auth/forgot">Forgot password?</a>
								<a class="btn variant-filled-primary" href="/auth/magic">Send a link to login</a>
							{/if}
						</div>
					</aside>
				{/if}
				<label class="label" for="email"> Email </label>
				<input class="input" type="text" name="email" placeholder="Your email here" />
				<label class="label" for="password"> Password </label>
				<input class="input" type="password" name="password" placeholder="Your password here" />
				<button type="submit" class="btn variant-filled-primary mt-5">Login</button>
				<a class="btn variant-ghost-primary ml-2" href="/auth/forgot">Forgot password?</a>
			</form>
			<form class="socials" method="POST" use:enhance={submitSocialLogin}>
				<button formaction="?/login&provider=google" class="btn variant-ghost-secondary">
					<Icon icon="logos:google-icon" class="mr-2" />
					Login with Google
				</button>
				<button formaction="?/login&provider=github" class="btn variant-ghost-tertiary mt-5">
					<Icon icon="bi:github" class="mr-2" />
					Login with Github
				</button>
				<!-- <button formaction='?/login&provider=discord' class='btn btn-ghost'>Discord</button> -->
			</form>
		{/if}
	{:else if viewName === 'logout'}
		<!-- <h1>Logout</h1> -->
		{#if $page.data.session}
			<form class="h-full" action="?/signout" method="POST">
				<label class="label" for="submit">Are you sure?</label>
				<a class="btn variant-ringed-primary mt-5" href="/">Cancel</a>
				<button type="submit" class="btn variant-filled mt-5">Logout</button>
			</form>
		{:else}
			<p>You are logged out.</p>
			<a class="btn variant-filled mt-5" href="/">Home</a>
		{/if}
	{:else if viewName === 'register'}
		{#if $page.data.session}
			<p>You are already logged in.</p>
			<a href="/dashboard">Dashboard</a>
		{:else}
			<h3>Register</h3>
			<form class="mt-5" action="?/register" method="POST">
				<label class="label" for="name">Name</label>
				<input class="input" type="text" name="name" placeholder="Your Name here" />
				<label class="label" for="email"> Email </label>
				<input class="input" type="text" name="email" placeholder="Your email here" />
				<label class="label" for="password"> Password </label>
				<input class="input" type="password" name="password" placeholder="Your password here" />
				<button class="btn variant-filled-primary mt-5">Register</button>
			</form>
			<form class="socials" method="POST" use:enhance={submitSocialLogin}>
				<button formaction="?/login&provider=google" class="btn variant-ghost-secondary">
					<Icon icon="logos:google-icon" class="mr-2" />
					Login with Google
				</button>
				<button formaction="?/login&provider=github" class="btn variant-ghost-tertiary mt-5 ml-2">
					<Icon icon="bi:github" class="mr-2" />
					Login with Github
				</button>
				<!-- <button formaction='?/login&provider=discord' class='btn btn-ghost'>Discord</button> -->
			</form>
		{/if}
	{:else if viewName === 'verify'}
		<h2>Verify your email address</h2>
		<p>
			Check your email for a link to verify your email address. If confirmed then <a
				href="/auth/login">login</a
			>.
		</p>
	{:else if viewName === 'magic' || viewName === 'forgot' || viewName === 'update'}
		<h1>{views[viewName].title}</h1>

		<Auth
			{supabaseClient}
			theme="dark"
			providers={['github', 'google']}
			appearance={{
				theme: ThemeSupa,
				variables: {
					default: {
						colors: {
							brand: 'firebrick',
							brandAccent: 'red'
						},
						radii: {
							borderRadiusButton: borderRadius,
							buttonBorderRadius: borderRadius,
							inputBorderRadius: borderRadius
						}
					}
				}
			}}
			view={_view}
			showLinks={false}
			redirectTo={`${data.url}/logging-in?redirect=/`}
		/>
	{/if}
</main>

<style>
</style>
