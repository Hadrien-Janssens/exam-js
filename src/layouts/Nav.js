import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { getTaskFromLocalStorage } from "../functions/localStorageManager";

/**
 * @typedef {Object} Link
 * @property {string} href - L'URL du lien.
 * @property {string} text - Le texte du lien.
 */

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Nav = async (element) => {
  const appName = "Sport Plus";
  const card = await getTaskFromLocalStorage("articles");

  function getQuantity(articles) {
    let quantity = 0;
    for (let i = 0; i < articles.length; i++) {
      quantity += parseInt(articles[i].quantity);
    }
    return quantity;
  }
  const quantity = getQuantity(card);

  /**
   * @type {Link[]}
   */
  const links = [
    { href: "/", text: "Boutique" },
    { href: "/contact", text: "Contact" },
  ];

  const url = new URL(window.location.href);
  const modeFromQueryString = url.searchParams.get("mode");
  let mode = modeFromQueryString || "grid";
  element.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">${appName}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            ${links
              .map(
                (link) => `
                <li class="nav-item">
                  <a class="nav-link" href="${link.href}">${link.text}</a>
                </li>`
              )
              .join("")}
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                tous
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/?categorie=all&mode=${mode}">tous</a></li>
                <li><a class="dropdown-item" href="/?categorie=shoes&mode=${mode}">Chaussures</a></li>
                <li><a class="dropdown-item" href="/?categorie=hau&mode=${mode}t">Haut</a></li>
                <li><a class="dropdown-item" href="/?categorie=bas&mode=${mode}">Bas</a></li>
              </ul>
            </li>
          </ul>
          <a href="/panier" class="btn btn-primary position-relative m-2 mx-4">
            <i class="fa-solid fa-basket-shopping fs-3"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="card-number">
              ${quantity}
              <span class="visually-hidden">unread messages</span>
            </span>
          </a>
        </div>
      </div>
    </nav>
  `;

  // Remplace les liens par des événements de navigation
  const replaceLinksByEvents = () => {
    const navLinks = element.querySelectorAll("a.nav-link");

    const linkClickHandler = (event) => {
      event.preventDefault();
      window.history.pushState({}, "", event.target.href);
      element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));

      removeActive();
      markAsActive();
      changePageTitle();
    };

    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", linkClickHandler);
    }
  };

  const removeActive = () => {
    const activeLink = element.querySelector("a.nav-link.active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
  };

  const markAsActive = () => {
    const activeLink = element.querySelector(
      `a.nav-link[href="${window.location.pathname}"]`
    );
    if (!activeLink) {
      return;
    }
    activeLink.classList.add("active");
  };

  const changePageTitle = () => {
    const activeLink = element.querySelector("a.nav-link.active");

    if (!activeLink) {
      document.title = appName;
      return;
    }

    document.title = `${activeLink.textContent} - ${appName}`;
  };

  markAsActive();
  replaceLinksByEvents();
  changePageTitle();

  window.addEventListener("popstate", () => {
    removeActive();
    markAsActive();
    changePageTitle();
    element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
  });
};
