<script>
    import Input from './Input.svelte';
    
    import { page } from '$app/stores';
    function convertLtoE(exercise) {
		return exercise.replace(/-/g, ' ');
	}
    export let data;
    // console.log(data);
    $: muscle = $page.params.muscle;
	$: exercise = convertLtoE($page.params.exercise);
</script>

<Input {muscle} {exercise}/>