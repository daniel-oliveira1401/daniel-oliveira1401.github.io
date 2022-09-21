/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ \"./js/layout.js\");\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_layout__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _page_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-home */ \"./js/page-home.js\");\n/* harmony import */ var _page_home__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_page_home__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _page_about__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-about */ \"./js/page-about.js\");\n/* harmony import */ var _page_about__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_page_about__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _page_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-info */ \"./js/page-info.js\");\n/* harmony import */ var _page_info__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_page_info__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _page_knowledge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-knowledge */ \"./js/page-knowledge.js\");\n/* harmony import */ var _page_knowledge__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_page_knowledge__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _page_projects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-projects */ \"./js/page-projects.js\");\n/* harmony import */ var _page_projects__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_page_projects__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _page_contact__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-contact */ \"./js/page-contact.js\");\n/* harmony import */ var _page_contact__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_page_contact__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _sass_style_sass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sass/style.sass */ \"./sass/style.sass\");\n//google translate functionality\n\n\n\n\n\n\n\n\n\nfunction googleTranslateElementInit() {\n  google.translate.TranslateElement({\n    pageLanguage: \"pt\"\n  }, \"google_translate_element\");\n}\n\nwindow.addEventListener(\"load\", function () {\n  //if the user language is not portuguese, default it to english\n  if (navigator.language.split(\"-\")[0] != \"pt\") {\n    document.cookie = \"googtrans=/pt/en;expires=session\";\n  } else {\n    document.cookie = \"googtrans=/pt/pt;expires=session\";\n  }\n\n  googleTranslateElementInit();\n});\n\n//# sourceURL=webpack://web-page/./js/index.js?");

/***/ }),

/***/ "./js/layout.js":
/*!**********************!*\
  !*** ./js/layout.js ***!
  \**********************/
