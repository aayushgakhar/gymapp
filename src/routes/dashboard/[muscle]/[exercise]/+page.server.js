import { fail, redirect } from '@sveltejs/kit';
import { assert } from 'console';

// import type { Actions, PageServerLoad } from './$types';

export const load = async({ url, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
        throw redirect(303, '/');
    }
    let exercise = url.pathname.split('/')[3];
    // console.log(exercise);
    const { data: logs } = await supabase
        .from('logs')
        .select(`weight , reps , sets , note , muscle , exercise , uuid, created_at , id`)
        .eq('uuid', session.user.id)
        .eq('exercise', exercise)

    return { session, logs };
};

export const actions = {
    update: async({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const fullName = formData.get('fullName');
        const username = formData.get('username');
        const website = formData.get('website');
        const avatarUrl = formData.get('avatarUrl');
        const newPass = formData.get('password');

        const session = await getSession();
        assert(session);
        const { error } = await supabase.from('profiles').upsert({

            id: session.user.id,
            full_name: fullName,
            username,
            website,
            avatar_url: avatarUrl,
            updated_at: new Date()
        });
        console.log(newPass);

        if (newPass) {
            await supabase.auth.updateUser({
                password: newPass
            });
        }

        if (error) {
            return fail(500, {
                fullName,
                username,
                website,
                avatarUrl
            });
        }

        return {
            fullName,
            username,
            website,
            avatarUrl
        };
    },
    signout: async({ locals: { supabase, getSession } }) => {
        const session = await getSession();
        if (session) {
            await supabase.auth.signOut();
            throw redirect(303, '/');
        }
    }
};