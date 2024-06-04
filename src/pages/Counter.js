import { PrimaryButton } from "../components/PrimaryButton";

export const Counter = (element) => {
  const COUNTER_UPDATED_EVENT = "counter-updated";
  let counter = 0;

  const increment = () => {
    counter++;
    element.dispatchEvent(new CustomEvent(COUNTER_UPDATED_EVENT));
  };

  const decrement = () => {
    counter--;
    element.dispatchEvent(new CustomEvent(COUNTER_UPDATED_EVENT));
  };

  element.innerHTML = `
      <h1>Compteur</h1>
      <div id="counter-value" class="mb-3 fs-1">
        ${counter}
      </div>
      <div class="mt-3">
        ${PrimaryButton("-", "button", "decrement-btn")}
        ${PrimaryButton("+", "button", "increment-btn")}
      </div>
    `;

  document.querySelector("#increment-btn").addEventListener("click", increment);
  document.querySelector("#decrement-btn").addEventListener("click", decrement);

  element.addEventListener(COUNTER_UPDATED_EVENT, () => {
    element.querySelector("#counter-value").textContent = counter;
  });
};