/***/ (() => {

eval("//handles the svg animation and screen navigation inside the app\nvar TRANSITION_TIME = 1000;\nvar aboutContent,\n    //the .content element of the about page\naboutContentFirstScroll = true,\n    //flag for the first time the about page scrolls\nknowledgeContent,\n    //the .content element of the knowledge page\nknowledgeContentFirstScroll = true; //flag for the first time the knowledge page scrolls\n\n$(window).on(\"load\", function () {\n  //reset the scroll position when window loads\n  setTimeout(function () {\n    window.scrollTo(0, 0);\n    aboutContent = $(\".page-about .content\");\n    knowledgeContent = $(\".page-knowledge .content\"); //scroll down to a portion of the page so that the scroll up animation can play\n    //when the user first enters one ofthe two scrollable sections\n\n    aboutContent[0].scrollTo(0, aboutContent[0].scrollHeight / 4);\n    knowledgeContent[0].scrollTo(0, knowledgeContent[0].scrollHeight / 6);\n  }, 10);\n  initPages();\n  initGuides();\n  applyGuidesInitialState();\n  applyContentSizes();\n  collapseAllContents();\n  initNavBar();\n  setTimeout(function () {\n    applyUrlSearchParamPage();\n  }, TRANSITION_TIME / 2);\n  window.addEventListener(\"resize\", function () {\n    applyContentSizes();\n  });\n  hideProjectsContent();\n  $(\".loading-overlay\").fadeOut();\n});\nvar guides = []; //initialized in initGuides()\n\nvar pages = []; //initialized in initPages()\n\nfunction initGuides() {\n  guides = [Guide(document.getElementById(\"transitionFrom00To02\"), \"home\", \"about\"), Guide(document.getElementById(\"transitionFrom02To22\"), \"about\", \"knowledge\"), Guide(document.getElementById(\"transitionFrom22To42\"), \"knowledge\", \"projects\"), Guide(document.getElementById(\"transitionFrom40To42\"), \"contact\", \"projects\"), Guide(document.getElementById(\"transitionFrom20To40\"), \"info\", \"contact\"), Guide(document.getElementById(\"transitionFrom00To20\"), \"home\", \"info\")];\n  guides.forEach(function (guide) {\n    $(\"#\".concat(guide.domElement.id, \" circle\")).click(function (e) {\n      var guideElement = e.currentTarget.ownerSVGElement; //if the guide is at the start\n\n      if (guideElement.classList.contains(\"start\")) {\n        //navigate to the page corresponding to guide.endPage\n        var page = pages.find(function (page) {\n          return page.name == guide.endPage;\n        });\n        navigateTo(page, true);\n      } else if (guideElement.classList.contains(\"end\")) {\n        var _page = pages.find(function (page) {\n          return page.name == guide.startPage;\n        });\n\n        navigateTo(_page, true);\n      }\n    });\n  });\n}\n\nfunction initPages() {\n  pages = [Page(\"home\", [{\n    guide: Guide(document.getElementById(\"transitionFrom00To02\"), \"home\", \"about\"),\n    focusDirection: \"start\"\n  }, {\n    guide: Guide(document.getElementById(\"transitionFrom00To20\"), \"home\", \"info\"),\n    focusDirection: \"start\"\n  }], {\n    x: 0,\n    y: 0\n  }, document.querySelector(\".page-home .content\")), Page(\"about\", [{\n    guide: Guide(document.getElementById(\"transitionFrom00To02\"), \"home\", \"about\"),\n    focusDirection: \"end\"\n  }, {\n    guide: Guide(document.getElementById(\"transitionFrom02To22\"), \"\"),\n    focusDirection: \"start\"\n  }], {\n    x: 0,\n    y: -200\n  }, document.querySelector(\".page-about .content\")), Page(\"knowledge\", [{\n    guide: Guide(document.getElementById(\"transitionFrom02To22\")),\n    focusDirection: \"end\"\n  }, {\n    guide: Guide(document.getElementById(\"transitionFrom22To42\")),\n    focusDirection: \"start\"\n  }], {\n    x: -200,\n    y: -200\n  }, document.querySelector(\".page-knowledge .content\")), Page(\"projects\", [{\n    guide: Guide(document.getElementById(\"transitionFrom22To42\")),\n    focusDirection: \"end\"\n  }, {\n    guide: Guide(document.getElementById(\"transitionFrom40To42\")),\n    focusDirection: \"end\"\n  }], {\n    x: -400,\n    y: -200\n  }, document.querySelector(\".page-projects .content\")), Page(\"contact\", [{\n    guide: Guide(document.getElementById(\"transitionFrom40To42\")),\n    focusDirection: \"start\"\n  }, {\n    guide: Guide(document.getElementById(\"transitionFrom20To40\")),\n    focusDirection: \"end\"\n  }], {\n    x: -400,\n    y: 0\n  }, document.querySelector(\".page-contact .content\")), Page(\"info\", [{\n    guide: Guide(document.getElementById(\"transitionFrom00To20\")),\n    focusDirection: \"end\"\n  }, {\n    guide: Guide(document.getElementById(\"transitionFrom20To40\")),\n    focusDirection: \"start\"\n  }], {\n    x: -200,\n    y: 0\n  }, document.querySelector(\".page-info .content\"))];\n}\n\nfunction initNavBar() {\n  //click listener for the hamburguer icon\n  $(\".nav__hamburguer\").click(function () {\n    toggleNavbar();\n  }); //click listener for the backdrop\n\n  $(\".nav__backdrop\").click(function () {\n    toggleNavbar();\n  });\n  $(\".nav .nav__option\").click(function (e) {\n    var page = $(e.currentTarget).attr(\"data-page\");\n    toggleNavbar();\n    setTimeout(function () {\n      navigateTo(pages.find(function (pg) {\n        return pg.name == page;\n      }), true);\n    }, 400);\n  });\n}\n\nfunction toggleNavbar() {\n  $(\".nav\").toggleClass(\"expanded\");\n}\n\nfunction Guide(domElement, startPage, endPage) {\n  return {\n    domElement: domElement,\n    startPage: startPage,\n    endPage: endPage,\n    move: function move(pageName) {\n      if (pageName == startPage) {\n        //check if the guide is at the end\n        if (!domElement.classList.contains(\"start\")) {\n          //if so then send it to the start\n          $(domElement).children(\".animation-backwards\")[0].beginElement(); //update the guide status\n\n          domElement.classList.remove(\"end\");\n          domElement.classList.add(\"start\");\n        }\n      } else if (pageName == endPage) {\n        //if the guide is at the start\n        if (!domElement.classList.contains(\"end\")) {\n          //then send if to the end\n          $(domElement).children(\".animation-forwards\")[0].beginElement(); //update the guide status\n\n          domElement.classList.remove(\"start\");\n          domElement.classList.add(\"end\");\n        }\n      }\n    }\n  };\n}\n\nfunction applyGuidesInitialState() {\n  guides.forEach(function (guide) {\n    //if the guide should be initialized at the end\n    if (guide.domElement.classList.contains(\"end\")) {\n      //send it to the end\n      $(guide.domElement).children(\".animation-forwards\")[0].beginElement();\n    }\n  });\n}\n\nfunction applyUrlSearchParamPage() {\n  var stringURLParams = window.location.search;\n  var params = new URLSearchParams(stringURLParams);\n  var pageName = params.get(\"page\");\n\n  if (pageName) {\n    var page = pages.find(function (page) {\n      return page.name == pageName;\n    });\n    if (page) navigateTo(page);\n  }\n}\n\nfunction Page(name, guidesData, pos, domElement) {\n  return {\n    name: name,\n    domElement: domElement,\n    pos: {\n      x: pos.x,\n      y: pos.y\n    },\n    guidesData: guidesData,\n    focus: function focus(scrollable) {\n      //move the screen here\n      var mainContainer = $(\"#main-container\");\n      mainContainer.css(\"top\", \"\".concat(this.pos.y, \"vh\"));\n      mainContainer.css(\"left\", \"\".concat(this.pos.x, \"vw\")); //special cases\n\n      if (scrollable) {\n        setTimeout(function () {\n          //this animation serves as a hint to the user that this section is scrollable\n          $(domElement).animate({\n            scrollTop: 0\n          }, TRANSITION_TIME / 2);\n        }, TRANSITION_TIME * 0.7);\n      }\n    },\n    collapse: function collapse() {\n      var _document$querySelect;\n\n      var selector = \".page-\".concat(this.name, \" .content__body\");\n      (_document$querySelect = document.querySelector(selector)) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.classList.add(\"collapsed\");\n    },\n    expand: function expand() {\n      var _document$querySelect2;\n\n      var selector = \".page-\".concat(this.name, \" .content__body\");\n      (_document$querySelect2 = document.querySelector(selector)) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.classList.remove(\"collapsed\");\n    }\n  };\n}\n\nfunction updateURLSearchParameter(pageName) {\n  var stringParams = window.location.search;\n  var params = new URLSearchParams(stringParams);\n  params.set(\"page\", pageName);\n  var url = window.location + \"\"; //remove the current search params\n\n  url = url.replace(\"\".concat(window.location.search), \"\"); //add the new ones\n\n  url = url + \"?\" + params.toString();\n  window.history.replaceState({}, document.title, url);\n}\n\nfunction hideProjectsContent() {\n  $(\".page-projects .content\").fadeOut();\n}\n\nfunction showProjectsContent() {\n  $(\".page-projects .content\").fadeIn();\n}\n\nfunction navigateTo(page) {\n  var updateParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  //collapse the pages, then do eveything else\n  var scrollable = false;\n\n  if (page.name == \"about\") {\n    scrollable = aboutContentFirstScroll;\n    aboutContentFirstScroll = false;\n  }\n\n  if (page.name == \"knowledge\") {\n    scrollable = knowledgeContentFirstScroll;\n    knowledgeContentFirstScroll = false;\n  }\n\n  if (page.name == \"projects\") {\n    setTimeout(function () {\n      showProjectsContent();\n    }, TRANSITION_TIME * 0.8);\n  } else {\n    setTimeout(function () {\n      hideProjectsContent();\n    }, TRANSITION_TIME);\n  }\n\n  page.focus(scrollable);\n  setTimeout(function () {\n    page.expand();\n    collapseAllContents(page.name);\n  }, TRANSITION_TIME);\n  var pageGuides = guides.filter(function (guide) {\n    return guide.startPage == page.name || guide.endPage == page.name;\n  });\n  pageGuides.forEach(function (pageGuide) {\n    pageGuide.move(page.name);\n  });\n\n  if (updateParam) {\n    updateURLSearchParameter(page.name);\n  }\n}\n\nfunction applyContentSizes() {\n  var contentBodies = document.querySelectorAll(\".content__body\");\n  contentBodies.forEach(function (contentBody) {\n    contentBody.style.height = \"\".concat(contentBody.scrollHeight, \"px\");\n    contentBody.style.minHeight = \"\".concat(contentBody.scrollHeight, \"px\");\n  });\n}\n\nfunction collapseAllContents(exception) {\n  pages.forEach(function (page) {\n    if (page.name != exception) {\n      page.collapse();\n    }\n  });\n}\n\n//# sourceURL=webpack://web-page/./js/layout.js?");

/***/ }),

