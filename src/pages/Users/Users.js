import { CardsList } from "../../components/CardsList";
import { DataTable } from "../../components/DataTable";
import users from "../../storage/users.json";
import { UserCard } from "./Partials/UserCard";
import { UserRow } from "./Partials/UserRow";

export const Users = (element) => {
  const url = new URL(window.location.href);
  const modeFromQueryString = url.searchParams.get("mode");
  let mode = modeFromQueryString || "grid";

  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Utilisateurs</h1>
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

  const render = () => {
    if (mode === "grid") {
      CardsList(usersList, users, UserCard, ["name", "email"]);
    } else if (mode === "table") {
      DataTable(
        usersList,
        users,
        UserRow,
        ["name", "email"],
        ["Nom", "Email", "Rôle", "Actions"]
      );
    }
  };

  const putModeInQueryString = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", mode);
    window.history.pushState({}, "", url);
  };

  const markActiveMode = () => {
    if (mode === "grid") {
      tableModeBtn.classList.remove("active");
      gridModeBtn.classList.add("active");
    } else if (mode === "table") {
      gridModeBtn.classList.remove("active");
      tableModeBtn.classList.add("active");
    }
  };

  render();

  const gridModeBtn = document.querySelector("#grid-mode-btn");
  const tableModeBtn = document.querySelector("#table-mode-btn");

  markActiveMode();

  gridModeBtn.addEventListener("click", () => {
    mode = "grid";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  tableModeBtn.addEventListener("click", () => {
    mode = "table";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  window.addEventListener("popstate", () => {
    const url = new URL(window.location.href);
    mode = url.searchParams.get("mode") || "grid";
    render();
    markActiveMode();
  });
};
