import { PrimaryButton } from "../components/PrimaryButton";

export const Counter = (element) => {
  let counter = 0;

  const label = (counter) => `clics : ${counter}`;

  element.innerHTML = `
      <h1>Compteur</h1>
      <div class="mt-3">
        ${PrimaryButton(label(counter))}
      </div>
    `;

  element.querySelector("button").addEventListener("click", () => {
    counter++;
    element.querySelector("button").textContent = label(counter);
  });
};
