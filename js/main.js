import * as pulpMethods from "./pulpmodern.js";
import * as orbitMethods from "./orbits.js";

const methods = {
	...pulpMethods,
	...orbitMethods,
};

function $(selector) {
	const list = document.querySelectorAll(selector);
	if (list.length == 1) return list[0];
	else return list;
}

function $id(selector) {
	return document.getElementById(selector);
}

const dom = {
	scrollWrap: $id("scroll-wrap"),
	main: $("main"),
	scroller: $id("scroller"),
	toc: $id("toc"),
	pages: $("page"),
	activeBreadcrumb: null,
	activePage: null,
	nextChapter: $id("next-chapter"),
	previousChapter: $id("previous-chapter"),
};


// Full Screen API

document.getElementById("full-screen-button").addEventListener("click", (e) => {
	document.documentElement.requestFullscreen();
	document.body.classList.add("fullscreen");
});

document.documentElement.addEventListener("fullscreenchange", (e) => {
	if (document.fullscreenElement == null) document.body.classList.remove("fullscreen");
});

// Hamburger Menu

$id("hamburger").addEventListener("click", (e) => {
	if (document.body.classList.contains("toc-active")) {
		document.body.classList.remove("toc-active");
	} else {
		document.body.classList.add("toc-active");
		dom.activeBreadcrumb?.classList.remove("active");
		if (dom.activePage?.id) {
			dom.activeBreadcrumb = dom.toc.querySelector(
				`[data-id="${dom.activePage.dataset.id || dom.activePage.id}"]`
			);
			dom.activeBreadcrumb?.classList.add("active");
		}
	}
});

// Page Intersection Observer

const pageEvents = {
	enter: new Event("enter"),
	exit: new Event("exit"),
};

const enterPage = new IntersectionObserver(
	(elements, observer) => {
		elements.forEach((element) => {
			if (element.isIntersecting) {
				element.target.classList.add("active");
				dom.activePage = element.target;
				window.setTimeout(() => {
					if (element.target.classList.contains("active")) {
						if (element.target.id) window.location.hash = element.target.id;
						element.target.dispatchEvent(pageEvents.enter);
					}
				}, 1000);
			} else {
				element.target.classList.remove("active");
				element.target.dispatchEvent(pageEvents.exit);
			}
		});
	},
	{
		root: dom.scroller,
		rootMargin: "0px",
		threshold: 0.5,
	}
);

// This observer is used to determine which chapter (code, print, etc.) is being entered when the user scrolls vertically

const enterChapter = new IntersectionObserver(
	(elements, observer) => {
		elements.forEach((element) => {
			if (element.isIntersecting) {
				console.log(
					`Intersecting Ratio for ${element.target.title}: ${element.intersectionRatio}\nTop: ${element.intersectionRect.top}\nBottom: ${element.intersectionRect.bottom}`
				);
				// If scrolling upward, the top of the intersecting rect is 0
				// If scrolling downward, the top of the intersecting rect is greater than 0
				if (element.intersectionRatio < 0.5) {
					if (element.intersectionRect.top == 0) {
						dom.previousChapter.innerHTML = element.target.title;
						dom.previousChapter.classList.add("show");
					} else {
						dom.nextChapter.innerHTML = element.target.title;
						dom.nextChapter.classList.add("show");
					}
					// element.target.classList.add('entering');
				} else {
					dom.previousChapter.classList.remove("show");
					dom.nextChapter.classList.remove("show");
				}
				// else element.target.classList.remove('entering')
			}
			// } else element.target.classList.remove('entering')
		});
	},
	{
		root: dom.scroller,
		rootMargin: "0px",
		threshold: [0.1, 1],
	}
);

$("chapter").forEach((chapter) => enterChapter.observe(chapter));

	

// Observe Slides and create data structure for index

const siteIndex = {};
$('page').forEach((page) => {
	enterPage.observe(page);
	// If the data-index property is not present, return
	if (page.dataset.index == undefined || !page.dataset.category) return;
	siteIndex[page.dataset.category] = siteIndex[page.dataset.category] || {
		id: "",
		pages: [],
	};
	if (page.dataset.subcategory) siteIndex[page.dataset.category].pages.push(page);
	else siteIndex[page.dataset.category].id = page.id;
});

// Build Table of Contents

const tocContent = $id("toc-content");
const categories = Object.keys(siteIndex).sort();
let tocContentHTML = "";
categories.forEach((category) => {
	tocContentHTML += `<li><a data-id="${siteIndex[category].id}" href="#${siteIndex[category].id}">${category}</a>`;
	if (siteIndex[category].pages.length > 0) {
		tocContentHTML += "<ul>";
		siteIndex[category].pages.forEach((page) => {
			tocContentHTML += `<li><a data-id="${page.id}" href="#${page.id}">${page.dataset.subcategory}</a></li>`;
		});
		tocContentHTML += "</ul>";
	}
	tocContentHTML += "</li>";
});

tocContent.innerHTML = tocContentHTML;
dom.toc.addEventListener("click", (e) => {
	document.body.classList.remove("toc-active");
});

// Scan and assign page events

const pages = document.querySelectorAll("page");

pages.forEach((page) => {
	const enterMethod = page.getAttribute("@enter");
	const exitMethod = page.getAttribute("@exit");

	if (enterMethod && methods[enterMethod]) {
		page.addEventListener("enter", methods[enterMethod]);
	}

	if (exitMethod && methods[exitMethod]) {
		page.addEventListener("exit", methods[exitMethod]);
	}
});

// Fade in images when they are loaded by adding the loaded class
const images = document.querySelectorAll("figure img");
document.addEventListener(
	"load",
	(e) => {
		if (e.target.tagName !== "IMG") return;
		e.target.classList.add("loaded");
	},
	true
);

// Home

function loadStyles(filePath) {
	if (document.querySelector(`link[href="${filePath}"]`)) return;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = filePath;
	document.head.appendChild(link);
}

function generateRandomString(count) {
	let result = "";
	for (let i = 0; i < count; i++) {
		// Generate a random number from 0 to 25
		// Transform it into a character code from 65 to 90 (A to Z)
		// Or from 97 to 122 (a to z)
		// Depending on a 50/50 coin flip
		result += String.fromCharCode(
			Math.floor(Math.random() * 26) + (Math.random() < 0.5 ? 65 : 97)
		);
	}
	return result;
}

$id("backdrop").innerHTML = `<div>${generateRandomString(400)}</div>
				<div>${generateRandomString(400)}</div>
				<div>${generateRandomString(400)}</div>`;
