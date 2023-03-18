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
    update: async({ url, request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const timestp = formData.get('time');

        const session = await getSession();
        assert(session);
        const { error } = await supabase
            .from('logs')
            .delete()
            .eq('uuid', session.user.id)
            .eq('created_at', timestp);

        if (error) {
            return fail(500, error.message);
        }
    }

};