/***/ "./js/page-about.js":
/*!**************************!*\
  !*** ./js/page-about.js ***!
  \**************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://web-page/./js/page-about.js?");

/***/ }),

/***/ "./js/page-contact.js":
/*!****************************!*\
  !*** ./js/page-contact.js ***!
  \****************************/
/***/ (() => {

eval("$(\"#copy-email\").on(\"click\", function () {\n  var _navigator, _navigator$clipboard;\n\n  (_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$clipboard = _navigator.clipboard) === null || _navigator$clipboard === void 0 ? void 0 : _navigator$clipboard.writeText(\"daniel.oliveira1401@outlook.com\");\n  $(\".contact-field .email-feedback\").fadeIn();\n  setTimeout(function () {\n    $(\".contact-field .email-feedback\").fadeOut();\n  }, 1000);\n});\n\n//# sourceURL=webpack://web-page/./js/page-contact.js?");

/***/ }),

/***/ "./js/page-home.js":
/*!*************************!*\
  !*** ./js/page-home.js ***!
  \*************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://web-page/./js/page-home.js?");

/***/ }),

/***/ "./js/page-info.js":
/*!*************************!*\
  !*** ./js/page-info.js ***!
  \*************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://web-page/./js/page-info.js?");

/***/ }),

/***/ "./js/page-knowledge.js":
/*!******************************!*\
  !*** ./js/page-knowledge.js ***!
  \******************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://web-page/./js/page-knowledge.js?");

/***/ }),

