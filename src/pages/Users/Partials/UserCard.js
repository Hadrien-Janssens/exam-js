import marques from "../../../storage/marques.json";
/**
 * @typedef {Object} User
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
 * @param {User} user
 * @returns {string} HTML string
 */
export const UserCard = (user) => {
  console.log(user);
  const marque = marques.find((marque) => marque.id === user.marque);

  return `
  <div class="p-2 ">
  <a class="card user-link text-decoration-none" href="/article?id=${user.id}">
      <figure id="card-accueil" class="w-100">
        <img src="${user.img_url}" class="w-100"  />
      
        </figure>
      <div class="card-body flex-shrink-1 ">
        <div class="d-flex justify-content-between align-items-center">
          <div><h5 class="card-title">${user.name}</h5> </div> 
          <div data-heart="heart" data-id="${user.id}" class="text-danger h4 "><i class="fa-regular fa-heart"></i></div>
        </div>
        <p class="card-text">${user.desc}</p>
        <p> ${user.price} €</p>
        <p> ${marque.name} </p>
      </div>
      </a>
    </div>
      `;
};
