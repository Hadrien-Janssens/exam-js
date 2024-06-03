export const UserCard = (user) => {
  const roles = {
    admin: "text-bg-danger",
    user: "text-bg-primary",
  };

  const roleBadge = roles[user.role] || "text-bg-secondary";

  return `
    <div class="col p-2">
      <div class="card ">
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <p class="card-text">${user.email}</p>
          <span class="badge ${roleBadge}">${user.role}</span>
        </div>
      </div>
    </div>
    `;
};
