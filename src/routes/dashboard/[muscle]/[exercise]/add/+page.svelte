<script>
    import Input from '$lib/components/exercise/Input.svelte';
    import { page } from '$app/stores';
    function convertLtoE(exercise) {
		return exercise.replace(/-/g, ' ');
	}
    $: muscle = $page.params.muscle;
	$: exercise = convertLtoE($page.params.exercise);
</script>

<Input {muscle} {exercise}/>