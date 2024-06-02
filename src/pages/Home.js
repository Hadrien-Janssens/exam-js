import { Carousel } from "../components/Carousel.js";
import images from "../storage/homepageCarousel.json";

export const Home = (element) => {
  element.innerHTML = `
    <h1>Accueil</h1>
    <p>Bienvenue sur une app !</p>
    ${Carousel(images)}
    `;
};
