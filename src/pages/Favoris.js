import users from "../storage/shoes.json";

import { CardsList } from "../components/CardsList";
import { DataTable } from "../components/DataTable";
import { UserCard } from "./Users/Partials/UserCard";
import { UserRow } from "./Users/Partials/UserRow";
import { getTaskFromLocalStorage } from "../functions/localStorageManager";

/**
 * Page de la liste des utilisateurs
 * 2 modes d'affichage : grille et tableau
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Favoris = async (element) => {
  // on récupère le mode d'affichage depuis l'URL
  const url = new URL(window.location.href);
  const modeFromQueryString = url.searchParams.get("mode");
  const categorieFromQueryString = url.searchParams.get("categorie");
  let categorie = categorieFromQueryString;
  let mode = modeFromQueryString || "grid";

  //recuperer les favoris
  const favoris = await getTaskFromLocalStorage("favoris");

  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Mes articles préféré</h1>
      <div>
        <button id="grid-mode-btn" class="btn btn-sm btn-secondary mr-3">
          <i class="ri-layout-grid-line"></i>
        </button>
        <button id="table-mode-btn" class="btn btn-sm btn-secondary mr-3">
          <i class="ri-table-line"></i>
        </button>
      </div>
    </div>
    <div id="users-list"></div>
    `;

  const usersList = element.querySelector("#users-list");

  //filtrer les articles
  let filterdUsers = favoris;
  if (categorie === "shoes") {
    filterdUsers = favoris.filter((user) => user.categorie === 1);
  } else if (categorie === "haut") {
    filterdUsers = favoris.filter((user) => user.categorie === 2);
  } else if (categorie === "bas") {
    filterdUsers = favoris.filter((user) => user.categorie === 3);
  } else if (categorie === "all") {
    filterdUsers = favoris;
  }

  // Fonction pour afficher les utilisateurs en fonction du mode d'affichage
  const render = () => {
    if (mode === "grid") {
      CardsList(usersList, filterdUsers, UserCard, ["name"]);
    } else if (mode === "table") {
      DataTable(
        usersList,
        filterdUsers,
        UserRow,
        ["name"],
        ["Nom", "Marque", "Prix", "Actions"]
      );
    }
  };

  // Met à jour le mode dans l'URL
  const putModeInQueryString = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", mode);
    window.history.pushState({}, "", url);
  };

  // Met en surbrillance le mode d'affichage actif
  const markActiveMode = () => {
    if (mode === "grid") {
      tableModeBtn.classList.remove("active");
      gridModeBtn.classList.add("active");
    } else if (mode === "table") {
      gridModeBtn.classList.remove("active");
      tableModeBtn.classList.add("active");
    }
  };

  // Initialisation de la page
  render();

  const gridModeBtn = document.querySelector("#grid-mode-btn");
  const tableModeBtn = document.querySelector("#table-mode-btn");

  markActiveMode();

  // Ajout des écouteurs d'événements sur les boutons de mode d'affichage
  gridModeBtn.addEventListener("click", () => {
    mode = "grid";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  // Ajout des écouteurs d'événements sur les boutons de mode d'affichage
  tableModeBtn.addEventListener("click", () => {
    mode = "table";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  // Ajout d'un écouteur d'événement sur le bouton de retour arrière du navigateur
  window.addEventListener("popstate", () => {
    const url = new URL(window.location.href);
    mode = url.searchParams.get("mode") || "grid";
    render();
    markActiveMode();
  });
};
