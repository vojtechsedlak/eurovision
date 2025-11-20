<script>
	import { getContext } from "svelte";
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	const copy = getContext("copy");
	const lang = getContext("lang") || "en";
	
	// Get meta data from copy.json based on current language
	$: metaData = copy.meta[lang];
	$: title = metaData?.title || "Eurovision Canada";
	$: description = metaData?.description || "Let's bring Canada to Eurovision!";
	$: ogimage = metaData?.ogimage || "og.png";
	$: url = copy.meta.url || "https://eurovisioncanada.ca";
	$: keywords = copy.meta.keywords || "";
	
	export let slug = "";
	export let pageType = "website";
	export let publishedTime = "";
	export let modifiedTime = "";
	export let section = "";
	export let tags = [];
	
	// Enhanced SEO data
	$: currentUrl = browser ? window.location.href : `${url}${slug}`;
	$: alternateUrls = {
		en: lang === "fr" ? `${url}${slug.replace('/fr', '/en').replace('/fr/', '/')}` : currentUrl,
		fr: lang === "en" ? `${url}/fr${slug}` : currentUrl
	};
	
	// Structured data for the petition/campaign
	$: structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${url}/#organization`,
				"name": "Eurovision Canada",
				"url": url,
				"logo": {
					"@type": "ImageObject",
					"url": `${url}/assets/favicon.png`,
					"width": "512",
					"height": "512"
				},
				"sameAs": [
					"https://discord.gg/EN42KzANJz"
				],
				"contactPoint": {
					"@type": "ContactPoint",
					"email": "eurovisioncanada@proton.me",
					"contactType": "Customer Service"
				}
			},
			{
				"@type": "WebSite",
				"@id": `${url}/#website`,
				"url": url,
				"name": "Eurovision Canada",
				"description": "Let's bring Canada to Eurovision! Sign the petition to show support for Canada's participation in Europe's biggest music celebration.",
				"publisher": {
					"@id": `${url}/#organization`
				},
				"inLanguage": [
					{
						"@type": "Language",
						"name": "English",
						"alternateName": "en"
					},
					{
						"@type": "Language", 
						"name": "French",
						"alternateName": "fr"
					}
				]
			},
			{
				"@type": "WebPage",
				"@id": `${currentUrl}/#webpage`,
				"url": currentUrl,
				"name": title,
				"description": description,
				"isPartOf": {
					"@id": `${url}/#website`
				},
				"about": {
					"@id": `${url}/#organization`
				},
				"primaryImageOfPage": {
					"@type": "ImageObject",
					"url": `${url}/assets/${ogimage}`,
					"width": "1200",
					"height": "628"
				},
				"inLanguage": lang === "fr" ? "fr-CA" : "en-CA"
			},
			{
				"@type": "Petition",
				"@id": `${url}/#petition`,
				"name": title,
				"description": description,
				"url": currentUrl,
				"about": [
					{
						"@type": "Thing",
						"name": "Eurovision Song Contest"
					},
					{
						"@type": "Country",
						"name": "Canada"
					},
					{
						"@type": "Organization",
						"name": "European Broadcasting Union"
					},
					{
						"@type": "Organization", 
						"name": "CBC/Radio-Canada"
					}
				],
				"audience": {
					"@type": "Audience",
					"name": "Eurovision fans and Canadian music supporters"
				},
				"creator": {
					"@id": `${url}/#organization`
				}
			}
		]
	};
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content="Eurovision Canada" />
	<meta name="news_keywords" content={keywords} />
	<meta name="theme-color" content="#003f88" />
	<meta name="msapplication-TileColor" content="#003f88" />
	<meta name="application-name" content="Eurovision Canada" />
	
	<!-- Advanced Meta Tags for LLM Discovery -->
	<meta name="subject" content="Eurovision Song Contest Canada Petition Campaign" />
	<meta name="classification" content="Petition, Music, Eurovision, Canada, Cultural Exchange" />
	<meta name="category" content="Music Entertainment" />
	<meta name="coverage" content="Worldwide" />
	<meta name="distribution" content="Global" />
	<meta name="rating" content="General" />
	<meta name="revisit-after" content="7 days" />
	
	<!-- Favicon and Icons -->
	<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon.png" />
	<link rel="shortcut icon" href="/assets/favicon.png" />

	<!-- Enhanced Open Graph Tags -->
	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="Eurovision Canada" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={pageType} />
	<meta property="og:locale" content={lang === "fr" ? "fr_CA" : "en_CA"} />
	<meta property="og:locale:alternate" content={lang === "fr" ? "en_CA" : "fr_CA"} />
	
	<meta property="og:image" content="{url}/assets/{ogimage}" />
	<meta property="og:image:secure_url" content="{url}/assets/{ogimage}" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />
	<meta property="og:image:alt" content={title} />
	
	{#if section}<meta property="article:section" content={section} />{/if}
	{#if publishedTime}<meta property="article:published_time" content={publishedTime} />{/if}
	{#if modifiedTime}<meta property="article:modified_time" content={modifiedTime} />{/if}
	{#if tags.length > 0}
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Enhanced Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@eurovisioncanada" />
	<meta name="twitter:creator" content="@eurovisioncanada" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{url}/assets/{ogimage}" />
	<meta name="twitter:image:alt" content={title} />
	<meta name="twitter:domain" content="eurovisioncanada.ca" />
	<meta name="twitter:url" content={currentUrl} />

	<!-- Robots and SEO -->
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="googlebot" content="index, follow" />
	<meta name="bingbot" content="index, follow" />

	<!-- Canonical and Language Alternatives -->
	<link rel="canonical" href={currentUrl} />
	<link rel="alternate" hreflang="en-CA" href={alternateUrls.en} />
	<link rel="alternate" hreflang="fr-CA" href={alternateUrls.fr} />
	<link rel="alternate" hreflang="x-default" href={alternateUrls.en} />

	<!-- DNS Prefetch and Preconnect for Performance -->
	<link rel="dns-prefetch" href="//fonts.googleapis.com" />
	<link rel="dns-prefetch" href="//fonts.gstatic.com" />
	<link rel="dns-prefetch" href="//www.google-analytics.com" />
	<link rel="dns-prefetch" href="//www.googletagmanager.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	
	<!-- Font Loading with Display Swap for Performance -->
	<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lilita+One&display=swap" rel="stylesheet" />

	<!-- Structured Data (JSON-LD) -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}

	<!-- Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-LHRSMN2PPP"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-LHRSMN2PPP', {
			page_title: document.title,
			page_location: window.location.href,
			content_group1: 'Eurovision Canada',
			content_group2: '{lang}',
			custom_map: {'dimension1': 'page_type'}
		});
	</script>
</svelte:head>
