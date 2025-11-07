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
			if (currentPath.includes('/giveaway')) {
				newPath = '/fr/giveaway';
			} else {
				newPath = '/fr';
			}
		} else {
			// English (default)
			if (currentPath.includes('/giveaway')) {
				newPath = '/giveaway';
			} else {
				newPath = '/';
			}
		}
		
		goto(newPath);
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
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
				EN
			</button>
			<span class="lang-separator">|</span>
			<button 
				on:click={() => switchLanguage('fr')}
				class="lang-btn"
				class:active={currentLanguage === 'fr'}
			>
				FR
			</button>
		</div>
		<div class="container-xxl">
			<div class="hero row">
				<div class="col-lg-5 col-md-12 col-sm-12 copy">
					<p>CANADA</p>
					<p>NEEDS</p>
					<img src="/assets/banner.png" alt="Eurovision">
					<p>NEEDS</p>
					<p>CANADA</p>
				</div>
				<div class="col-lg-7 col-md-12 col-sm-12">
					<img src="/assets/artist.png" alt="Eurovision Canada">
				</div>
			</div>
		</div>
	</header>
</div>

<style>
	
	
	.language-toggle {
		display: static;
		align-items: center;
		float:right;
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

	.truhla {
		background:#fff;
		max-width:200px;
		margin:auto;
		margin-top:20px;
		border-radius:20px;
		text-align:center;
		font-family:"Quicksand";
		font-size:2rem;
	}

	.truhla img {
		max-width:80px;
		margin:auto;
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
			padding-top:50px;
		}

		.copy {
			padding-top:20px;
		}
		
		.hero p {
			font-size: 3rem;
			line-height: 3rem;
		}
	}
	
	@media (max-width: 640px) {
		.nav-container {
			padding: 0 15px;
			height: 60px;
		}
		
		.nav-logo img {
			height: 35px;
		}
		
		header {
			margin-top: 60px;
		}
		
		.offcanvas-menu {
			width: 280px;
			right: -280px;
		}
		
		.hero p {
			font-size: 2.5rem;
			line-height: 2.5rem;
		}
	}
</style>
