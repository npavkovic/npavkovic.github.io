import './style.css'

  const $$ = (selector: string) => document.querySelectorAll(selector)!;
  const $ = (selector: string) => document.querySelector(selector)!;
  const $id = (selector: string) => document.getElementById(selector)!;

  const dom = {
    scrollWrap: document.getElementById("scroll-wrap")!,
    menu: document.getElementById("menu")!,
    main: $("main")!,
    scroller: document.getElementById("scroller")!,
  };

  dom.scrollWrap.scrollIntoView(); // start on homepage


