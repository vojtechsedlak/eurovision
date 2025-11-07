<script>
	import { getContext } from "svelte";
	const copy = getContext("copy");
	
  
</script>

  <footer> 
	<div class="container">
		<div class="row foot">
			<div class="col-8 mx-auto">
				<p><img src="/assets/favicon.png" alt="Eurovision Canada logo"></p>
				<p>Eurovision Canada is a fan-driven community project aimed at connecting Eurovision fans across Canada.</p>
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
	color:#fff;
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
