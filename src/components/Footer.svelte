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
			<div class="col-lg-8 col-sm-12 mx-auto">
				<p><img src="{copy.footer.logo_src}" alt="{copy.footer.logo_alt}"></p>
				<p style="margin-bottom:20px;">{copy.footer[currentLanguage].description}</p>
				<p><a href="mailto:{copy.footer[currentLanguage].contact_email}">{copy.footer[currentLanguage].contact}</a></p>
				<p><a href="{copy.footer[currentLanguage].discord_url}" target="_new" on:click={() => {
					// Track Discord click event
					if (typeof gtag !== 'undefined') {
						gtag('event', 'click', {
							event_category: 'engagement',
							event_label: 'Discord Join - Footer',
							transport_type: 'beacon'
						});
					}
				}}>{copy.footer[currentLanguage].discord}</a></p>
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
	max-width:100px;
	margin:auto;
}

footer p {
	max-width:500px;
	text-align:center;
	margin: auto;
}
  </style>
