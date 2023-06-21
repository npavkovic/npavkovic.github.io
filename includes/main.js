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
	scroller: $id("scroller")
  };
  
//   dom.scrollWrap.scrollIntoView();
  
  document.getElementById("full-screen-button").addEventListener("click", (e) => {
	document.documentElement.requestFullscreen();
	document.body.classList.add("fullscreen");
  });
  
  document.documentElement.addEventListener("fullscreenchange", (e) => {
	if (document.fullscreenElement == null)
	  document.body.classList.remove("fullscreen");
  });
  
  // Menu Indicator
  
  // $("#menu-control").addEventListener("click", (e) => {
  //   const destination = document.body.classList.contains("menu-active")
  //     ? dom.scrollWrap
  //     : dom.menu;
  //   destination.scrollIntoView({
  //     behavior: "smooth"
  //   });
  // });
  
  //   const menuActive = new IntersectionObserver(
  //     (elements, observer) => {
  //       elements.forEach((element) => {
  //         document.body.classList.toggle("menu-active", element.isIntersecting);
  //       });
  //     },
  //     {
  //       root: dom.main,
  //       rootMargin: "0px",
  //       threshold: 0.5
  //     }
  //   );
  
  //   menuActive.observe(dom.menu);
  
  // Slide Intersection Observer
  
  const slideEvents = {
	enter: new Event("enter"),
	exit: new Event("exit")
  };
  
  const enterSlide = new IntersectionObserver(
	(elements, observer) => {
	  elements.forEach((element) => {
		if (element.isIntersecting) {
		  element.target.classList.add("active");
		  if (element.target.id) window.location.hash = element.target.id;
		  window.setTimeout(() => {
			if (element.target.classList.contains("active"))
			  element.target.dispatchEvent(slideEvents.enter);
		  }, 2000);
		} else {
		  element.target.classList.remove("active");
		  element.target.dispatchEvent(slideEvents.exit);
		}
	  });
	},
	{
	  root: dom.scroller,
	  rootMargin: "0px",
	  threshold: 0.5
	}
  );
  
  // Observe Slides and create data structure for index
  
  const siteIndex = {};
  
  $(".slide").forEach((slide) => {
	enterSlide.observe(slide);
	if (!(slide.dataset.category || slide.dataset.title)) return;
	siteIndex[slide.dataset.category] = siteIndex[slide.dataset.category] || [];
	siteIndex[slide.dataset.category].push(slide);
  });

  console.log(siteIndex);
  
  // Build Index
  
  // const index = document.getElementById("index");
  
  // Object.keys(siteIndex).forEach((category) => {
  //   // Create section
  //   const section = document.createElement("section");
  //   index.appendChild(section);
  //   let sectionContent = `<header>${category}</header><ul>`;
  //   siteIndex[category].forEach(
  //     (indexEntry) =>
  //       (sectionContent += `<li><a href="#${indexEntry.id}">${indexEntry.dataset.title}</a></li>`)
  //   );
  //   sectionContent += "</ul>";
  //   section.innerHTML = sectionContent;
  // });
  
  // $(".slide[data-bimage]").forEach((slide) => {
  //   const photoBackdrop = document.createElement("div");
  //   photoBackdrop.classList.add("photo-backdrop");
  //   console.log("Adding element background: " + slide.dataset.bimage);
  //   // photoBackdrop.src = slide.dataset.bimage;
  //   photoBackdrop.style.backgroundImage = `url(${slide.dataset.bimage}`;
  //   slide.appendChild(photoBackdrop);
  // });
  
//   $("[data-navigate]").forEach((link) => {
//     console.log("Assigning", link);
//     link.addEventListener("click", (e) =>
//       document.getElementById(e.target.dataset.navigate).scrollIntoView({
//         behavior: e.target.dataset.navigate == "menu" ? "smooth" : "auto"
//       })
//     );
//   });
  
  // Home
  
  /* 
	// These are not currently used — here for when we add left and right paddles
  
	$("#next-slide").addEventListener("click", () =>
	  nextSlide($(window.location.hash))
	);
  
	$("#previous-slide").addEventListener("click", () =>
	  previousSlide($(window.location.hash))
	);
  }
  
	function nextSlide(thisSlide) {
	  const nextId = thisSlide.nextElementSibling.id;
	  if (nextId) window.location.hash = nextId;
	  else window.location.hash = "home";
	}
  
  
  */
  
  const lightbox = (e) => {
	console.log("Called Lightbox")
	const images = e.target.parentElement.querySelectorAll("img");
	const theScrim = $id("scrim");
  
	theScrim.innerHTML = images[0];
	theScrim.classList.add("active");
  };
  
  
  document.querySelectorAll('button').forEach( button => {
	console.log("Assigning butotn")
	button.addEventListener('click', lightbox)
  })