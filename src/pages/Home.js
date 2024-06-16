import shoes from "../storage/shoes.json";
import { UserCard } from "./Users/Partials/UserCard";
import { CardsList } from "../components/CardsList";

/**
 * Page d'accueil
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Home = (element) => {
  element.innerHTML = `
    <h1>Produits</h1>
    <div id="article-list"></div>
 
    `;

  const render = () => {
    const articleList = document.querySelector("#article-list");
    CardsList(articleList, shoes, UserCard, ["name"]);
  };

  render();
};
