// import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
  signin: async ({ request, locals: { supabase } }) => {
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
					error: 'Invalid credentials.',
					values: {
						email
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

    throw redirect(303, '/dashboard');
	},

	signInWithGitHub: async({locals: { supabase }}) => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
		})
		// console.log(data)
		// if (error) {
		// 	console.log(error)
		// 	if (error instanceof AuthApiError && error.status === 400) {
		// 		return invalid(400, {
		// 			error: 'Invalid credentials.',
		// 		});
		// 	}
		// 	return invalid(500, {
		// 		error: 'Server error. Try again later.',
		// 	});
		// }

		// throw redirect(303, '/dashboard');
	},
};
