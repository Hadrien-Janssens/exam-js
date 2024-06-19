import users from "../storage/shoes.json";
import * as bootstrap from "bootstrap";

import {
  getTaskFromLocalStorage,
  sendTaskInLocalStorage,
} from "../functions/localStorageManager";

export const Article = async (element) => {
  // on récupère l'identifiant de l'utilisateur depuis l'URL
  const url = new URL(window.location.href);
  const articleId = parseInt(url.searchParams.get("id"));
  // on récupère l'utilisateur correspondant à l'identifiant
  const user = users.find((user) => user.id === articleId);

  // si l'utilisateur n'existe pas, on affiche un message d'erreur
  if (!user) {
    element.innerHTML = `
          <h1>Article non trouvé</h1>
          <p>L'article avec l'identifiant ${articleId} n'existe pas.</p>
          `;
    return;
  }

  element.innerHTML = `
     <div class="d-flex gap-1 justify-content-left">
        <figure class="w-50 ">
            <img src="${user.img_url}" class="w-75" />
        </figure>
        <div>
            <h1>${user.name}</h1>
            <p>${user.desc}</p>
            <p>${user.price} €</p>
            
                <div class="input-group mb-3" style="width:120px">
                    <span id="minus-btn" class="input-group-text" role="button">-</span>
                    <input id="quantity" type="text" value='1' class="form-control text-center" aria-label="Amount (to the nearest dollar)">
                    <span id="add-btn" class="input-group-text cursor-pointer" role="button">+</span>
                  </div>
                  <p>Taille :</p>
                  <div class="d-flex mb-5 gap-1" id="btn-container">
                    ${
                      user.categorie === 1
                        ? `
                    <button data-size="36" class="btn border btn-primary">36</button>
                    <button data-size="37" class="btn border">37</button>
                    <button class="btn border">38</button>
                    <button class="btn border">39</button>
                    <button class="btn border">40</button>
                      `
                        : `
                    <button class="btn border btn-primary">XS</button>
                    <button class="btn border">S</button>
                    <button class="btn border">M</button>
                    <button class="btn border">L</button>
                    <button class="btn border">XL</button>
                        `
                    }
            
                  </div>
                <button id="add-to-card"  class="btn btn-primary liveToastBtn" >Ajouter au panier</button>
                <!-- toast  -->

                <div class="toast-container position-fixed bottom-0 end-0 p-3">
                  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                      <strong class="me-auto">Ajout</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                      L'article a été ajouter au panier
                    </div>
                  </div>
                </div>

            
        </div>
    </div>
        `;
  const quantity = document.querySelector("#quantity");
  const addBtn = document.querySelector("#add-btn");
  const minusBtn = document.querySelector("#minus-btn");
  let size = undefined;
  if (user.categorie === 1) {
    size = 36;
  } else {
    size = "XS";
  }

  // increaseQuandtity
  addBtn.addEventListener("click", () => {
    increaseQuantity();
  });
  const increaseQuantity = () => {
    quantity.value++;
  };

  // decreaseQuantity
  minusBtn.addEventListener("click", () => {
    decreaseQuantity();
  });
  const decreaseQuantity = () => {
    //pas descendre sous zero
    if (quantity.value > 0) {
      quantity.value--;
    }
  };

  //add to Card
  const addToCard = document.querySelector("#add-to-card");

  addToCard.addEventListener("click", async () => {
    const cardNumber = document.querySelector("#card-number");
    //number of Card
    cardNumber.textContent =
      parseInt(quantity.value) + parseInt(cardNumber.textContent);
    // add to localStorage
    const articles = await getTaskFromLocalStorage("articles");
    // create id for card item
    const id = Date.now();
    //ajouter la quantity et l'id de l'aritcle dans la variables articles
    articles.push({
      id: id,
      article: user,
      quantity: quantity.value,
      size: size,
    });
    sendTaskInLocalStorage("articles", articles);
  });

  // afficher le toast
  const toastTrigger = document.querySelector(".liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");

  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }

  //choisir la taille
  const btns = document.querySelectorAll("#btn-container button");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((btn) => {
        btn.classList.remove("btn-primary");
      });
      btn.classList.add("btn-primary");
      size = btn.textContent;
    });
  });
};
