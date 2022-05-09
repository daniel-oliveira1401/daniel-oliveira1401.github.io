//variaveis da secao "resumo"
let btnVerMais = $("#btn-see-more");
let resumoConteudo = $("#abstract__content");
let resumoExpandido = false;

// funcionalidade de expandir/colapsar da secao "resumo"
$("#abstract").click(() => {
	if (resumoExpandido) {
		//colapsa o resumo e mostra o "ver mais"
		resumoConteudo.css("height", "115px");
		btnVerMais.css("display", "block");
	} else {
		//expande o resumo e esconde o "ver mais"
		resumoConteudo.css("height", `${resumoConteudo[0].scrollHeight}px`);
		btnVerMais.css("display", "none");
	}
	resumoExpandido = !resumoExpandido;
});

function registrarEventosBootstrap() {
	//limpar qualquer listener que ja esteja registrado para esses eventos
	//para evitar listeners duplicados caso essa funcao seja chamada mais
	//de uma vez
	$(".collapse").unbind("show.bs.collapse");
	$(".collapse").unbind("hide.bs.collapse");

	//evento gerado pelo bootstrap ao expandir as respostas de uma pergunta
	$(".collapse").on("show.bs.collapse", (e) => {
		//✨ magia jquery ✨

		//(retorna o elemento que corresponde a pergunta que teve as respostas expandidas)
		let pergunta = $(e.target).parent(".question")[0];

		//(expande o corpo da pergunta junto)
		let corpoPergunta = $(pergunta).find(".question-body");
		$(corpoPergunta).addClass("question-body-expanded");
	});

	//evento gerado pelo bootstrap ao colapsar as respostas de uma pergunta
	$(".collapse").on("hide.bs.collapse", (e) => {
		//✨ magia jquery ✨

		//(retorna o elemento que corresponde a pergunta que teve as respostas colapsadas)
		let pergunta = $(e.target).parent(".question")[0];

		//(colapsa o corpo da pergunta junto)
		let corpoPergunta = $(pergunta).find(".question-body");
		$(corpoPergunta).removeClass("question-body-expanded");
	});
}

registrarEventosBootstrap();
