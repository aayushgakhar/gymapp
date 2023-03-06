<script>
    import { page } from '$app/stores';

    const muscle = $page.params.muscle;
    const exercises = {
        arms:[
            'bicep curls',
            'tricep extensions',
            'hammer curls',
            'dips',
            'pushups'
        ],
        chest:[
            'bench press',
            'incline bench press',
            'decline bench press',
            'dumbbell flys',
            'pushups'
        ],
        legs:[
            'squats',
            'lunges',
            'leg press',
            'leg extensions',
            'leg curls'
        ],
        shoulders:[
            'shoulder press',
            'lateral raises',
            'front raises',
            'rear delt flys',
            'shrugs'
        ],
        back:[
            'deadlifts',
            'pullups',
            'rows',
            'lat pulldowns',
            'bent over rows'
        ]

    }
</script>

<h3>muscle: {muscle}</h3>

{#each exercises[muscle] as exercise}
    <div>
    <a href="/dashboard/{muscle}/{exercise}">{exercise}</a>
    </div>
{/each}