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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ \"./js/layout.js\");\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_layout__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _page_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-home */ \"./js/page-home.js\");\n/* harmony import */ var _page_home__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_page_home__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _page_about__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-about */ \"./js/page-about.js\");\n/* harmony import */ var _page_about__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_page_about__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _page_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-info */ \"./js/page-info.js\");\n/* harmony import */ var _page_info__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_page_info__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _page_knowledge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-knowledge */ \"./js/page-knowledge.js\");\n/* harmony import */ var _page_knowledge__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_page_knowledge__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _page_projects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-projects */ \"./js/page-projects.js\");\n/* harmony import */ var _page_projects__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_page_projects__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _page_contact__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-contact */ \"./js/page-contact.js\");\n/* harmony import */ var _page_contact__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_page_contact__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _sass_style_sass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sass/style.sass */ \"./sass/style.sass\");\n//google translate functionality\n\n\n\n\n\n\n\n\nconsole.log(\"hello world\");\n\nfunction googleTranslateElementInit() {\n  google.translate.TranslateElement({\n    pageLanguage: \"pt\"\n  }, \"google_translate_element\");\n}\n\nwindow.addEventListener(\"load\", function () {\n  //if the user language is not portuguese, default it to english\n  if (navigator.language.split(\"-\")[0] != \"pt\") {\n    document.cookie = \"googtrans=/pt/en;expires=session\";\n  } else {\n    document.cookie = \"googtrans=/pt/pt;expires=session\";\n  }\n\n  googleTranslateElementInit();\n});\n\n//# sourceURL=webpack://web-page/./js/index.js?");

/***/ }),

/***/ "./js/layout.js":
/*!**********************!*\
  !*** ./js/layout.js ***!
  \**********************/
