import { loadStyles } from "./loadStyles.js";

let allAnimations = [];

export const showPulp = async () => {


 try {
	await loadStyles("/css/pulpmodern.css");
 } catch (error) {
	console.log("Error loading PulpModern Styles", error);
 }

 document.getElementById("pulpmodern-example").style = "";


 const exampleSpans = document
  .getElementById("pulpmodern-characters")
  .querySelectorAll("span");
 const aboutSpans = document
  .getElementById("about-pulpmodern")
  .querySelectorAll("span");

 allAnimations = [];

 // Create the keyframes
 const shiftIn = [
  { transform: "rotateY(90deg)", opacity: 0 },
  { transform: "rotateY(0)", opacity: 1 },
 ];

 const animationOptions = {
  duration: 1000,
  fill: "forwards",
  easing: "ease-in-out",
  animationIterationCount: 1,
 };

 let animationPromises = [];

 aboutSpans.forEach((span, index) => {
  animationOptions.delay = index * 200;
  const animation = span.animate(shiftIn, animationOptions);
  animationPromises.push(animation.finished);
  allAnimations.push(animation);
 });

 animationPromises.push(
  new Promise((resolve, reject) => {
   setTimeout(() => {
    resolve("Done");
   }, 3000);
  })
 );

 Promise.all(animationPromises).then(() => {
  animationOptions.direction = "reverse";
  aboutSpans.forEach(function (span, index) {
   animationOptions.delay = index * 200;
   allAnimations.push(span.animate(shiftIn, animationOptions));
  });

  animationOptions.direction = "normal";
  exampleSpans.forEach(function (span, index) {
   animationOptions.delay = index * 200;
   allAnimations.push(span.animate(shiftIn, animationOptions));
  });
 });
};

export const resetPulp = () => {
 // cancel all animations and return to initial state
 if (allAnimations.length == 0) return;
 setTimeout(() => {
  const cancelAnimations = [...allAnimations];
  cancelAnimations.forEach((animation) => animation.cancel());
 }, 1000);
};
