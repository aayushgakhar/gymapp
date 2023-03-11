// import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const load = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// if the user is already logged in return them to the account page
	if (session) {
		throw redirect(303, '/account');
	}

	return { url: url.origin };
};

export const actions = {
	signin: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			throw redirect(303, '/');
		}
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');
		

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		

		if (error) {
			
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: error.message,
					values: {
						email,
						
					}
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			});
		}

		throw redirect(303, '/');
	},

	signInWithGitHub: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			throw redirect(303, '/');
		}
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
		});
		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.'
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}
		throw redirect(303, '/');
	},
	register: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			throw redirect(303, '/');
		}
		const body = Object.fromEntries(await request.formData());

		const { error: err } = await supabase.auth.signUp({
			email: body.email,
			password: body.password,
			options: {
				data: {
					full_name: body.name
				}
			}
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later.'
			});
		}

		throw redirect(303, '/auth/verify');
	},
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}
};
