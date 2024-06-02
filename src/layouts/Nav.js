import { ROUTE_CHANGED_EVENT } from "../framework/app";

export const Nav = (element) => {
  const appName = "Une App";

  const links = [
    { href: "/", text: "Accueil" },
    { href: "/compteur", text: "Compteur" },
    { href: "/contact", text: "Contact" },
    { href: "/utilisateurs", text: "Utilisateurs" },
  ];

  element.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">${appName}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            ${links
              .map(
                (link) => `
                <li class="nav-item">
                  <a class="nav-link" href="${link.href}">${link.text}</a>
                </li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
    </nav>
    `;

  const replaceLinksByEvents = () => {
    const links = element.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", (event) => {
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));

        removeActive();
        markAsActive();
        changePageTitle();
      });
    }
  };

  const removeActive = () => {
    const activeLink = element.querySelector("a.active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
  };

  const markAsActive = () => {
    const activeLink = element.querySelector(
      `a.nav-link[href="${window.location.pathname}"]`
    );
    activeLink.classList.add("active");
  };

  const changePageTitle = () => {
    const activeLink = element.querySelector("a.active");
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
