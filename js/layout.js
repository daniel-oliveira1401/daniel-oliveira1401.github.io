//handles the svg animation and screen navigation inside the app
const TRANSITION_TIME = 1000;

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
	applyContentSizes();
	collapseAllContents();
	initNavBar();
	setTimeout(() => {
		applyUrlSearchParamPage();
	}, TRANSITION_TIME / 2);
	window.addEventListener("resize", () => {
		applyContentSizes();
	});
	hideProjectsContent();
	$(".loading-overlay").fadeOut();
});

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
			//if the guide is at the start
			if (guideElement.classList.contains("start")) {
				//navigate to the page corresponding to guide.endPage
				let page = pages.find((page) => page.name == guide.endPage);
				navigateTo(page, true);
			} else if (guideElement.classList.contains("end")) {
				let page = pages.find((page) => page.name == guide.startPage);
				navigateTo(page, true);
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

function initNavBar() {
	//click listener for the hamburguer icon
	$(".nav__hamburguer").click(() => {
		toggleNavbar();
	});

	//click listener for the backdrop
	$(".nav__backdrop").click(() => {
		toggleNavbar();
	});

	$(".nav .nav__option").click((e) => {
		let page = $(e.currentTarget).attr("data-page");
		toggleNavbar();
		setTimeout(() => {
			navigateTo(
				pages.find((pg) => pg.name == page),
				true
			);
		}, 400);
	});
}

function toggleNavbar() {
	$(".nav").toggleClass("expanded");
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

			//special cases
			if (scrollable) {
				setTimeout(() => {
					//this animation serves as a hint to the user that this section is scrollable

					$(domElement).animate({ scrollTop: 0 }, TRANSITION_TIME / 2);
				}, TRANSITION_TIME * 0.7);
			}
		},
		collapse() {
			let selector = `.page-${this.name} .content__body`;
			document.querySelector(selector)?.classList.add("collapsed");
		},
		expand() {
			let selector = `.page-${this.name} .content__body`;
			document.querySelector(selector)?.classList.remove("collapsed");
		}
	};
}

function updateURLSearchParameter(pageName) {
	let stringParams = window.location.search;
	let params = new URLSearchParams(stringParams);
	params.set("page", pageName);

	let url = window.location + "";

	//remove the current search params
	url = url.replace(`${window.location.search}`, "");

	//add the new ones
	url = url + "?" + params.toString();

	window.history.replaceState({}, document.title, url);
}

function hideProjectsContent() {
	$(".page-projects .content").fadeOut();
}

function showProjectsContent() {
	$(".page-projects .content").fadeIn();
}

function navigateTo(page, updateParam = false) {
	//collapse the pages, then do eveything else

	let scrollable = false;
	if (page.name == "about") {
		scrollable = aboutContentFirstScroll;
		aboutContentFirstScroll = false;
	}

	if (page.name == "knowledge") {
		scrollable = knowledgeContentFirstScroll;
		knowledgeContentFirstScroll = false;
	}

	if (page.name == "projects") {
		setTimeout(() => {
			showProjectsContent();
		}, TRANSITION_TIME);
	} else {
		setTimeout(() => {
			hideProjectsContent();
		}, TRANSITION_TIME);
	}

	page.focus(scrollable);
	setTimeout(() => {
		page.expand();
		collapseAllContents(page.name);
	}, TRANSITION_TIME);

	let pageGuides = guides.filter((guide) => {
		return guide.startPage == page.name || guide.endPage == page.name;
	});

	pageGuides.forEach((pageGuide) => {
		pageGuide.move(page.name);
	});
	if (updateParam) {
		updateURLSearchParameter(page.name);
	}
}

function applyContentSizes() {
	let contentBodies = document.querySelectorAll(".content__body");

	contentBodies.forEach((contentBody) => {
		contentBody.style.height = `${contentBody.scrollHeight}px`;
		contentBody.style.minHeight = `${contentBody.scrollHeight}px`;
	});
}

function collapseAllContents(exception) {
	pages.forEach((page) => {
		if (page.name != exception) {
			page.collapse();
		}
	});
}
