import { CardsList } from "../../components/CardsList";
import users from "../../storage/users.json";
import { UserCard } from "./UserCard";

export const Users = (element) => {
  element.innerHTML = `
    <h1>Utilisateurs</h1>
    <div id="users-list"></div>
    `;

  const usersList = element.querySelector("#users-list");
  CardsList(usersList, users, UserCard, ["name", "email"]);
};
