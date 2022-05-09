let projectsCount = 2;
let currentProject = 0;

$(".arrow-prev").click(() => {
	if (currentProject > 0) {
		currentProject--;
		$(".projects-container").css("left", `${100 * currentProject}%`);
		if (currentProject <= 0) {
			$(".arrow-prev").addClass("disabled");
		}
		$(".arrow-next").removeClass("disabled");
	}
});

$(".arrow-next").click(() => {
	if (currentProject < projectsCount - 1) {
		currentProject++;
		$(".projects-container").css("left", `-${100 * currentProject}%`);
		if (currentProject >= projectsCount - 1) {
			$(".arrow-next").addClass("disabled");
		}
		$(".arrow-prev").removeClass("disabled");
	}
});
