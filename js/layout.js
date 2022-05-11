//handles the svg animation and screen translation for horizontal navigation
let pos = {
	left: 0,
	top: 0
};

let screens = [
	{
		name: "home",
		pos: {
			top: 0,
			left: 0
		}
	},
	{
		name: "about",
		pos: {
			top: -200,
			left: 0
		}
	},
	{
		name: "knowledge",
		pos: {
			top: -200,
			left: -200
		}
	},
	{
		name: "projects",
		pos: {
			top: -200,
			left: -400
		}
	},
	{
		name: "contact",
		pos: {
			top: 0,
			left: -400
		}
	},
	{
		name: "info",
		pos: {
			top: 0,
			left: -200
		}
	}
];

let currentScreen = screens[0];

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

	//update the currentScreen variable
	let i = screens.findIndex((screen) => {
		return screen.pos.left == pos.left && screen.pos.top == pos.top;
	});

	currentScreen = screens[i];

	if (currentScreen.name == "projects") {
		//remove the transition from the main container after it occurs if the current screen if the projects screen. This has to be done so that the input fields of the embeded projects do not interfere with the main container's positioning.
		setTimeout(() => {
			mainContainer.css("transition", "none");
		}, 1000);
	} else {
		mainContainer.css("transition", "top 1s ease-in-out, left 1s ease-in-out");
	}

	mainContainer.css("top", `${pos.top}vh`);
	mainContainer.css("left", `${pos.left}vw`);
}

//updateMainContainer();
