$("#copy-email").click(() => {
	navigator.clipboard.writeText("daniel.oliveira1401@outlook.com");
	$(".contact-field .email-feedback").fadeIn();
});
