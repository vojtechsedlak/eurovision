<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	
	const copy = getContext("copy");
	const lang = getContext("lang");
	
	$: currentLanguage = lang || 'en';
	$: shareUrl = currentLanguage === 'fr' ? 'https://eurovisioncanada.ca/fr' : 'https://eurovisioncanada.ca';
	$: discordUrl = copy.footer[currentLanguage].discord_url;
	
	// Share functions
	function shareOnTwitter() {
		// Track social share event
		if (typeof gtag !== 'undefined') {
			gtag('event', 'share', {
				method: 'Twitter',
				content_type: 'petition',
				item_id: 'eurovision_canada_petition'
			});
		}
		
		const text = copy.social.twitter_text;
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=CanadaToEurovision,Eurovision2026,EurovisionCanada`;
		window.open(url, '_blank');
	}
	
	function shareOnFacebook() {
		// Track social share event
		if (typeof gtag !== 'undefined') {
			gtag('event', 'share', {
				method: 'Facebook',
				content_type: 'petition',
				item_id: 'eurovision_canada_petition'
			});
		}
		
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
		window.open(url, '_blank');
	}
	
	function shareOnLinkedIn() {
		// Track social share event
		if (typeof gtag !== 'undefined') {
			gtag('event', 'share', {
				method: 'LinkedIn',
				content_type: 'petition',
				item_id: 'eurovision_canada_petition'
			});
		}
		
		const title = copy.meta[currentLanguage].title;
		const summary = copy.meta[currentLanguage].description;
		const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
		window.open(url, '_blank');
	}
	
	function shareOnReddit() {
		// Track social share event
		if (typeof gtag !== 'undefined') {
			gtag('event', 'share', {
				method: 'Reddit',
				content_type: 'petition',
				item_id: 'eurovision_canada_petition'
			});
		}
		
		const title = copy.meta[currentLanguage].title;
		const url = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
		window.open(url, '_blank');
	}
	
	function shareOnWhatsApp() {
		// Track social share event
		if (typeof gtag !== 'undefined') {
			gtag('event', 'share', {
				method: 'WhatsApp',
				content_type: 'petition',
				item_id: 'eurovision_canada_petition'
			});
		}
		
		const text = `${copy.meta[currentLanguage].title} - ${shareUrl}`;
		const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
		window.open(url, '_blank');
	}
	
	function copyLink() {
		// Track social share event
		if (typeof gtag !== 'undefined') {
			gtag('event', 'share', {
				method: 'Copy Link',
				content_type: 'petition',
				item_id: 'eurovision_canada_petition'
			});
		}
		
		navigator.clipboard.writeText(shareUrl).then(() => {
			// Show feedback (you could add a toast notification here)
			alert('Link copied to clipboard!');
		});
	}
	
	const getStartedCopy = {
		en: {
			heading: "Thank You for Signing!",
			subtitle: "Your voice has been added to the movement to bring Canada to Eurovision.",
			share_heading: "Help Us Reach More Canadians",
			share_subtitle: "Share this petition with your friends and family to amplify our message:",
			discord_heading: "Join Our Community",
			discord_subtitle: "Connect with fellow Eurovision fans and stay updated on our campaign:",
			discord_button: "Join Discord Community",
			share_buttons: {
				twitter: "Share on Twitter",
				facebook: "Share on Facebook", 
				linkedin: "Share on LinkedIn",
				reddit: "Share on Reddit",
				whatsapp: "Share on WhatsApp",
				copy: "Copy Link"
			}
		},
		fr: {
			heading: "Merci d'avoir Signé !",
			subtitle: "Votre voix a été ajoutée au mouvement pour amener le Canada à l'Eurovision.",
			share_heading: "Aidez-nous à Atteindre Plus de Canadiens",
			share_subtitle: "Partagez cette pétition avec vos amis et votre famille pour amplifier notre message :",
			discord_heading: "Rejoignez Notre Communauté",
			discord_subtitle: "Connectez-vous avec d'autres fans d'Eurovision et restez informé de notre campagne :",
			discord_button: "Rejoindre la Communauté Discord",
			share_buttons: {
				twitter: "Partager sur Twitter",
				facebook: "Partager sur Facebook",
				linkedin: "Partager sur LinkedIn", 
				reddit: "Partager sur Reddit",
				whatsapp: "Partager sur WhatsApp",
				copy: "Copier le Lien"
			}
		}
	};
</script>

<div class="get-started-page">
	<div class="simplified-header">
		
		<div class="container">
			<div class="header-content">
				<a href={currentLanguage === 'fr' ? '/fr' : '/'} class="logo-link">
					<img src="/assets/favicon.png" alt="Eurovision Canada" class="logo">
				</a>
				<h1>{getStartedCopy[currentLanguage].heading}</h1>
				<p class="subtitle">{getStartedCopy[currentLanguage].subtitle}</p>
			</div>
		</div>
	</div>

	<main class="container">
		<!-- Share Section -->
		<section class="share-section">
			<h2>{getStartedCopy[currentLanguage].share_heading}</h2>
			<p>{getStartedCopy[currentLanguage].share_subtitle}</p>
			
			<div class="share-buttons">
				<button class="share-btn twitter" on:click={shareOnTwitter}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
					{getStartedCopy[currentLanguage].share_buttons.twitter}
				</button>
				
				<button class="share-btn facebook" on:click={shareOnFacebook}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
					{getStartedCopy[currentLanguage].share_buttons.facebook}
				</button>
				
				<button class="share-btn linkedin" on:click={shareOnLinkedIn}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
					{getStartedCopy[currentLanguage].share_buttons.linkedin}
				</button>
				
				<button class="share-btn reddit" on:click={shareOnReddit}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
					</svg>
					{getStartedCopy[currentLanguage].share_buttons.reddit}
				</button>
				
				<button class="share-btn whatsapp" on:click={shareOnWhatsApp}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
					</svg>
					{getStartedCopy[currentLanguage].share_buttons.whatsapp}
				</button>
				
				<button class="share-btn copy" on:click={copyLink}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
					</svg>
					{getStartedCopy[currentLanguage].share_buttons.copy}
				</button>
			</div>
		</section>

		<!-- Discord Section -->
		<section class="discord-section">
			<h2>{getStartedCopy[currentLanguage].discord_heading}</h2>
			<p>{getStartedCopy[currentLanguage].discord_subtitle}</p>
			
			<a href="{discordUrl}" target="_blank" class="discord-cta" on:click={() => {
				// Track Discord click event
				if (typeof gtag !== 'undefined') {
					gtag('event', 'click', {
						event_category: 'engagement',
						event_label: 'Discord Join - Get Started Page',
						transport_type: 'beacon'
					});
				}
			}}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.010c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.120.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
				</svg>
				{getStartedCopy[currentLanguage].discord_button}
			</a>
		</section>
	</main>

	<Footer />
</div>

<style>
	.get-started-page {
		min-height: 100vh;
		background-image:url("/assets/bg.jpg");
		background-position:center bottom;
		background-size:cover;
	}

	.simplified-header {
		padding: 60px 0;
		text-align: center;
		position: relative;
	}

	.simplified-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}

	.simplified-header .container {
		position: relative;
		z-index: 2;
	}

	.language-toggle {
		position: absolute;
		top: 20px;
		right: 20px;
	}

	.lang-btn {
		background: none;
		border: none;
		color: #555;
		font-weight: 600;
		font-size: 14px;
		cursor: pointer;
		transition: color 0.3s ease;
		font-family: "Inter", sans-serif;
		text-decoration: none;
	}

	.lang-btn.active {
		color: #333;
	}

	.lang-btn:hover {
		color: #d32f2f;
	}

	.lang-separator {
		color: #666;
		font-weight: 300;
		margin: 0 8px;
	}

	.logo-link {
		display: inline-block;
		margin-bottom: 0px;
		transition: transform 0.3s ease;
	}

	.logo-link:hover {
		transform: scale(1.05);
	}

	.header-content .logo {
		height: 100px;
		width: auto;
		margin-bottom: 0;
	}

	.header-content h1 {
		font-family: "Lilita One", sans-serif;
		font-size: 3rem;
		color: #333;
		margin: 0 0 10px 0;
	}

	.header-content .subtitle {
		font-size: 1.2rem;
		color: #666;
		max-width: 600px;
		margin: 0 auto;
	}

	main.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 20px;
		background: white;
		border-radius: 20px 20px 0 0;
		box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
	}

	.share-section, .discord-section {
		text-align: center;
		margin-bottom: 60px;
	}

	.share-section h2, .discord-section h2 {
		font-family: "Lilita One", sans-serif;
		font-size: 2rem;
		color: #333;
		margin-bottom: 15px;
	}

	.share-section p, .discord-section p {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 30px;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.share-buttons {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 15px;
		max-width: 600px;
		margin: 0 auto;
	}

	.share-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 15px 20px;
		border: none;
		border-radius: 10px;
		font-family: "Inter", sans-serif;
		font-weight: 600;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.share-btn.twitter {
		background: #1DA1F2;
		color: white;
	}

	.share-btn.twitter:hover {
		background: #1991DA;
	}

	.share-btn.facebook {
		background: #4267B2;
		color: white;
	}

	.share-btn.facebook:hover {
		background: #365899;
	}

	.share-btn.linkedin {
		background: #0077B5;
		color: white;
	}

	.share-btn.linkedin:hover {
		background: #005885;
	}

	.share-btn.reddit {
		background: #FF4500;
		color: white;
	}

	.share-btn.reddit:hover {
		background: #E03D00;
	}

	.share-btn.whatsapp {
		background: #25D366;
		color: white;
	}

	.share-btn.whatsapp:hover {
		background: #20BC5A;
	}

	.share-btn.copy {
		background: #6c757d;
		color: white;
	}

	.share-btn.copy:hover {
		background: #5a6268;
	}

	.discord-cta {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 20px 40px;
		background: #5865F2;
		color: white;
		text-decoration: none;
		border-radius: 15px;
		font-family: "Inter", sans-serif;
		font-weight: 700;
		font-size: 1.1rem;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(88, 101, 242, 0.3);
	}

	.discord-cta:hover {
		background: #4752C4;
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(88, 101, 242, 0.4);
	}

	@media (max-width: 768px) {
		.header-content h1 {
			font-size: 2.5rem;
		}

		.share-buttons {
			grid-template-columns: 1fr;
		}

		.share-btn {
			padding: 12px 15px;
		}

		.discord-cta {
			padding: 18px 30px;
			font-size: 1rem;
		}
	}
</style>
