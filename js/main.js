// Liste unique des jeux du blog : c'est le seul endroit à modifier pour ajouter un jeu.
// page : nom du fichier HTML (rangé dans le dossier html) ; display_name : titre affiché ;
// upcoming : true ajoute « (à venir) ».
const GAMES = [
	{ page: "reticuli.html", display_name: "Reticuli", upcoming: false },
	{ page: "arena-strike.html", display_name: "Accessible Arena Strike", upcoming: false },
	{ page: "fistula-mound.html", display_name: "Le tertre fistule", upcoming: false },
	{ page: "vampire-photo.html", display_name: "Vampire Photo", upcoming: true },
	{ page: "metropolis.html", display_name: "Metropolis", upcoming: true },
];

// Nom de la page ouverte, sans « .html » (fonctionne aussi pour les adresses sans extension).
function getCurrentPageName() {
	const lastPart = window.location.pathname.split("/").pop() || "index.html";
	return lastPart.replace(/\.html$/, "");
}

// Vrai si la page ouverte se trouve dans le dossier html (pages des jeux).
function isInHtmlFolder() {
	const parts = window.location.pathname.split("/");
	return parts[parts.length - 2] === "html";
}

// Construit le menu « Mes jeux » dans la liste <ul id="games-menu">.
function buildGamesMenu() {
	const menu = document.getElementById("games-menu");

	if (!menu) {
		return;
	}

	const currentPageName = getCurrentPageName();
	// Depuis l'accueil, les pages des jeux sont dans html/ ; depuis une page de jeu, dans le même dossier.
	const pathPrefix = isInHtmlFolder() ? "" : "html/";

	GAMES.forEach(game => {
		const item = document.createElement("li");
		const label = game.upcoming ? game.display_name + " (à venir)" : game.display_name;

		if (game.page.replace(/\.html$/, "") === currentPageName) {
			// Page du jeu en cours : texte simple, signalé aux lecteurs d'écran.
			item.textContent = "Vous êtes ici : " + game.display_name;
			item.setAttribute("aria-current", "page");
		} else {
			const link = document.createElement("a");
			link.href = pathPrefix + game.page;
			link.textContent = label;
			item.appendChild(link);
		}

		menu.appendChild(item);
	});
}

// Compteur de visites GoatCounter.
function loadViewCounter() {
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
}

document.addEventListener("DOMContentLoaded", () => {
	buildGamesMenu();
	loadViewCounter();
});