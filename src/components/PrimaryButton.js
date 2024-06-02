export const PrimaryButton = (label, type = "button") => {
  return `
    <button class="btn btn-primary" type="${type}">${label}</button>
    `;
};
