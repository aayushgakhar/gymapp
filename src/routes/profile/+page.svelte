<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
  import Avatar from '$lib/Avatar.svelte';
	// import type { ActionData, PageData } from './$types';

	export let data;
	export let form;

	let { session, profile } = data;

	let profileForm;
	let loading = false;
	let fullName = profile?.full_name;
	let username = profile?.username;
	let website = profile?.website;
	let avatarUrl = profile?.avatar_url;
	console.log("🚀 ~ file: +page.svelte:18 ~ avatarUrl:", avatarUrl)

  

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
	const supabase = $page.data.supabase;
	async function getData() {
		const { data, error } = await supabase.from('profiles').select();
		if (error) throw new Error(error.message);

		return data;
	}
</script>
{#if !$page.data.session}
<div class="container">
	
		<h1>Access Denied</h1>
		<p>
			<a href="/auth/signin"> You must be signed in to view this page </a>
		</p>
	
</div>
{/if}
<div class="form-widget">
	<form
		class="max-w-sm"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
			<label class="label" for="email">Email</label>
			<input class="input" id="email" type="text" value={session.user.email} disabled />

			<label class="label" for="fullName">Full Name</label>
			<input class="input" id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />

			<label class="label" for="username">Username</label>
			<input class="input" id="username" name="username" type="text" value={form?.username ?? username} />

			<label class="label" for="website">Website</label>
			<input class="input p-2" id="website" name="website" type="website" value={form?.website ?? website} />

			<button
				type="submit"
				class="btn variant-filled-primary mt-5"
				disabled={loading}
			>{loading ? 'Loading...' : 'Update'}</button>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSubmit}>
		<div>
			<button class="btn variant-ghost-primary mt-5" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>
<div class="form-widget">
  <form
    class="form-widget"
    method="post"
    action="?/update"
    use:enhance={handleSubmit}
    bind:this={profileForm}
  >
    <!-- Add to body -->
    <Avatar
        {supabase}
        bind:url={avatarUrl}
        size={10}
        on:upload={() => {
          profileForm.requestSubmit();
        }}
      />

    <!-- Other form elements -->
  </form>
</div>
