document.addEventListener("DOMContentLoaded", () => {
	const counter = document.getElementById("view-counter");

	if (!counter) {
		return;
	}

	fetch("https://dg-blog-ombres-2026.goatcounter.com/counter/TOTAL.json")
		.then(response => response.json())
		.then(data => {
			counter.textContent = data.count + " visites";
		})
		.catch(() => {
			counter.textContent = "compteur indisponible";
		});
});