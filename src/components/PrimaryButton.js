export const PrimaryButton = (label, type = "button", id = null) => {
  return `
    <button ${
      id ? 'id="' + id + '"' : ""
    } class="btn btn-primary" type="${type}">${label}</button>
    `;
};
