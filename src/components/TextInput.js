export function TextInput(name, value, type = "text", placeholder = "") {
  return `
    <input type="${type}" name="${name}" value="${value}" placeholder="${placeholder}" class="form-control">
    `;
}
