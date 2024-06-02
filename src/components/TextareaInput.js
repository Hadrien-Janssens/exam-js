export function TextareaInput(name, value, placeholder = "", rows = 3) {
  return `
    <textarea name="${name}" rows="${rows}" class="form-control" placeholder="${placeholder}">${value}</textarea>
    `;
}
