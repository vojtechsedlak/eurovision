<script>
	import { getContext } from "svelte";
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	
	const copy = getContext("copy");
	const data = getContext("data");
	const lang = getContext("lang");
	
	// Navigation state
	let mobileMenuOpen = false;
	
	// Determine current language from context or URL
	$: currentLanguage = lang || 'en';
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function switchLanguage(newLang) {
		const currentPath = $page.url.pathname;
		let newPath = '/';
		
		if (newLang === 'fr') {
			newPath = '/fr';

		} else {
				newPath = '/';
		}
		
		goto(newPath);
	}
	
</script>


<div class="overlay">
	<header>
		<!-- Language Toggle -->
		<div class="language-toggle">
			<button 
				on:click={() => switchLanguage('en')}
				class="lang-btn"
				class:active={currentLanguage === 'en'}
			>
				{copy.header.language_toggle.en}
			</button>
			<span class="lang-separator">{copy.header.language_toggle.separator}</span>
			<button 
				on:click={() => switchLanguage('fr')}
				class="lang-btn"
				class:active={currentLanguage === 'fr'}
			>
				{copy.header.language_toggle.fr}
			</button>
		</div>
		<div class="container-xxl">
			<div class="hero row">
				<div class="col-lg-5 col-md-12 col-sm-12 copy">
					<p>{copy.header[currentLanguage].hero.line1}</p>
					<p>{copy.header[currentLanguage].hero.line2}</p>
					<img src="/assets/banner.png" alt="Eurovision">
					<p>{copy.header[currentLanguage].hero.line4}</p>
					<p>{copy.header[currentLanguage].hero.line5}</p>
				</div>
				<div class="col-lg-7 col-md-12 col-sm-12">
					<img src="/assets/artist.png" alt="{copy.header[currentLanguage].alt_text}">
				</div>
			</div>
		</div>
	</header>
</div>

<style>
	
	
	.language-toggle {
		position: absolute;
		align-items: center;
		top:0;
		right:0;
		padding:20px;
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
	}
	
	

	/* Existing Header Styles */
	header {
		background-image:url("/assets/bg.jpg");
		background-repeat:no-repeat;
		background-size:cover;
		background-position:bottom center;
		min-height:750px;
	}

	.overlay {
		background:#edd6c0;
	}

	.hero {
		padding-top:100px;
		padding-left:20px;
	}
	
	.copy {
		padding-top:100px;
	}
	
	.hero p {
		font-size:4rem;
		font-family: "Lilita One", sans-serif;
		padding:0px;
		margin:0px;
		line-height:4rem;
	}

	.data {
		background:#fff;
		max-width:630px;
		min-height:250px;
		border-radius:20px;
		text-align:center;
		padding:20px;
		margin:auto;
	}

	.progress {
		max-width:630px;
	}


	
	/* Responsive Design */
	@media (max-width: 968px) {
		.desktop-menu {
			display: none;
		}
		
		.mobile-menu-btn {
			display: flex;
		}
		
		.hero {
			padding-top:20px;
			width:100%;
		}

		.copy {
			padding-top:40px;
			width:100%;
		}
		
		.hero p {
			font-size: 3rem;
			line-height: 3rem;
		}
	}
	
</style>