/***/ (() => {

eval("//handles the svg animation and screen translation for horizontal navigation\nvar aboutContent,\n    //the .content element of the about page\naboutContentFirstScroll = true,\n    //flag for the first time the about page scrolls\nknowledgeContent,\n    //the .content element of the knowledge page\nknowledgeContentFirstScroll = true; //flag for the first time the knowledge page scrolls\n\n$(window).on(\"load\", function () {\n  //reset the scroll position when window loads\n  setTimeout(function () {\n    window.scrollTo(0, 0);\n    aboutContent = $(\".page-about .content\");\n    knowledgeContent = $(\".page-knowledge .content\"); //scroll down to a portion of the page so that the scroll up animation can play\n    //when the user first enters one ofthe two scrollable sections\n\n    aboutContent[0].scrollTo(0, aboutContent[0].scrollHeight / 4);\n    knowledgeContent[0].scrollTo(0, knowledgeContent[0].scrollHeight / 6);\n    updateMainContainer();\n  }, 10);\n  $(\".loading-overlay\").fadeOut();\n});\nvar pos = {\n  left: 0,\n  top: 0\n};\nvar screens = [{\n  name: \"home\",\n  pos: {\n    top: 0,\n    left: 0\n  }\n}, {\n  name: \"about\",\n  pos: {\n    top: -200,\n    left: 0\n  }\n}, {\n  name: \"knowledge\",\n  pos: {\n    top: -200,\n    left: -200\n  }\n}, {\n  name: \"projects\",\n  pos: {\n    top: -200,\n    left: -400\n  }\n}, {\n  name: \"contact\",\n  pos: {\n    top: 0,\n    left: -400\n  }\n}, {\n  name: \"info\",\n  pos: {\n    top: 0,\n    left: -200\n  }\n}];\nvar currentScreen = screens[0];\nvar pageDistance = 200; //200 vw or vh from one page to another\n\nvar mode = \"prod\"; //can be \"prod\" or \"dev\"\n\nfunction toggleHorizontalAnimation(e, svg) {\n  if (svg.classList.toggle(\"forwards\")) {\n    $(svg).children(\".animation-forwards\")[0].beginElement();\n    pos.left += -pageDistance;\n  } else {\n    $(svg).children(\".animation-backwards\")[0].beginElement();\n    pos.left += pageDistance;\n  }\n\n  if (mode == \"prod\") updateMainContainer();\n}\n\nfunction toggleVerticalAnimation(e, svg) {\n  if (svg.classList.toggle(\"forwards\")) {\n    $(svg).children(\".animation-forwards\")[0].beginElement();\n    pos.top += -pageDistance;\n  } else {\n    $(svg).children(\".animation-backwards\")[0].beginElement();\n    pos.top += pageDistance;\n  }\n\n  if (mode == \"prod\") updateMainContainer();\n}\n\n$(\".horizontal-transition circle\").click(function (e) {\n  var svg = e.currentTarget.ownerSVGElement;\n  toggleHorizontalAnimation(e, svg);\n}); //handles the svg animation and screen translation for vertical navigation\n\n$(\".vertical-transition circle\").click(function (e) {\n  var svg = e.currentTarget.ownerSVGElement;\n  toggleVerticalAnimation(e, svg);\n}); //sets the initial states for the svg translation animations\n\n$(\".transition.forwards\").children(\".animation-forwards\").toArray().forEach(function (e) {\n  e.beginElement();\n});\n\nfunction updateMainContainer() {\n  var mainContainer = $(\"#main-container\"); //update the currentScreen variable\n\n  var i = screens.findIndex(function (screen) {\n    return screen.pos.left == pos.left && screen.pos.top == pos.top;\n  });\n  currentScreen = screens[i];\n\n  if (currentScreen.name == \"projects\") {\n    //remove the transition from the main container after it occurs if the current screen is the projects screen. This has to be done so that the input fields of the embeded projects do not interfere with the main container's positioning.\n    setTimeout(function () {\n      mainContainer.css(\"transition\", \"none\");\n    }, 1000);\n  } else {\n    if (mainContainer.css(\"transition\").includes(\"none\")) {\n      mainContainer.css(\"transition\", \"top 1s ease-in-out, left 1s ease-in-out\");\n    }\n  }\n\n  if (currentScreen.name == \"about\") {\n    if (aboutContentFirstScroll) {\n      setTimeout(function () {\n        //this animation serves as a hint to the user that this section is scrollable\n        aboutContent.animate({\n          scrollTop: 0\n        }, 500);\n      }, 700);\n      aboutContentFirstScroll = false;\n    }\n  }\n\n  if (currentScreen.name == \"knowledge\") {\n    if (knowledgeContentFirstScroll) {\n      setTimeout(function () {\n        //this animation serves as a hint to the user that this section is scrollable\n        knowledgeContent.animate({\n          scrollTop: 0\n        }, 500);\n      }, 700);\n      knowledgeContentFirstScroll = false;\n    }\n  }\n\n  mainContainer.css(\"top\", \"\".concat(pos.top, \"vh\"));\n  mainContainer.css(\"left\", \"\".concat(pos.left, \"vw\"));\n}\n\n//# sourceURL=webpack://web-page/./js/layout.js?");

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

eval("var projectsCount = 2;\nvar currentProject = 0;\n$(\".arrow-prev\").click(function () {\n  if (currentProject > 0) {\n    currentProject--;\n    $(\".projects-container\").css(\"left\", \"\".concat(100 * currentProject, \"%\"));\n\n    if (currentProject <= 0) {\n      $(\".arrow-prev\").addClass(\"disabled\");\n    }\n\n    $(\".arrow-next\").removeClass(\"disabled\");\n  }\n});\n$(\".arrow-next\").click(function () {\n  if (currentProject < projectsCount - 1) {\n    currentProject++;\n    $(\".projects-container\").css(\"left\", \"-\".concat(100 * currentProject, \"%\"));\n\n    if (currentProject >= projectsCount - 1) {\n      $(\".arrow-next\").addClass(\"disabled\");\n    }\n\n    $(\".arrow-prev\").removeClass(\"disabled\");\n  }\n});\n$(\"#btn-see-projects\").click(function () {\n  $(\".page-projects .content__overlay\").fadeOut();\n}); //the href attribute of the anchor elements <a> need to be removed from the embeded\n//projects so that the page won't jump to the top after the user clicks a button\n\n$(\"iframe\").on(\"load\", function () {\n  $(\"iframe\").contents().find(\"a\").removeAttr(\"href\");\n});\n\n//# sourceURL=webpack://web-page/./js/page-projects.js?");

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