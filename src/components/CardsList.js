import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";

export const CardsList = (element, items, itemTemplate, searchableFields) => {
  let filteredItems = items;
  let currentPage = 1;

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
      currentPage = 1;
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

    const links = paginationElement.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = parseInt(e.target.href.split("=")[1]);
        filterAndPaginate();
      });
    });
  };

  filterAndPaginate();

  searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    filterAndPaginate();
  });
};
