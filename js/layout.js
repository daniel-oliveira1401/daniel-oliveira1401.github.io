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
	}, 10);

	initPages();
	initGuides();
	applyGuidesInitialState();
	setTimeout(() => {
		applyUrlSearchParamPage();
	}, 1000);
	$(".loading-overlay").fadeOut();
});

let mode = "prod"; //can be "prod" or "dev"

function updateMainContainer() {
	let mainContainer = $("#main-container");

	//update the currentScreen variable
	let i = screens.findIndex((screen) => {
		return screen.pos.left == pos.left && screen.pos.top == pos.top;
	});
	console.log("index", i);
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

/*

Goal: Allow user to navigate the page via url. Example:

Clicking in the link https://daniel-oliveira1401.github.io#projects or https://daniel-oliveira1401.github.io?page=projects  would take me directly to the projects page.

What is needed to achieve that:

- being able to activate the guides programatically

- each page should be aware of its guides

- the program has to know which guides it should activate for a given page

There will be 2 classes: Page and Guide. Each Page object will have a certain number of Guides.

Idea: create a sort of lookup table where each page stores the position that its guides need to be

Each Page object has their guideData objects. Each guideData object contains a Guide object, and a string which says what is the position of the guide that corresponds to it being in the page. This string can either be forward or backward. When creating the pages, we just need to look at the guides and then create this lookup table of directions for each page.

Each Guide will have a move() function which takes as parameter the direction, which can be "forward" or "backward".

Each Page will have a focus() function which will call move(direction) for every one of its Guides, which will cause every guide to move to that page, if it isn't already there.

Each page will also have a navigateTo(Page) function which will be used to navigate to the next/previous page. The goal of this function is to ensure that the next page that the user will visit will have all of its Guides in the right position. (focused). So, what this function will do is basically call the focus() method of the page object passed to it, and also set the body position of the page to move the "camera".

This navigateTo(Page) function has to be called when a guide is clicked.

When a guide is clicked, it has to call nagivateTo(Page) and pass the right page to the function. 

the page.focus() function will loop through the guides array and move the guides that have that page in them. Let's say we want to go to the home page. The home page has 2 guides associated with it. So we need to move those guides to the position (start or end) that corresponds to the home page. For that we can pass to the guide.move() function the page, and then the guide will check which end of itself is connected to that page, and move accordingly

*/

let guides = []; //initialized in initGuides()
let pages = []; //initialized in initPages()
function initGuides() {
	guides = [
		Guide(document.getElementById("transitionFrom00To02"), "home", "about"),
		Guide(
			document.getElementById("transitionFrom02To22"),
			"about",
			"knowledge"
		),
		Guide(
			document.getElementById("transitionFrom22To42"),
			"knowledge",
			"projects"
		),
		Guide(
			document.getElementById("transitionFrom40To42"),
			"contact",
			"projects"
		),
		Guide(document.getElementById("transitionFrom20To40"), "info", "contact"),
		Guide(document.getElementById("transitionFrom00To20"), "home", "info")
	];

	guides.forEach((guide) => {
		$(`#${guide.domElement.id} circle`).click((e) => {
			let guideElement = e.currentTarget.ownerSVGElement;
			console.log("clicked");
			//if the guide is at the start
			if (guideElement.classList.contains("start")) {
				//navigate to the page corresponding to guide.endPage
				let page = pages.find((page) => page.name == guide.endPage);
				navigateTo(page);
			} else if (guideElement.classList.contains("end")) {
				let page = pages.find((page) => page.name == guide.startPage);
				navigateTo(page);
			}
		});
	});
}

function initPages() {
	pages = [
		Page(
			"home",
			[
				{
					guide: Guide(
						document.getElementById("transitionFrom00To02"),
						"home",
						"about"
					),
					focusDirection: "start"
				},
				{
					guide: Guide(
						document.getElementById("transitionFrom00To20"),
						"home",
						"info"
					),
					focusDirection: "start"
				}
			],
			{
				x: 0,
				y: 0
			},
			document.querySelector(".page-home .content")
		),
		Page(
			"about",
			[
				{
					guide: Guide(
						document.getElementById("transitionFrom00To02"),
						"home",
						"about"
					),
					focusDirection: "end"
				},
				{
					guide: Guide(document.getElementById("transitionFrom02To22"), ""),
					focusDirection: "start"
				}
			],
			{
				x: 0,
				y: -200
			},
			document.querySelector(".page-about .content")
		),
		Page(
			"knowledge",
			[
				{
					guide: Guide(document.getElementById("transitionFrom02To22")),
					focusDirection: "end"
				},
				{
					guide: Guide(document.getElementById("transitionFrom22To42")),
					focusDirection: "start"
				}
			],
			{
				x: -200,
				y: -200
			},
			document.querySelector(".page-knowledge .content")
		),
		Page(
			"projects",
			[
				{
					guide: Guide(document.getElementById("transitionFrom22To42")),
					focusDirection: "end"
				},
				{
					guide: Guide(document.getElementById("transitionFrom40To42")),
					focusDirection: "end"
				}
			],
			{
				x: -400,
				y: -200
			},
			document.querySelector(".page-projects .content")
		),
		Page(
			"contact",
			[
				{
					guide: Guide(document.getElementById("transitionFrom40To42")),
					focusDirection: "start"
				},
				{
					guide: Guide(document.getElementById("transitionFrom20To40")),
					focusDirection: "end"
				}
			],
			{
				x: -400,
				y: 0
			},
			document.querySelector(".page-contact .content")
		),
		Page(
			"info",
			[
				{
					guide: Guide(document.getElementById("transitionFrom00To20")),
					focusDirection: "end"
				},
				{
					guide: Guide(document.getElementById("transitionFrom20To40")),
					focusDirection: "start"
				}
			],
			{
				x: -200,
				y: 0
			},
			document.querySelector(".page-info .content")
		)
	];
}

function Guide(domElement, startPage, endPage) {
	return {
		domElement,
		startPage,
		endPage,
		move(pageName) {
			if (pageName == startPage) {
				//check if the guide is at the end
				if (!domElement.classList.contains("start")) {
					//if so then send it to the start
					$(domElement).children(".animation-backwards")[0].beginElement();

					//update the guide status
					domElement.classList.remove("end");
					domElement.classList.add("start");
				}
			} else if (pageName == endPage) {
				//if the guide is at the start
				if (!domElement.classList.contains("end")) {
					//then send if to the end
					$(domElement).children(".animation-forwards")[0].beginElement();

					//update the guide status
					domElement.classList.remove("start");
					domElement.classList.add("end");
				}
			}
		}
	};
}

function applyGuidesInitialState() {
	guides.forEach((guide) => {
		//if the guide should be initialized at the end
		if (guide.domElement.classList.contains("end")) {
			//send it to the end
			$(guide.domElement).children(".animation-forwards")[0].beginElement();
		}
	});
}

function applyUrlSearchParamPage() {
	let stringURLParams = window.location.search;
	let params = new URLSearchParams(stringURLParams);
	let pageName = params.get("page");

	if (pageName) {
		let page = pages.find((page) => page.name == pageName);
		if (page) navigateTo(page);
	}
}

function Page(name, guidesData, pos, domElement) {
	return {
		name,
		domElement,
		pos: {
			x: pos.x,
			y: pos.y
		},
		guidesData,
		focus(scrollable) {
			//move the screen here
			let mainContainer = $("#main-container");
			mainContainer.css("top", `${this.pos.y}vh`);
			mainContainer.css("left", `${this.pos.x}vw`);

			$(".transition-overlay").addClass("active");

			setTimeout(() => {
				$(".transition-overlay").removeClass("active");
			}, 1000);
			//special cases
			if (scrollable) {
				setTimeout(() => {
					//this animation serves as a hint to the user that this section is scrollable

					$(domElement).animate({ scrollTop: 0 }, 500);
				}, 700);
			}
		}
	};
}

/*

goal: when a guide is clicked it should know which page to focus on

How to achieve that: add a listener to all guides. This listener will then grab the svg dom element from the event and search which guide that element belongs to. Then, the function will check the current position of the guide, and if it is at the end, then it will focus on guide.startPage. If the guide is at the start, it will focus on guide.endPage

*/

function navigateTo(page) {
	let scrollable = false;
	if (page.name == "about") {
		scrollable = aboutContentFirstScroll;
		aboutContentFirstScroll = false;
	}

	if (page.name == "knowledge") {
		scrollable = knowledgeContentFirstScroll;
		knowledgeContentFirstScroll = false;
	}

	page.focus(scrollable);

	let pageGuides = guides.filter((guide) => {
		return guide.startPage == page.name || guide.endPage == page.name;
	});

	pageGuides.forEach((pageGuide) => {
		pageGuide.move(page.name);
	});
}

// setTimeout(() => {
// 	navigateTo(pages.find((page) => page.name == "home"));
// }, 2000);

// setTimeout(() => {
// 	navigateTo(pages.find((page) => page.name == "knowledge"));
// }, 4000);

// setTimeout(() => {
// 	navigateTo(pages.find((page) => page.name == "info"));
// }, 6000);

// setTimeout(() => {
// 	navigateTo(pages.find((page) => page.name == "projects"));
// }, 8000);

// setTimeout(() => {
// 	navigateTo(pages.find((page) => page.name == "about"));
// }, 10000);

// setTimeout(() => {
// 	navigateTo(pages.find((page) => page.name == "contact"));
// }, 12000);
