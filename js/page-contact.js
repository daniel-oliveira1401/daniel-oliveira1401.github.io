$("#copy-email").on("click", () => {
	navigator?.clipboard?.writeText("daniel.oliveira1401@outlook.com");

	$(".contact-field .email-feedback").fadeIn();
	setTimeout(() => {
		$(".contact-field .email-feedback").fadeOut();
	}, 1000);
});
