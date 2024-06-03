import { RoleBadge } from "./RoleBadge";

export const UserCard = (user) => {
  return `
    <div class="col p-2">
      <a class="card user-link" href="/utilisateur?id=${user.id}">
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <p class="card-text">${user.email}</p>
          ${RoleBadge(user.role)}
        </div>
      </a>
    </div>
    `;
};
