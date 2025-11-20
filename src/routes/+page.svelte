<script>
	import { setContext } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";
	import analysis from "$data/analysis.csv";
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	version();
	
	setContext("copy", copy);
	setContext("data", analysis);
	setContext("lang", "en");
</script>

<Meta />
<Index />
