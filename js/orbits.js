import { loadStyles } from "./loadStyles.js";

let allAnimations = [];

export const showOrbits = async () => {
    try {
        await loadStyles("/css/orbits.css");
    } catch (error) {
        console.log("Error loading Orbits Styles", error);
    }
    
    const orbitContainer = document.getElementById("orbits-html");
    orbitContainer.classList.add("run-orbits");
    orbitContainer.classList.remove("fade-out");
};

export const resetOrbits = () => {
    const orbitContainer = document.getElementById("orbits-html");
    orbitContainer.classList.add("fade-out");
    setTimeout(function(){ orbitContainer.classList.remove("run-orbits"); }, 1000);
};
