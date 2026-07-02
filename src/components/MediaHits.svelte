<script>
	import { getContext, onMount } from "svelte";
	import loadCsv from "../utils/loadCsv.js";
	
	const copy = getContext("copy");
	const lang = getContext("lang");
	
	$: currentLanguage = lang || 'en';
	let expanded = false;
	let mediaHitsData = [];
	let loading = true;
	
	// Static text content for different languages
	const content = {
		en: {
			heading: "Latest Updates",
			subtitle: "Follow the news about Canada's historic Eurovision 2027 debut",
			expandText: "Show More Articles",
			collapseText: "Show Less"
		},
		fr: {
			heading: "Dernières Nouvelles",
			subtitle: "Suivez l'actualité du début historique du Canada à l'Eurovision 2027",
			expandText: "Voir Plus d'Articles",
			collapseText: "Voir Moins"
		}
	};
	
	onMount(async () => {
		try {
			const csvData = await loadCsv('/data/hits.csv');
			// Sort by date (newest first) and process the data
			mediaHitsData = csvData
				.map(row => ({
					headline: row.Headline,
					publication: row.Publication,
					url: row.URL,
					date: row.Date,
					domain: extractDomain(row.URL)
				}))
				.sort((a, b) => new Date(b.date) - new Date(a.date));
			loading = false;
		} catch (error) {
			console.error('Error loading media hits data:', error);
			loading = false;
		}
	});
	
	function extractDomain(url) {
		try {
			const urlObj = new URL(url);
			return urlObj.hostname.replace('www.', '');
		} catch (error) {
			console.error('Error extracting domain from URL:', url, error);
			return '';
		}
	}
	
	function formatDate(dateString) {
		const date = new Date(dateString);
		const options = { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		};
		return date.toLocaleDateString(currentLanguage === 'fr' ? 'fr-CA' : 'en-CA', options);
	}
	
	function getLogoUrl(domain) {
		return `https://logo.clearbit.com/${domain}`;
	}
	
	function toggleExpanded() {
		expanded = !expanded;
	}
	
	$: displayedItems = expanded ? mediaHitsData : mediaHitsData.slice(0, 3);
	$: hasMoreItems = mediaHitsData.length > 3;
</script>

<section class="media-hits">
	<div class="container">
		<div class="media-hits-header">
			<h2>{content[currentLanguage].heading}</h2>
			<p>{content[currentLanguage].subtitle}</p>
		</div>
		
		{#if loading}
			<div class="loading">Loading media hits...</div>
		{:else if mediaHitsData.length > 0}
			<div class="media-grid">
				{#each displayedItems as item}
					<article class="media-item">
						<a href={item.url} target="_blank" rel="noopener noreferrer" class="media-link">
							<div class="media-header">
								<img 
									src={getLogoUrl(item.domain)} 
									alt="{item.publication} logo"
									class="media-logo"
									on:error={(e) => e.target.style.display = 'none'}
								/>
								<div class="media-info">
									<div class="media-publication">{item.publication}</div>
									<div class="media-date">{formatDate(item.date)}</div>
								</div>
							</div>
							<h3 class="media-headline">{item.headline}</h3>
						</a>
					</article>
				{/each}
			</div>
			
			{#if hasMoreItems}
				<div class="expand-section">
					<button class="expand-btn" on:click={toggleExpanded}>
						{expanded ? content[currentLanguage].collapseText : content[currentLanguage].expandText}
						<svg 
							class="expand-icon" 
							class:rotated={expanded}
							width="16" 
							height="16" 
							viewBox="0 0 16 16"
						>
							<path d="M8 12L2 6h12L8 12z" fill="currentColor"/>
						</svg>
					</button>
				</div>
			{/if}
		{:else}
			<div class="error">No media hits data available.</div>
		{/if}
	</div>
</section>

<style>
	.media-hits {
		padding: 60px 0;
		background: #f8f9fa;
		font-family: "Inter", sans-serif;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}
	
	.media-hits-header {
		text-align: center;
		margin-bottom: 40px;
	}
	
	.media-hits-header h2 {
		font-family: "Lilita One", sans-serif;
		font-size: 2.5rem;
		color: #333;
		margin-bottom: 15px;
	}
	
	.media-hits-header p {
		font-size: 1.1rem;
		color: #666;
		max-width: 600px;
		margin: 0 auto;
	}
	
	.media-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		margin-bottom: 30px;
	}
	
	.media-item {
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
		border: 1px solid #e9ecef;
	}
	
	.media-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
	}
	
	.media-link {
		display: block;
		padding: 20px;
		text-decoration: none;
		color: inherit;
		height: 100%;
	}
	
	.media-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 15px;
		padding-bottom: 12px;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.media-logo {
		width: 32px;
		height: 32px;
		border-radius: 4px;
		object-fit: cover;
		flex-shrink: 0;
	}
	
	.media-info {
		flex: 1;
		min-width: 0;
	}
	
	.media-publication {
		font-size: 0.9rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 2px;
	}
	
	.media-date {
		font-size: 0.8rem;
		color: #888;
		font-weight: 500;
	}
	
	.media-headline {
		margin: 0;
		font-size: 1rem;
		line-height: 1.4;
		color: #222;
		font-weight: 500;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.media-link:hover .media-headline {
		color: #d32f2f;
	}
	
	.expand-section {
		text-align: center;
		margin-top: 30px;
	}
	
	.expand-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: #fff;
		border: 2px solid #93d5ad;
		border-radius: 25px;
		font-size: 0.95rem;
		font-weight: 600;
		color: #333;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: inherit;
	}
	
	.expand-btn:hover {
		background: #93d5ad;
		color: white;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(147, 213, 173, 0.3);
	}
	
	.expand-icon {
		transition: transform 0.3s ease;
	}
	
	.expand-icon.rotated {
		transform: rotate(180deg);
	}
	
	.loading, .error {
		text-align: center;
		padding: 40px 20px;
		font-size: 1.1rem;
		color: #666;
	}
	
	.error {
		color: #d32f2f;
	}
	
	@media (max-width: 768px) {
		.media-hits {
			padding: 40px 0;
		}
		
		.media-hits-header h2 {
			font-size: 2rem;
		}
		
		.media-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}
		
		.media-link {
			padding: 16px;
		}
		
		.media-headline {
			font-size: 0.95rem;
		}
		
		.expand-btn {
			padding: 10px 20px;
			font-size: 0.9rem;
		}
	}
	
	@media (max-width: 480px) {
		.media-header {
			gap: 10px;
		}
		
		.media-logo {
			width: 28px;
			height: 28px;
		}
		
		.media-publication {
			font-size: 0.85rem;
		}
		
		.media-date {
			font-size: 0.75rem;
		}
	}
</style>
