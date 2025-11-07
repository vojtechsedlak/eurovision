<script>
	export let title = "Let's bring Canada to Eurovision!";
	export let description = "Jágrova Koruna";
	export let url = "https://eurovisioncanada.ca";
	export let keywords = "";
	export let ogimage = "ogimage.jpg";
	export let slug = "";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Eurovision Canada" />
	<meta name="news_keywords" content={keywords} />
	<link rel="icon" type="image/x-icon" href="/assets/favicon.png">


	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="Let's bring Canada to Eurovision!" />
	<meta property="og:url" content="{url}{slug}" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<meta property="og:image" content="{url}/assets/{ogimage}" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="{url}" />
	<meta name="twitter:creator" content="@standearth" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:src" content="{url}/assets/{ogimage}" />

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href="{url}" />

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lilita+One&display=swap" rel="stylesheet">
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-HGWYG9G4N1"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'G-HGWYG9G4N1');
	</script>
</svelte:head>
