<script>
	import { getContext } from "svelte";
	import { signatures } from "$stores/signatures.js";
	const copy = getContext("copy");
	const lang = getContext("lang");
	
	// Determine current language from context
	$: currentLanguage = lang || 'en';
	
	let firstName = '';
	let lastName = '';
	let email = '';
	let country = '';
	let postalCode = '';
	let isSubmitting = false;
	let submissionError = '';
	let isExpanded = false;
	
	function toggleExpanded() {
		isExpanded = !isExpanded;
	}
	
	// Complete list of countries
	const countries = [
		'', // Empty option
		'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 
		'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 
		'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 
		'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 
		'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 
		'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 
		'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 
		'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 
		'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 
		'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 
		'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 
		'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 
		'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 
		'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 
		'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 
		'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 
		'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 
		'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 
		'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 
		'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 
		'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 
		'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 
		'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 
		'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 
		'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 
		'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
	];
	
	// Reactive statement to show postal code only for Canada
	$: showPostalCode = country === 'Canada';
	
	// Signature counter - use reactive store with fallback
	$: currentSignatures = $signatures.count || 255;
	let targetSignatures = 1000;
	$: progressPercentage = (currentSignatures / targetSignatures) * 100;
	
	// Referral URL tracking
	let referralUrl = '';
	
	// Capture the full URL including parameters when component mounts
	import { onMount } from 'svelte';
	onMount(() => {
		if (typeof window !== 'undefined') {
			referralUrl = window.location.href;
		}
	});
	
	async function handleSubmit() {
		if (isSubmitting) return;
		
		isSubmitting = true;
		submissionError = '';
		
		const formData = new FormData();
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('email', email);
		formData.append('country', country);
		formData.append('postalCode', postalCode);
		formData.append('referralUrl', referralUrl);
		formData.append('language', currentLanguage);
		
		try {
			const response = await fetch('https://script.google.com/macros/s/AKfycbzZFU7ik8FAD1I2BAr1kdq2MnrUwqH_rwDG6T5OftErMmG_chfleB1iXoemluPZoB-XTw/exec', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Accept': 'application/json',
				},
				body: formData
			});
			
			if (response.ok) {
				// Track petition submission conversion event
				if (typeof gtag !== 'undefined') {
					gtag('event', 'petition_submit', {
						event_category: 'conversion',
						event_label: 'Eurovision Canada Petition',
						value: 1,
						country: country,
						language: currentLanguage
					});
				}
				
				// Redirect to get-started page
				const getStartedUrl = currentLanguage === 'fr' ? '/fr/get-started' : '/get-started';
				window.location.href = getStartedUrl;
			} else {
				const responseText = await response.text();
				console.error('Server response error:', response.status, responseText);
				throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
			}
		} catch (error) {
			console.error('Submission error details:', {
				error: error.message,
				stack: error.stack,
				language: currentLanguage,
				userAgent: navigator.userAgent
			});
			
			if (error.name === 'TypeError' && error.message.includes('fetch')) {
				submissionError = currentLanguage === 'fr' 
					? 'Problème de connexion. Veuillez vérifier votre connexion Internet et réessayer.'
					: 'Connection issue. Please check your internet connection and try again.';
			} else {
				submissionError = currentLanguage === 'fr'
					? 'Une erreur s\'est produite lors de l\'envoi de votre pétition. Veuillez réessayer.'
					: 'There was an error submitting your petition. Please try again.';
			}
		} finally {
			isSubmitting = false;
		}
	}
	
</script>

