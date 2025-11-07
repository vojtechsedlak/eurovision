<script>
	import { setContext } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";
	import analysis from "$data/analysis.csv";

	version();

	const { title, description, url, keywords } = copy;
	
	setContext("copy", copy.fr);
	setContext("data", analysis);
	setContext("lang", "fr");
</script>

<Meta title={copy.fr.Heading} description={copy.fr.Description} {url} {keywords} />
<Index />
