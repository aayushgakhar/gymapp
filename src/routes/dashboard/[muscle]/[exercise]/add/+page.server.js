import { fail, redirect } from '@sveltejs/kit';
import { assert } from 'console';
// import type { Actions, PageServerLoad } from './$types';



export const actions = {
    update: async({ url, request, locals: { supabase, getSession } }) => {

        const formData = await request.formData();
        console.log(formData);
        ``
        const reps = formData.get('reps');
        const sets = formData.get('sets');
        const weight = formData.get('weight');

        const note = formData.get('notes');

        console.log(reps, sets, weight, note);
        const session = await getSession();
        assert(session);

        let exercise = url.pathname.split('/')[3];
        let muscle = url.pathname.split('/')[2];
        const { error } = await supabase.from('logs').upsert({

            uuid: session.user.id,
            reps: reps,
            sets: sets,
            weight: weight,
            note: note,
            muscle: muscle,
            exercise: exercise,
        });




        if (error) {
            return fail(500, {
                weight
            });
        }
        redirect(303, "/dashboard");
        return {
            weight,
            reps,
            sets,
            note,
            muscle,
            exercise
        };
    },
};