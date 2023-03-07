<script>
    import { page } from '$app/stores';

    $: muscle = $page.params.muscle;
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

    function validateMuscle(muscle){
        if(exercises.hasOwnProperty(muscle)){
            return true;
        }else{
            return false;
        }
    }

    function convertEtoL(exercise){
        return exercise.replace(/ /g, '-');
    }
    
</script>

{#if validateMuscle(muscle)}
    <h3>muscle: {muscle}</h3>

    {#each exercises[muscle] as exercise}
        <div>
        <a href="/dashboard/{muscle}/{convertEtoL(exercise)}">{exercise}</a>
        </div>
    {/each}
{:else}
        <h1>No muscle named {muscle}</h1>
        <h3>Try these:</h3>
        {#each Object.entries(exercises) as [muscle, exercises]}
        <div>
        <a  href="/dashboard/{muscle}">{muscle}</a>
        </div>
    {/each}
{/if}