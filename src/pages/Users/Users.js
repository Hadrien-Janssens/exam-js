import { CardsList } from "../../components/CardsList";
import { DataTable } from "../../components/DataTable";
import users from "../../storage/users.json";
import { UserCard } from "./Partials/UserCard";
import { UserRow } from "./Partials/UserRow";


export const Users = (element) => {
  let mode = "grid";

  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Utilisateurs</h1>
      <div>
        <button id="grid-mode-btn" class="btn btn-sm btn-secondary mr-3 active">
          <i class="ri-layout-grid-line"></i>
        </button>
        <button id="table-mode-btn"  class="btn btn-sm btn-secondary mr-3">
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

  render();

  const gridModeBtn = document.querySelector("#grid-mode-btn");
  const tableModeBtn = document.querySelector("#table-mode-btn");

  gridModeBtn.addEventListener("click", () => {
    mode = "grid";
    tableModeBtn.classList.remove("active");
    gridModeBtn.classList.add("active");
    render();
  });

  tableModeBtn.addEventListener("click", () => {
    mode = "table";
    gridModeBtn.classList.remove("active");
    tableModeBtn.classList.add("active");
    render();
  });
};
