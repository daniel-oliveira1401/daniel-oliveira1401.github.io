let projectsCount = 3;
let currentProject = 0;

$(".arrow-prev").click(() => {
	if (currentProject > 0) {
		currentProject--;
		$(".projects-container").css("left", `-${100 * currentProject}%`);
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

$("#btn-see-projects").click(() => {
	$(".page-projects .content__overlay").fadeOut();
});

//the href attribute of the anchor elements <a> need to be removed from the embeded
//projects so that the page won't jump to the top after the user clicks a button
$("iframe").on("load", () => {
	$("iframe").contents().find("a").removeAttr("href");
});
