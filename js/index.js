//google translate functionality
function googleTranslateElementInit() {
	google.translate.TranslateElement(
		{ pageLanguage: "pt" },
		"google_translate_element"
	);
	navigator.language = "";
}

window.addEventListener("load", () => {
	googleTranslateElementInit();
});