/***/ "./js/page-projects.js":
/*!*****************************!*\
  !*** ./js/page-projects.js ***!
  \*****************************/
/***/ (() => {

eval("var projectsCount = 3;\nvar currentProject = 0;\n$(\".arrow-prev\").click(function () {\n  if (currentProject > 0) {\n    currentProject--;\n    $(\".projects-container\").css(\"left\", \"-\".concat(100 * currentProject, \"%\"));\n\n    if (currentProject <= 0) {\n      $(\".arrow-prev\").addClass(\"disabled\");\n    }\n\n    $(\".arrow-next\").removeClass(\"disabled\");\n  }\n});\n$(\".arrow-next\").click(function () {\n  if (currentProject < projectsCount - 1) {\n    currentProject++;\n    $(\".projects-container\").css(\"left\", \"-\".concat(100 * currentProject, \"%\"));\n\n    if (currentProject >= projectsCount - 1) {\n      $(\".arrow-next\").addClass(\"disabled\");\n    }\n\n    $(\".arrow-prev\").removeClass(\"disabled\");\n  }\n});\n$(\"#btn-see-projects\").click(function () {\n  $(\".page-projects .content__overlay\").fadeOut();\n}); //the href attribute of the anchor elements <a> need to be removed from the embeded\n//projects so that the page won't jump to the top after the user clicks a button\n\n$(\"iframe\").on(\"load\", function () {\n  $(\"iframe\").contents().find(\"a\").removeAttr(\"href\");\n});\n\n//# sourceURL=webpack://web-page/./js/page-projects.js?");

/***/ }),

/***/ "./sass/style.sass":
/*!*************************!*\
  !*** ./sass/style.sass ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://web-page/./sass/style.sass?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;