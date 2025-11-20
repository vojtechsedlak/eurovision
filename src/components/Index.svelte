<script>
	import { getContext } from "svelte";
	import Header from "$components/Header.svelte";
	import Petition from "$components/Petition.svelte";
	import MediaHits from "$components/MediaHits.svelte";
	import Footer from "$components/Footer.svelte";
	const copy = getContext("copy");
	const data = getContext("data");

</script>

<Header />
<Petition />
<MediaHits />
<Footer />
