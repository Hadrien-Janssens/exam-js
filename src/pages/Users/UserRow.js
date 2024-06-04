import { RoleBadge } from "./RoleBadge";

export const UserRow = (user) => {
  return `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${RoleBadge(user.role)}</td>
      <td><a class="btn btn-success btn-sm" href="/utilisateur?id=${
        user.id
      }"><i class="ri-search-eye-line"></i></a></td>
    </tr>
    `;
};
