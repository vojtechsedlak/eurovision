<script>
	import { setContext } from "svelte";
	import Meta from "$components/Meta.svelte";
	import GetStarted from "$components/GetStarted.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";

	version();
	
	setContext("copy", copy);
	setContext("lang", "fr");
</script>

<Meta />
<GetStarted />
