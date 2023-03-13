<script>
	import { drawerStore,RangeSlider } from '@skeletonlabs/skeleton';
	export let exercise ;
	
	let wt_value = 2.5;
	let max = 40;

</script>

<h2>Exercise: {exercise[0].toUpperCase() + exercise.substr(1)}</h2>

<div class="input-group input-group-divider grid-cols-[auto_auto_auto_auto] max-w-md mt-4">
	<div class="input-group-shim"> SETS </div>
	
	<select class="select" size="3" value="">
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
	</select>
	<div class="input-group-shim">REPS</div>
	<select class="select" size="3" value="">
		<option value="1">6</option>
		<option value="2">8</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
	</select>
	
</div>


<RangeSlider name="range-slider" bind:value={wt_value} max={max} step={2.5} class=" max-w-4xl pt-5" ticked>
	<div class="flex justify-between items-center">
		<div class="font-bold">Weight in KG</div>
		<div class="text-xs">{wt_value} / {max}</div>
	</div>
</RangeSlider>

<label class="label p-2 ">
	<span>Textarea</span>
	<textarea class="textarea" rows="4" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
</label>
<div class="grid ">
<a href="/" class="btn variant-filled m-2">
	<span><i class="bi bi-check-lg"></i></span>
	<span>Save</span>
</a>
<a href="/" class="btn variant-filled m-2">
	<span><i class="bi bi-x-lg"></i></span>
	<span>Cancel</span>
</a>
</div>

		
