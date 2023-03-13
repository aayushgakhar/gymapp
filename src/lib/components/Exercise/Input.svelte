<script>
	import { drawerStore } from '@skeletonlabs/skeleton';
	export let exercise ;
	export let muscle ;

</script>

<h2>Exercise: {exercise[0].toUpperCase() + exercise.substr(1)}</h2>


<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-md mt-4">
	<div class="input-group-shim"> SETS </div>
	<!-- <input type="search" placeholder="Search..." /> -->
	<select class="select" size="4" value="1">
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
		<option value="3">Option 3</option>
		<option value="4">Option 4</option>
		<option value="5">Option 5</option>
	</select>
</div>
<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-md mt-4">
	<div class="input-group-shim">REPS</div>
	<input type="search" placeholder="Search..." />
	<select class="select">
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
		<option value="3">Option 3</option>
		
	</select>
</div>
<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-md mt-4">
	<div class="input-group-shim">(segment)</div>
	<input type="search" placeholder="Search..." />
	<select class="select">
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
		<option value="3">Option 3</option>
		
	</select>
</div>
<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-md mt-4">
	<div class="input-group-shim">(segment)</div>
	<input type="search" placeholder="Search..." />
	<select class="select">
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
		<option value="3">Option 3</option>
		
	</select>
</div>
		