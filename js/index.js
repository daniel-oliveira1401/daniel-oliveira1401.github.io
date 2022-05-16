//google translate functionality
function googleTranslateElementInit() {
	google.translate.TranslateElement(
		{ pageLanguage: "pt" },
		"google_translate_element"
	);
}

window.addEventListener("load", () => {
	//if the user language is not portuguese, default it to english
	if (navigator.language.split("-")[0] != "pt") {
		document.cookie = "googtrans=/pt/en;expires=session";
	} else {
		document.cookie = "googtrans=/pt/pt;expires=session";
	}
	googleTranslateElementInit();
});
