// src/routes/+layout.ts
import { invalidate } from '$app/navigation';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
// import type { LayoutLoad } from './$types';
// import type { Database } from '../DatabaseDefinitions';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session,
		onAuthStateChange() {
			invalidate('supabase:auth');
		}
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
