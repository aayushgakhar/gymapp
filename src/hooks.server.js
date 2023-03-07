import {SvelteKitAuth} from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

async function authorization({ event, resolve }) {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/dashboard')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth/signin');
		}
	}

	// If the request is still here, just proceed as normally
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => html
	});
	return result;
}

export const handle = sequence(
  SvelteKitAuth({
	  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
  }),
  authorization
);