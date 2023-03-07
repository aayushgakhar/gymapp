// import {SvelteKitAuth} from '@auth/sveltekit';
// import GitHub from '@auth/core/providers/github';
// import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
// import { redirect } from '@sveltejs/kit';
// import { sequence } from '@sveltejs/kit/hooks';

// async function authorization({ event, resolve }) {
// 	// Protect any routes under /authenticated
// 	if (event.url.pathname.startsWith('/dashboard')) {
// 		const session = await event.locals.getSession();
// 		if (!session) {
// 			throw redirect(303, '/auth/signin');
// 		}
// 	}

// 	// If the request is still here, just proceed as normally
// 	const result = await resolve(event, {
// 		transformPageChunk: ({ html }) => html
// 	});
// 	return result;
// }

// export const handle = sequence(
//   SvelteKitAuth({
// 	  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
//   }),
//   authorization
// );
// src/hooks.server.ts

// import '$lib/supabase';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
} from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
// import type { Handle } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event
  });

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  return resolve(event, {
    /**
     * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
     *
     * https://github.com/sveltejs/kit/issues/8061
     */
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    }
  });
};