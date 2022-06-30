//handles the svg animation and screen translation for horizontal navigation

let aboutContent, //the .content element of the about page
	aboutContentFirstScroll = true, //flag for the first time the about page scrolls
	knowledgeContent, //the .content element of the knowledge page
	knowledgeContentFirstScroll = true; //flag for the first time the knowledge page scrolls

$(window).on("load", () => {
	//reset the scroll position when window loads
	setTimeout(() => {
		window.scrollTo(0, 0);
		aboutContent = $(".page-about .content");
		knowledgeContent = $(".page-knowledge .content");

		//scroll down to a portion of the page so that the scroll up animation can play
		//when the user first enters one ofthe two scrollable sections
		aboutContent[0].scrollTo(0, aboutContent[0].scrollHeight / 4);
		knowledgeContent[0].scrollTo(0, knowledgeContent[0].scrollHeight / 6);

		updateMainContainer();
	}, 10);

	$(".loading-overlay").fadeOut();
});

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
		//remove the transition from the main container after it occurs if the current screen is the projects screen. This has to be done so that the input fields of the embeded projects do not interfere with the main container's positioning.
		setTimeout(() => {
			mainContainer.css("transition", "none");
		}, 1000);
	} else {
		if (mainContainer.css("transition").includes("none")) {
			mainContainer.css(
				"transition",
				"top 1s ease-in-out, left 1s ease-in-out"
			);
		}
	}

	if (currentScreen.name == "about") {
		if (aboutContentFirstScroll) {
			setTimeout(() => {
				//this animation serves as a hint to the user that this section is scrollable
				aboutContent.animate({ scrollTop: 0 }, 500);
			}, 700);

			aboutContentFirstScroll = false;
		}
	}

	if (currentScreen.name == "knowledge") {
		if (knowledgeContentFirstScroll) {
			setTimeout(() => {
				//this animation serves as a hint to the user that this section is scrollable
				knowledgeContent.animate({ scrollTop: 0 }, 500);
			}, 700);
			knowledgeContentFirstScroll = false;
		}
	}

	mainContainer.css("top", `${pos.top}vh`);
	mainContainer.css("left", `${pos.left}vw`);
}