<!-- Enhanced semantic structure for better LLM understanding and accessibility -->
<section class="petition" itemscope itemtype="https://schema.org/Petition" role="main" aria-labelledby="petition-heading">
	<div class="container">
		<div class="petition-content">
			<!-- Main petition content with structured markup -->
			<article class="petition-text" itemscope itemtype="https://schema.org/Article">
				<header>
					<h1 id="petition-heading" itemprop="headline" class="petition-title">{copy.petition[currentLanguage].main_heading}</h1>
				</header>
				
				<!-- Introduction section -->
				<section class="petition-intro" aria-labelledby="intro-heading">
					<h2 id="intro-heading" class="visually-hidden">Introduction</h2>
					<div itemprop="articleBody">
						<p itemprop="description">{copy.petition[currentLanguage].intro_paragraph1}</p>
						<p class="highlight-text">{@html copy.petition[currentLanguage].intro_paragraph2}</p>
					</div>
				</section>

				<!-- What we're asking for section -->
				<section class="petition-demands" aria-labelledby="demands-heading" itemscope itemtype="https://schema.org/Demand">
					<h2 id="demands-heading" class="section-heading" itemprop="name">{copy.petition[currentLanguage].what_asking_heading}</h2>
					<ul role="list" class="demands-list" itemprop="text">
						<li role="listitem" class="demand-item" data-target="ebu">
							{@html copy.petition[currentLanguage].ask_ebu}
						</li>
						<li role="listitem" class="demand-item" data-target="cbc">
							{@html copy.petition[currentLanguage].ask_cbc}
						</li>
						<li role="listitem" class="demand-item" data-target="government">
							{@html copy.petition[currentLanguage].ask_government}
						</li>
					</ul>
				</section>

				{#if !isExpanded}
					<button 
						class="read-more-btn" 
						on:click={toggleExpanded}
						aria-expanded="false"
						aria-controls="expanded-content"
						aria-label="Show more details about why Canada belongs at Eurovision"
					>
						{copy.petition[currentLanguage].read_more || 'Read More'}
					</button>
				{/if}

				{#if isExpanded}
					<div id="expanded-content" class="expanded-content" aria-live="polite">
						<!-- Why Canada belongs section -->
						<section class="petition-rationale" aria-labelledby="rationale-heading">
							<h2 id="rationale-heading" class="section-heading">{copy.petition[currentLanguage].why_canada_heading}</h2>
							
							<div class="rationale-points">
								<div class="rationale-point" data-point="diversity">
									<p>{@html copy.petition[currentLanguage].cultural_diversity}</p>
								</div>
								<div class="rationale-point" data-point="track-record">
									<p>{@html copy.petition[currentLanguage].track_record}</p>
								</div>
								<div class="rationale-point" data-point="broadcasting">
									<p>{@html copy.petition[currentLanguage].public_broadcasting}</p>
								</div>
								<div class="rationale-point" data-point="expansion">
									<p>{@html copy.petition[currentLanguage].expanding_family}</p>
								</div>
								<div class="rationale-point" data-point="exchange">
									<p>{@html copy.petition[currentLanguage].economic_exchange}</p>
								</div>
							</div>
						</section>
						
						<!-- Urgency section -->
						<section class="petition-urgency" aria-labelledby="urgency-heading">
							<h2 id="urgency-heading" class="section-heading">{copy.petition[currentLanguage].time_is_now_heading}</h2>
							<p class="urgency-text">{copy.petition[currentLanguage].time_paragraph1}</p>
							<p class="urgency-text">{copy.petition[currentLanguage].time_paragraph2}</p>
						</section>

						<button 
							class="read-less-btn" 
							on:click={toggleExpanded}
							aria-expanded="true"
							aria-controls="expanded-content"
							aria-label="Show less details"
						>
							{copy.petition[currentLanguage].read_less || 'Read Less'}
						</button>
					</div>
				{/if}
				
				<!-- Call to action -->
				<section class="petition-cta" aria-labelledby="cta-heading">
					<h2 id="cta-heading" class="call-to-action" itemprop="potentialAction" itemscope itemtype="https://schema.org/Action">
						{@html copy.petition[currentLanguage].call_to_action}
					</h2>
				</section>
			</article>
			
			<div class="petition-form">
				<div class="form-wrapper">
					<h3>{copy.form[currentLanguage].form_heading}</h3>
					<div class="signature-counter">
					<div class="counter-numbers">
						<span class="current-count">{currentSignatures.toLocaleString()}</span>
						<span class="target-count">{copy.form[currentLanguage].signature_counter.replace('1,000', targetSignatures.toLocaleString())}</span>
					</div>
					<div class="progress-bar">
						<div class="progress-fill" style="width: {progressPercentage}%"></div>
					</div>
					<div class="counter-message">
						{#if progressPercentage >= 100}
							{copy.form[currentLanguage].goal_reached}
						{:else}
							{copy.form[currentLanguage].help_goal}
						{/if}
					</div>
				</div>
					<form on:submit|preventDefault={handleSubmit}>
						<div class="form-group">
							<label for="firstName">{copy.form[currentLanguage].first_name}</label>
							<input 
								type="text" 
								id="firstName" 
								bind:value={firstName} 
								required 
								disabled={isSubmitting}
							/>
						</div>
						
						<div class="form-group">
							<label for="lastName">{copy.form[currentLanguage].last_name}</label>
							<input 
								type="text" 
								id="lastName" 
								bind:value={lastName} 
								required 
								disabled={isSubmitting}
							/>
						</div>
						
						<div class="form-group">
							<label for="email">{copy.form[currentLanguage].email}</label>
							<input 
								type="email" 
								id="email" 
								bind:value={email} 
								required 
								disabled={isSubmitting}
							/>
						</div>
						
						<div class="form-group">
							<label for="country">{copy.form[currentLanguage].country}</label>
							<select 
								id="country" 
								bind:value={country} 
								required 
								disabled={isSubmitting}
							>
								{#each countries as countryOption}
									<option value={countryOption}>
										{countryOption || copy.form[currentLanguage].country_placeholder}
									</option>
								{/each}
							</select>
						</div>
						
						{#if showPostalCode}
							<div class="form-group">
								<label for="postalCode">{copy.form[currentLanguage].postal_code}</label>
								<input 
									type="text" 
									id="postalCode" 
									bind:value={postalCode} 
									required 
									disabled={isSubmitting}
									placeholder={copy.form[currentLanguage].postal_code_placeholder}
								/>
							</div>
						{/if}
						
						<!-- Hidden referral URL field -->
						<input 
							type="hidden" 
							name="referralUrl" 
							bind:value={referralUrl}
						/>
						
						{#if submissionError}
							<div class="error-message">
								{copy.form[currentLanguage].error_message}
							</div>
						{/if}
						
						<button type="submit" class="submit-btn" disabled={isSubmitting}>
							{isSubmitting ? copy.form[currentLanguage].submit_loading : copy.form[currentLanguage].submit_button}
						</button>
						<p style="font-size:0.8rem;text-align:center;"><i>{copy.form[currentLanguage].privacy_notice}</i></p>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
    .petition h1, .petition h2, .petition h3 {
		font-family: "Lilita One", sans-serif;
    }

	.petition {
		padding: 60px 0;
        font-family:"Inter";
		background: #fff;
	}
	
	/* Accessibility helper for screen readers */
	.visually-hidden {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		margin: -1px !important;
		overflow: hidden !important;
		clip: rect(0, 0, 0, 0) !important;
		white-space: nowrap !important;
		border: 0 !important;
	}
	
	/* Enhanced semantic styling */
	.petition-title {
		font-size: 2.5rem;
		margin-bottom: 20px;
		color: #333;
	}
	
	.section-heading {
		font-size: 1.8rem;
		margin: 30px 0 15px;
		color: #333;
	}
	
	.demands-list {
		list-style: none;
		padding-left: 0;
		counter-reset: demand-counter;
	}
	
	.demand-item {
		counter-increment: demand-counter;
		position: relative;
		padding-left: 2.5rem;
		margin-bottom: 1.2rem;
		padding: 0.5rem 0 0.5rem 2.5rem;
	}
	
	.demand-item::before {
		content: counter(demand-counter);
		position: absolute;
		left: 0;
		top: 0.5rem;
		background: #d32f2f;
		color: white;
		border-radius: 50%;
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.8rem;
	}
	
	.rationale-points {
		display: grid;
	}
	
	.urgency-text {
		font-style: normal;
		margin-bottom: 1rem;
	}
	
	.expanded-content {
		animation: fadeIn 0.3s ease-in-out;
	}
	
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}
	
	.petition-content {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 60px;
		align-items: start;
	}
	
	.petition-text {
		line-height: 1.6;
	}
	
	.petition-text h2 {
		font-size: 2.5rem;
		margin-bottom: 20px;
		color: #333;
	}
	
	.petition-text h3 {
		font-size: 1.8rem;
		margin: 30px 0 15px;
		color: #333;
	}
	
	.petition-text p {
		margin-bottom: 15px;
		color: #555;
		font-size: 1rem;
	}
	
	.petition-text ul {
		margin: 15px 0;
		padding-left: 20px;
	}
	
	.petition-text li {
		margin-bottom: 8px;
		color: #555;
	}
	
	.form-wrapper {
		background:#93d5ad;
		padding: 40px;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 20px;
	}
	
	.signature-counter {
		margin-bottom: 30px;
		text-align: center;
		border-top: 2px solid rgba(255, 255, 255, 0.3);
		border-bottom: 2px solid rgba(255, 255, 255, 0.3);
		padding-bottom: 25px;
		padding-top:20px;
	}
	
	.counter-numbers {
		margin-bottom: 15px;
	}
	
	.current-count {
		font-size: 1.5rem;
		font-weight: 900;
		color: #333;
		display: inline;
		line-height: 1;
	}
	
	.target-count {
		font-size: 1rem;
		color: #555;
		margin-top: 5px;
		display: inline;
	}
	
	.progress-bar {
		background: rgba(255, 255, 255, 0.5);
		height: 10px;
		border-radius: 5px;
		margin: 15px 0;
		overflow: hidden;
		position: relative;
	}
	
	.progress-fill {
		background: linear-gradient(90deg, #d32f2f, #b71c1c);
		height: 100%;
		border-radius: 5px;
		transition: width 0.6s ease-in-out;
		position: relative;
	}
	
	.progress-fill::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: shimmer 2s infinite;
	}
	
	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}
	
	.counter-message {
		font-size: 0.95rem;
		color: #333;
		font-weight: 600;
		margin-top: 10px;
	}
	
	.form-wrapper h3 {
		font-size: 1.8rem;
		margin-bottom: 25px;
		color: #333;
		text-align: center;
	}
	
	.form-group {
		margin-bottom: 20px;
	}
	
	.form-group label {
		display: block;
		margin-bottom: 8px;
		font-weight: 600;
		color: #333;
		font-size: 0.9rem;
	}
	
	.form-group input,
	.form-group select {
		width: 100%;
		padding: 12px 15px;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
		box-sizing: border-box;
		background-color: white;
	}
	
	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: #007bff;
	}
	
	.form-group select:disabled {
		opacity: 0.6;
		background-color: #f5f5f5;
	}
	
	.submit-btn {
		width: 100%;
		background: #d32f2f;
		color: white;
		border: none;
		padding: 15px 25px;
		font-size: 1.1rem;
		font-weight: 600;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		margin-top: 10px;
	}
	
	.submit-btn:hover {
		background: #b71c1c;
	}
	
	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.form-group input:disabled {
		opacity: 0.6;
		background-color: #f5f5f5;
	}
	
	.error-message {
		background: #ffebee;
		color: #c62828;
		padding: 12px;
		border-radius: 6px;
		margin-bottom: 15px;
		font-size: 0.9rem;
		border: 1px solid #ef9a9a;
	}
	
	
	.read-more-btn,
	.read-less-btn {
		background: none;
		border: none;
		padding: 0;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: color 0.3s ease;
		margin: 20px 0;
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	
	.read-more-btn:hover,
	.read-less-btn:hover {
		text-decoration:underline;
	}
	
	.read-more-btn::after {
		content: '▼';
		font-size: 0.8rem;
	}
	
	.read-less-btn::after {
		content: '▲';
		font-size: 0.8rem;
	}
	
	.call-to-action {
		margin-top: 30px;
		padding-top: 20px;
		border-top: 2px solid #eee;
	}
	
	@media (max-width: 968px) {
		.petition-content {
			grid-template-columns: 1fr;
			gap: 40px;
		}
		
		.form-wrapper {
			position: static;
		}
		
		.petition-text h2 {
			font-size: 2rem;
		}
		
		.petition-text h3 {
			font-size: 1.5rem;
		}
	}
	
	@media (max-width: 640px) {
		.petition {
			padding: 40px 0;
		}
		
		.form-wrapper {
			padding: 30px 20px;
		}
		
		.petition-text h2 {
			font-size: 1.8rem;
		}
		
		.petition-text h3 {
			font-size: 1.3rem;
		}
	}
</style>
