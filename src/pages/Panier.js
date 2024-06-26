import {
  getTaskFromLocalStorage,
  sendTaskInLocalStorage,
} from "/src/functions/localStorageManager";

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
            total += article.article.price * article.quantity;
            return `
                <div class="border rounded mb-2 p-1 px-3 d-flex align-items-center">
                    <div class="w-25"><a href="/article?id=${
                      article.article.id
                    }"> ${article.article.name}</a> </div>
                    <div class="w-25">taille: ${article.size} </div>
                    <div class="w-50 text-secondary fst-italic"> <span>${
                      article.article.price
                    }</span> €  x  ${article.quantity}  
                   
                          <button id="${
                            article.id
                          }" class="btn rounded border plus-btn">+</button>
                          <button id="${
                            article.id
                          }"  class="btn rounded border minus-btn">-</button>
                      
                        
                    </div>
                    <div class="w-25 "> 
                     
                      <span class="some">${(
                        article.article.price * article.quantity
                      ).toFixed(2)}</span> € 
                  </div>

                   
                    <div id=${article.id} 
                      data-quantity = ${article.quantity}
                    class="text-danger flex-grow-1 text-end border-none bin"><i class=" fa-solid fa-trash-can"></i></div>
                </div>
            `;
          })
          .join("")}
          <div class="d-flex justify-content-between gap-2 mt-4 align-items-center">
            <button id="to-empty-btn" class="btn btn-danger ">Vider le panier</button>
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
      const newCard = card.filter((c) => c.id != id);
      sendTaskInLocalStorage("articles", newCard);
      // window.location.reload();
      window.dispatchEvent(
        new CustomEvent("delete-article", {
          detail: e.currentTarget.dataset.quantity,
        })
      );
      Panier(element);
    });
  });

  //increase quantity
  const plusBtn = document.querySelectorAll(".plus-btn");
  plusBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = parseInt(e.currentTarget.id);
      const articles = await getTaskFromLocalStorage("articles");
      articles.forEach((article) => {
        if (article.id === id) {
          article.quantity++;
        }
      });
      sendTaskInLocalStorage("articles", articles);
      window.dispatchEvent(new CustomEvent("add-to-card"));
      Panier(element);
    });
  });

  //decrease quantity
  const minusBtn = document.querySelectorAll(".minus-btn");
  minusBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = parseInt(e.currentTarget.id);
      const articles = await getTaskFromLocalStorage("articles");
      articles.forEach((article) => {
        if (article.id === id) {
          if (article.quantity <= 0) {
            return;
          }
          article.quantity--;
          sendTaskInLocalStorage("articles", articles);
          window.dispatchEvent(new CustomEvent("minus-to-card"));
          Panier(element);
        }
      });
    });
  });
};

export default Panier;
