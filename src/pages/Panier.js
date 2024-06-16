import {
  getTaskFromLocalStorage,
  sendTaskInLocalStorage,
} from "/src/functions/localStorageManager";
import shoes from "../storage/shoes.json";
import { send } from "vite";

const Panier = async (element) => {
  const card = await getTaskFromLocalStorage("articles");
  let total = 0;

  if (card.length === 0) {
    element.innerHTML = `
       Votre panier est actuellement vide,<br> rendez-vous dans la boutique pour commencer votre shopping.
     `;
    return;
  }
  element.innerHTML = `
    <h1>Panier</h1>

    <div className="container">
        ${card
          .map((article) => {
            total += article.article.price;
            return `
                <div class="border rounded mb-2 p-1 px-3 d-flex ">
                    <div class="w-25"> ${article.article.name} </div>
                    <div class="w-25 text-secondary fst-italic"> ${
                      article.article.price
                    } €  <span> x ${article.quantity}</span></div>
                    <div class="w-25"> ${(
                      article.article.price * article.quantity
                    ).toFixed(2)} € </div>

                   
                    <div id=${
                      article.article.id
                    } class="text-danger flex-grow-1 text-end bin"><i class="fa-solid fa-trash-can"></i></div>
                </div>
            `;
          })
          .join("")}
          <div class="d-flex justify-content-between gap-2 mt-4 align-items-center">
            <button id="to-empty-btn" class="btn btn-danger">Vider le panier</button>
            <div class="d-flex justify-content-end gap-2 ">
              <div class="border rounded p-2">Total: ${total.toFixed(2)} €</div>
                <button id="order-btn" class="btn btn-primary">Commander</button>
            </div>
          </div>
    `;

  // order action
  const orderBtn = document.querySelector("#order-btn");
  orderBtn.addEventListener("click", () => {
    const answer = confirm(
      `Vous allez commdander l'intégralité de votre panier pour un montant de ${total.toFixed(
        2
      )} €`
    );
    if (answer) {
      sendTaskInLocalStorage("articles", []);
      const cardNumber = document.querySelector("#card-number");
      cardNumber.textContent = "0";

      element.innerHTML =
        "Commande validée, merci pour vos achats. Votre panier est actuellement vide";
    }
  });

  //vider le panier
  const toEmptyBtn = document.querySelector("#to-empty-btn");
  toEmptyBtn.addEventListener("click", () => {
    const answer = confirm(
      `Voulez-vous vraiment vider l'intégralité de votre panier ?`
    );
    if (answer) {
      sendTaskInLocalStorage("articles", []);
      const cardNumber = document.querySelector("#card-number");
      cardNumber.textContent = "0";

      element.innerHTML =
        "Votre panier est actuellement vide,<br> rendez-vous dans la boutique pour commencer votre shopping.";
    }
  });

  // delete item
  const bins = document.querySelectorAll(".bin");
  bins.forEach((bin) => {
    bin.addEventListener("click", (e) => {
      const id = e.currentTarget.id;
      card.filter((c) => c.article.id !== id);
      sendTaskInLocalStorage("articles", card);
    });
  });
};

export default Panier;
