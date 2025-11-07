<script>
	import { setContext } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";
	import analysis from "$data/analysis.csv";

	version();

	const { title, description, url, keywords } = copy;
	
	setContext("copy", copy.en);
	setContext("data", analysis);
	setContext("lang", "en");
</script>

<Meta title={copy.en.Giveawayt} description={copy.en.Giveawaya} {url} {keywords} />

<Header />

<div class="container">
	<div class="row">
		<div class="col-12">
			<h1 class="mt-5 mb-4">{copy.en.Giveawayt}</h1>
			<p class="lead">{@html copy.en.Giveawaya}</p>
			
			<form class="mt-5">
				<div class="mb-3">
					<label for="solWallet" class="form-label">{copy.en.Giveawayform1}</label>
					<input type="text" class="form-control" id="solWallet" placeholder={copy.en.Giveawayform1h}>
				</div>
				
				<div class="mb-3">
					<label for="ethWallet" class="form-label">{copy.en.Giveawayform2}</label>
					<input type="text" class="form-control" id="ethWallet" placeholder={copy.en.Giveawayform2h}>
				</div>
				
				<div class="mb-3">
					<label for="cardChoice" class="form-label">{copy.en.Giveawayform3}</label>
					<input type="text" class="form-control" id="cardChoice" placeholder={copy.en["Giveawayform-3h"]}>
				</div>
				
				<button type="submit" class="btn btn-primary">{copy.en.Giveawayform4}</button>
			</form>
		</div>
	</div>
</div>

<Footer />
