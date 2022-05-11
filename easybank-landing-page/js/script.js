const btnHamburguer = document.querySelector("[data-hamburguer]");

const header = document.querySelector(".header");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
btnHamburguer.addEventListener("click", () => {
	if (header.classList.toggle("open")) {
		overlay.classList.add("fade-in");
		overlay.classList.remove("fade-out");
		body.classList.add("noscroll");
	} else {
		overlay.classList.remove("fade-in");
		overlay.classList.add("fade-out");
		body.classList.remove("noscroll");
	}
});
