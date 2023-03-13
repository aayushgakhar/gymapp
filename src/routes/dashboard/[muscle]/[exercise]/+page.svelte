<script>
	import { page } from '$app/stores';
	
	function convertLtoE(exercise) {
		return exercise.replace(/-/g, ' ');
	}

	$: muscle = $page.params.muscle;
	$: exercise = convertLtoE($page.params.exercise);
	const exercises = {
		arms: ['bicep curls', 'tricep extensions', 'hammer curls', 'dips', 'pushups'],
		chest: [
			'bench press',
			'incline bench press',
			'decline bench press',
			'dumbbell flys',
			'pushups'
		],
		legs: ['squats', 'lunges', 'leg press', 'leg extensions', 'leg curls'],
		shoulders: ['shoulder press', 'lateral raises', 'front raises', 'rear delt flys', 'shrugs'],
		back: ['deadlifts', 'pullups', 'rows', 'lat pulldowns', 'bent over rows']
	};

	function validateMuscle(muscle) {
		if (exercises.hasOwnProperty(muscle)) {
			return true;
		} else {
			return false;
		}
	}

	function validateExercise(exercise) {
		if (exercises[muscle].includes(exercise)) {
			return true;
		} else {
			return false;
		}
	}

</script>



{#if validateMuscle(muscle)}
	<h1>{muscle[0].toUpperCase() + muscle.substr(1)}</h1> 
	

	{#if validateExercise(exercise)}
	<div class="grid grid-cols-4 gap-2 pt-2">
		<div class="text-4xl col-span-3">{exercise[0].toUpperCase() + exercise.substr(1)}</div>
		<a href="/dashboard/{muscle}/{$page.params.exercise}/add">
		<button type="button" class="btn-icon variant-filled" ><i class="bi bi-plus-lg"></i></button></a>
	</div>
	{:else}
		<h3>No exercise named {exercise[0].toUpperCase() + exercise.substr(1)}</h3>
		<h3>Try these:</h3>
		{#each exercises[muscle] as exercise}
			<div>
				<a href="/dashboard/{muscle}/{exercise}">{exercise}</a>
			</div>
		{/each}
	{/if}
{:else}
	<h3>No muscle named {muscle}</h3>
	{#each exercises.keys() as muscle}
		<div>
			<a href="/dashboard/{muscle}">{muscle}</a>
		</div>
	{/each}
{/if}


