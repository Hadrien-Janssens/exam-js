import users from "../../storage/users.json";
import { RoleBadge } from "./RoleBadge";

export const User = (element) => {
  const url = new URL(window.location.href);
  const userId = url.searchParams.get("id");
  const user = users.find((user) => user.id === parseInt(userId));

  element.innerHTML = `
    <h1>${user.name}</h1>
        <p>${user.email}</p>
        ${RoleBadge(user.role)}
    `;
};
