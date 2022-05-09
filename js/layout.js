//handles the svg animation and screen translation for horizontal navigation
let pos = {
	left: 0,
	top: 0
};

let pageDistance = 200; //200 vw or vh from one page to another

let mode = "prod"; //can be "prod" or "dev"

function toggleHorizontalAnimation(e, svg) {
	if (svg.classList.toggle("forwards")) {
		$(svg).children(".animation-forwards")[0].beginElement();
		pos.left += -pageDistance;
	} else {
		$(svg).children(".animation-backwards")[0].beginElement();
		pos.left += pageDistance;
	}
	if (mode == "prod") updateMainContainer();
}

function toggleVerticalAnimation(e, svg) {
	if (svg.classList.toggle("forwards")) {
		$(svg).children(".animation-forwards")[0].beginElement();
		pos.top += -pageDistance;
	} else {
		$(svg).children(".animation-backwards")[0].beginElement();
		pos.top += pageDistance;
	}
	if (mode == "prod") updateMainContainer();
}

$(".horizontal-transition circle").click((e) => {
	let svg = e.currentTarget.ownerSVGElement;
	toggleHorizontalAnimation(e, svg);
});

//handles the svg animation and screen translation for vertical navigation
$(".vertical-transition circle").click((e) => {
	let svg = e.currentTarget.ownerSVGElement;
	toggleVerticalAnimation(e, svg);
});

//sets the initial states for the svg translation animations
$(".transition.forwards")
	.children(".animation-forwards")
	.toArray()
	.forEach((e) => {
		e.beginElement();
	});

function updateMainContainer() {
	let mainContainer = $("#main-container");
	mainContainer.css("top", `${pos.top}vh`);
	mainContainer.css("left", `${pos.left}vw`);
}
