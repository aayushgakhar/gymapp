<script>
	import { drawerStore,RangeSlider } from '@skeletonlabs/skeleton';
	export let exercise ;
	
	let logForm;
	let wt_value = 2.5;
	let max = 40;

</script>

<h2>Exercise: {exercise[0].toUpperCase() + exercise.substr(1)}</h2>
<form
		class="max-w-sm"
		method="post"
		action="?/update"
		bind:this={logForm}
	>
<div class="input-group input-group-divider grid-cols-[auto_auto_auto_auto] max-w-md mt-4">
	<div class="input-group-shim"> SETS </div>
	
	<select class="select" size="3" value="" name='sets'>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
	</select>
	<div class="input-group-shim">REPS</div>
	<select class="select" size="3" value="" name="reps">
		<option value="1">6</option>
		<option value="2">8</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
	</select>
	
</div>


<RangeSlider bind:value={wt_value} max={max} step={2.5} class=" max-w-4xl pt-5" ticked name="weight">
	<div class="flex justify-between items-center">
		<div class="font-bold">Weight in KG</div>
		<div class="text-xs">{wt_value} / {max}</div>
	</div>
</RangeSlider>

<label class="label p-2 ">
	<span>Textarea</span>
	<textarea class="textarea" rows="4" name="notes" placeholder="Write here........  🫦" />
</label>
<div class="grid">
<button type="submit" class="btn variant-filled m-2">
	<span><i class="bi bi-check-lg"></i></span>
	<span>Save</span>
</button>

</div>	
</form>
<a href="/" class="btn variant-filled m-2 max-w-md">
	<span><i class="bi bi-x-lg"></i></span>
	<span>Cancel</span>
</a>