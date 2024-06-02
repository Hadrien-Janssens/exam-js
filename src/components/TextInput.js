export const TextInput = (name, value, type = "text", placeholder = "") => {
  return `
    <input id="${name}" type="${type}" name="${name}" value="${value}" placeholder="${placeholder}" class="form-control">
    `;
};
