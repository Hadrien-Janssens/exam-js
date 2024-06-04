export const TextareaInput = (name, value, placeholder = "", rows = 3) => {
  return `
    <textarea id="${name}" name="${name}" rows="${rows}" class="form-control" placeholder="${placeholder}">${value}</textarea>
    `;
};
