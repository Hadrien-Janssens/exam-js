import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";

export const CardsList = (element, items, itemTemplate, searchableFields) => {
  let currentPage =
    parseInt(new URL(window.location).searchParams.get("page")) || 1;
  let filteredItems = items;

  const id = `list-${Math.random().toString(36).slice(2)}`;

  element.innerHTML = `
    <div class="row">
      <div class="col mb-2">
        ${TextInput("search", "", "search", "Rechercher...")}
      </div>
    </div>
    <div id="${id}" class="row row-cols-2 row-cols-lg-3">
    </div>
    <div id="pagination"></div>
    `;

  const searchInput = element.querySelector("input#search");
  const listElement = element.querySelector(`#${id}`);
  const paginationElement = element.querySelector("#pagination");

  const renderList = (filteredItems) => {
    if (filteredItems.length === 0) {
      return `
        <p>Aucun résultat</p>
        `;
    }

    return `
      ${filteredItems.map(itemTemplate).join("")}
    `;
  };

  const filterAndPaginate = (perPage = 12) => {
    const value = searchInput.value.toLowerCase();
    if (value !== "") {
      filteredItems = items.filter(
        (item) =>
          searchableFields.filter((field) =>
            item[field].toLowerCase().includes(value)
          ).length > 0
      );
    } else {
      filteredItems = items;
    }

    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, filteredItems.length);
    const pages = Math.ceil(filteredItems.length / perPage);
    filteredItems = filteredItems.slice(start, end);

    listElement.innerHTML = renderList(filteredItems);
    paginationElement.innerHTML = Pagination(currentPage, pages);

    const paginationLinks = paginationElement.querySelectorAll("a");
    const paginationLinkClickHandler = (event) => {
      event.preventDefault();
      currentPage = parseInt(
        new URL(event.currentTarget.href).searchParams.get("page")
      );
      const url = new URL(window.location);
      url.searchParams.set("page", currentPage);
      window.history.pushState({}, "", url);
      filterAndPaginate();
    };
    for (let i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].addEventListener("click", paginationLinkClickHandler);
    }

    const cardsLinks = listElement.querySelectorAll("a");
    const cardLinkClickHandler = (event) => {
      event.preventDefault();
      window.history.pushState({}, "", event.currentTarget.href);
      const headerElement = document.querySelector("header");
      headerElement.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
    };
    for (let i = 0; i < cardsLinks.length; i++) {
      cardsLinks[i].addEventListener("click", cardLinkClickHandler);
    }
  };

  filterAndPaginate();

  searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    currentPage = 1;
    filterAndPaginate();
  });

  window.addEventListener("popstate", () => {
    currentPage =
      parseInt(new URL(window.location).searchParams.get("page")) || 1;
    filterAndPaginate();
  });
};
