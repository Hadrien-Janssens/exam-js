import marques from "../../../storage/marques.json";
/**
 * @typedef {Object} Article
 * @property {number} id - L'identifiant de l'utilisateur.
 * @property {string} name - Le nom de l'utilisateur.
 * @property {string} desc - Le rôle de l'utilisateur.
 * @property {string} img_url - Le rôle de l'utilisateur.
 * @property {string} categorie - Le rôle de l'utilisateur.
 * @property {number} price - Le rôle de l'utilisateur.
 */

/**
 * Affiche une carte d'utilisateur
 *
 * @param {Article} user
 * @returns {string} HTML string
 */
export const ArticleCard = (article) => {
  const marque = marques.find((marque) => marque.id === article.marque);

  return `
  <div class="p-2 ">
  <a class="card user-link text-decoration-none" href="/article?id=${article.id}">
      <figure id="card-accueil" class="w-100">
        <img src="${article.img_url}" class="w-100"  />
      
        </figure>
      <div class="card-body flex-shrink-1 ">
        <div class="d-flex justify-content-between align-items-center">
          <div><h5 class="card-title">${article.name}</h5> </div> 
          <div data-heart="heart" data-id="${article.id}" class="text-danger h4 "><i class="fa-regular fa-heart"></i></div>
        </div>
        <p class="card-text">${article.desc}</p>
        <p> ${article.price} €</p>
        <p> ${marque.name} </p>
      </div>
      </a>
    </div>
      `;
};
