<script>
	import { enhance } from '$app/forms';
	// import { supabaseClient } from '$lib/supabase';
	// import type { Provider } from '@supabase/supabase-js';
	import { page } from "$app/stores"
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa} from '@supabase/auth-ui-shared'

	$: viewName = $page.params.viewName;
	console.log(viewName);

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
{#if viewName === 'magic' || viewName === 'forgot' || viewName === 'update'}
<main>
<h1>{viewName}</h1>
	
	
	<Auth 
	{supabaseClient} 
	theme=""
	providers={['github']}
	appearance={{ 
		theme: ThemeSupa,
		className:{
			label: 'textaligncenter'
			},
		
	}}
	view={_view}
	/>
	</main>

{:else if viewName === 'login'}

<main>
	<form action="?/signin" method="POST" class="auth-form">
		<label for=""> Email </label>
		<input type="text" name="email" />
		<label for=""> Password </label>
		<input type="password" name="password" />
		<button type="submit" class="btn btn-primary">Login</button>
	</form>
	<form class="socials" method="POST" use:enhance={submitSocialLogin}>
		<button formaction="?/login&provider=github" class="btn btn-ghost">Github</button>
		<!-- <button formaction="?/login&provider=discord" class="btn btn-ghost">Discord</button>
		<button formaction="?/login&provider=google" class="btn btn-ghost">Google</button> -->
	</form>
	

	
	
</main>
{:else if viewName === 'logout'}

<main>
	<!-- <h1>Logout</h1> -->
	{#if $page.data.session}
		<form action="?/signout" method="POST" class="auth-form">
			<button type="submit" class="btn btn-primary">Logout</button>
		</form>
	{:else}
		<p>You are logged out.</p>
	{/if}
</main>
{:else if viewName === 'register'}
<main>
	<h1>Register</h1>
	<form action="?/register" method="POST" class="auth-form">
		<label for=""> Email </label>
		<input type="text" name="email" />
		<label for=""> Password </label>
		<input type="password" name="password" />
		<button class="btn btn-primary">Register</button>
	</form>
</main>
{/if}

<style>
	
</style>
