<script>
	import { getContext } from "svelte";
	const copy = getContext("copy");
	const lang = getContext("lang");
	
	// Determine current language from context
	$: currentLanguage = lang || 'en';
</script>

  <footer> 
	<div class="container">
		<div class="row foot">
			<div class="col-8 mx-auto">
				<p><img src="/assets/favicon.png" alt="Eurovision Canada logo"></p>
				{#if currentLanguage === 'fr'}
					<p>Eurovision Canada est un projet communautaire dirigé par des fans visant à connecter les fans d'Eurovision à travers le Canada.</p>
					<p><a href="mailto:eurovisioncanada@proton.me">Contactez-nous</a></p>
					<p><a href="https://discord.gg/EN42KzANJz" target="_new">Join our Discord</a></p>
				{:else}
					<p>Eurovision Canada is a fan-driven community project aimed at connecting Eurovision fans across Canada.</p>
					<p><a href="mailto:eurovisioncanada@proton.me">Contact</a></p>
					<p><a href="https://discord.gg/EN42KzANJz" target="_new">Join our Discord</a></p>
				{/if}
			</div>
	</div>

  </footer>
  
  <style>
footer {
	padding:30px;
	background:#93d5ad;
	color:#000;
	font-family:"Inter";
	text-align:center;
}

footer a {
	color:#000;
	padding-top:20px;
	text-decoration:underline;
}

footer img {
	max-width:150px;
	margin:auto;
}

footer p {
	max-width:400px;
	text-align:center;
	margin: auto;
}
  </style>
