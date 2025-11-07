<script>
	let firstName = '';
	let lastName = '';
	let email = '';
	let country = '';
	let postalCode = '';
	let isSubmitting = false;
	let isSubmitted = false;
	let submissionError = '';
	
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
	
	// Signature counter
	let currentSignatures = 255;
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
		
		try {
			const response = await fetch('https://script.google.com/macros/s/AKfycbzZFU7ik8FAD1I2BAr1kdq2MnrUwqH_rwDG6T5OftErMmG_chfleB1iXoemluPZoB-XTw/exec', {
				method: 'POST',
				body: formData
			});
			
			if (response.ok) {
				isSubmitted = true;
			} else {
				throw new Error('Submission failed');
			}
		} catch (error) {
			submissionError = 'There was an error submitting your petition. Please try again.';
			console.error('Submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}
	
	function shareTwitter() {
		const text = "I just signed the petition to bring Canada to Eurovision! Join me and help make Canada part of Europe's biggest music celebration. #CanadaToEurovision #Eurovision2026";
		const url = window.location.href;
		window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
	}
	
	function shareFacebook() {
		const url = window.location.href;
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
	}
	
	function shareLinkedIn() {
		const url = window.location.href;
		const title = "Bring Canada to Eurovision - Sign the Petition";
		window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
	}
	
	function copyLink() {
		navigator.clipboard.writeText(window.location.href).then(() => {
			alert('Link copied to clipboard!');
		});
	}
</script>

<section class="petition">
	<div class="container">
		<div class="petition-content">
			<div class="petition-text">
				<h2>Why This Matters</h2>
				<p>Canada has a deep, historic connection to Eurovision. From Céline Dion's iconic 1988 victory for Switzerland to Natasha St-Pier and La Zarra representing France, Canadian artists have already proven they belong on the Eurovision stage. Now it's time for Canada to compete under its own flag.</p>
				
				<p>With the Canadian federal government's 2026 budget allocating funds to explore Eurovision participation, and the EBU expressing excitement about continuing discussions with CBC, we have a historic opportunity to make this happen.</p>

				<h3>What We're Asking For</h3>
				<ul>
				<li>We call on the <strong>European Broadcasting Union</strong> to extend a formal invitation to CBC/Radio-Canada to compete at Eurovision, recognizing Canada as a valued associate member ready to fully participate in this global celebration of music.</li>
				
				<li>We call on <strong>CBC/Radio-Canada</strong> to commit the resources necessary to select and send a world-class Canadian act to Eurovision, ensuring our country is represented with excellence and pride.</li>
				
				<li>We call on the <strong>Government of Canada</strong> to continue supporting this initiative financially and diplomatically, recognizing Eurovision as a powerful platform for cultural diplomacy and artistic expression.</li>
				</ul>
				
				<h3>Why Canada Belongs at Eurovision</h3>
				
				<p><strong>Cultural Diversity:</strong> Canada's multicultural identity mirrors Eurovision's celebration of diverse voices and styles. Our artists represent countless languages, genres, and traditions—exactly what Eurovision stands for.</p>
				
				<p><strong>Proven Track Record:</strong> Canadian artists have already won Eurovision and competed with distinction. We know how to deliver world-class performances that resonate globally.</p>
				
				<p><strong>Strong Public Broadcasting:</strong> CBC/Radio-Canada is a respected broadcaster with the technical expertise and cultural mandate to participate meaningfully in Eurovision, just as Australia's ABC has done since 2015.</p>
				
				<p><strong>Expanding the Eurovision Family:</strong> Australia's decade-long participation has shown that Eurovision can successfully welcome countries beyond Europe's borders. Canada would bring fresh energy, incredible talent, and millions of new viewers to the contest.</p>
				
				<p><strong>Economic and Cultural Exchange:</strong> Canada's participation would strengthen cultural ties between Canada and Europe, boost tourism, and showcase Canadian artists to over 180 million viewers worldwide.</p>
				
				<h3>The Time Is Now</h3>
				
				<p>The conversation has begun. Martin Green, Eurovision Song Contest Director, has confirmed that the EBU is "excited" about broadcaster interest and looks forward to continuing discussions with CBC. Even Prime Minister Mark Carney is personally involved in this push.</p>
				
				<p>But we need public support to turn this possibility into reality. Eurovision is about bringing people together through music—and Canadians are ready to be part of that story.</p>
				
				<h3><strong>Sign this petition to show that Canada wants Eurovision, and Eurovision wants Canada.</strong></h3>
			

				
			</div>
			
			<div class="petition-form">
				<div class="form-wrapper">
					
					{#if !isSubmitted}
						<h3>Sign the Petition</h3>
						<div class="signature-counter">
						<div class="counter-numbers">
							<span class="current-count">{currentSignatures.toLocaleString()}</span>
							<span class="target-count">of {targetSignatures.toLocaleString()} signatures</span>
						</div>
						<div class="progress-bar">
							<div class="progress-fill" style="width: {progressPercentage}%"></div>
						</div>
						<div class="counter-message">
							{#if progressPercentage >= 100}
								🎉 Target reached! Keep the momentum going!
							{:else}
								Help us reach our goal!
							{/if}
						</div>
					</div>
						<form on:submit|preventDefault={handleSubmit}>
							<div class="form-group">
								<label for="firstName">First Name *</label>
								<input 
									type="text" 
									id="firstName" 
									bind:value={firstName} 
									required 
									disabled={isSubmitting}
								/>
							</div>
							
							<div class="form-group">
								<label for="lastName">Last Name *</label>
								<input 
									type="text" 
									id="lastName" 
									bind:value={lastName} 
									required 
									disabled={isSubmitting}
								/>
							</div>
							
							<div class="form-group">
								<label for="email">Email *</label>
								<input 
									type="email" 
									id="email" 
									bind:value={email} 
									required 
									disabled={isSubmitting}
								/>
							</div>
							
							<div class="form-group">
								<label for="country">Country *</label>
								<select 
									id="country" 
									bind:value={country} 
									required 
									disabled={isSubmitting}
								>
									{#each countries as countryOption}
										<option value={countryOption}>
											{countryOption || 'Select your country...'}
										</option>
									{/each}
								</select>
							</div>
							
							{#if showPostalCode}
								<div class="form-group">
									<label for="postalCode">Postal Code *</label>
									<input 
										type="text" 
										id="postalCode" 
										bind:value={postalCode} 
										required 
										disabled={isSubmitting}
										placeholder="A1A 1A1"
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
									{submissionError}
								</div>
							{/if}
							
							<button type="submit" class="submit-btn" disabled={isSubmitting}>
								{isSubmitting ? 'Submitting...' : 'SIGN THE PETITION'}
							</button>
							<p style="font-size:0.8rem;text-align:center;"><i>We will protect your privacy and keep you updated on this campaign.</i></p>
						</form>
					{:else}
						<div class="thank-you">
							<h3>🎉 Thank You!</h3>
							<p>Your signature has been added to the petition. Share this petition widely using <strong>#CanadaToEurovision #Eurovision2026 #EurovisionCanada</strong></p>
							
							<div class="share-buttons">
								<button on:click={shareTwitter} class="share-btn twitter">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
									</svg>
									Share on Twitter
								</button>
								
								<button on:click={shareFacebook} class="share-btn facebook">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
									</svg>
									Share on Facebook
								</button>
								
								<button on:click={shareLinkedIn} class="share-btn linkedin">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
									</svg>
									Share on LinkedIn
								</button>
								
								<button on:click={copyLink} class="share-btn copy">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
									</svg>
									Copy Link
								</button>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
    .petition h2, .petition h3 {
		font-family: "Lilita One", sans-serif;
    }

	.petition {
		padding: 60px 0;
        font-family:"Inter";
		background: #fff;
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
	
	.thank-you {
		text-align: center;
	}
	
	.thank-you h3 {
		font-size: 1.8rem;
		margin-bottom: 15px;
		color: #333;
	}
	
	.thank-you p {
		margin-bottom: 25px;
		color: #555;
		line-height: 1.6;
	}
	
	.share-buttons {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	
	.share-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 12px 20px;
		border: none;
		border-radius: 8px;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
	}
	
	.share-btn.twitter {
		background: #1da1f2;
		color: white;
	}
	
	.share-btn.twitter:hover {
		background: #0d8bd9;
	}
	
	.share-btn.facebook {
		background: #4267B2;
		color: white;
	}
	
	.share-btn.facebook:hover {
		background: #365899;
	}
	
	.share-btn.linkedin {
		background: #2867B2;
		color: white;
	}
	
	.share-btn.linkedin:hover {
		background: #1a5490;
	}
	
	.share-btn.copy {
		background: #6c757d;
		color: white;
	}
	
	.share-btn.copy:hover {
		background: #545b62;
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
