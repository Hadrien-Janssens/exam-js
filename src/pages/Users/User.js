import users from "../../storage/users.json";
import { RoleBadge } from "./RoleBadge";

export const User = (element) => {
  const url = new URL(window.location.href);
  const userId = url.searchParams.get("id");
  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    element.innerHTML = `
      <h1>Utilisateur non trouvé</h1>
      <p>L'utilisateur avec l'identifiant ${userId} n'existe pas.</p>
      `;
    return;
  }

  element.innerHTML = `
    <h1>${user.name}</h1>
    <p>${user.email}</p>
    ${RoleBadge(user.role)}
    `;
};
