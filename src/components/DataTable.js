import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";

export const DataTable = (
  element,
  items,
  itemTemplate,
  searchableFields,
  tableHeadings
) => {
  let filteredItems = items;
  let currentPage = 1;

  const id = `list-${Math.random().toString(36).slice(2)}`;

  element.innerHTML = `
    <div class="row">
      <div class="col mb-2">
        ${TextInput("search", "", "search", "Rechercher...")}
      </div>
    </div>
    <table id="${id}" class="table table-stripped border align-middle">
      <thead>
        <tr>
          ${tableHeadings
            .map((heading) => {
              return `<th scope="col">${heading}</th>`;
            })
            .join("")}
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <div id="pagination"></div>
    `;

  const searchInput = element.querySelector("input#search");
  const listElement = element.querySelector(`#${id} tbody`);
  const paginationElement = element.querySelector("#pagination");

  const renderList = (filteredItems) => {
    if (filteredItems.length === 0) {
      return `
        <td colspan="4" class="text-center">Aucun résultat</td>
        `;
    }

    return `
      ${filteredItems.map(itemTemplate).join("")}
    `;
  };

  const filterAndPaginate = (perPage = 10) => {
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

    const paginationLinks = paginationElement.querySelectorAll("a");
    const paginationLinkClickHandler = (e) => {
      e.preventDefault();
      currentPage = parseInt(e.target.href.split("=")[1]);
      filterAndPaginate();
    };
    for (let i = 0; i < links.length; i++) {
      paginationLinks[i].addEventListener("click", paginationLinkClickHandler);
    }

    const rowsLinks = listElement.querySelectorAll("a");
    const rowLinkClickHandler = (event) => {
      event.preventDefault();
      window.history.pushState({}, "", event.currentTarget.href);
      const headerElement = document.querySelector("header");
      headerElement.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
    };
    for (let i = 0; i < cardsLinks.length; i++) {
      rowsLinks[i].addEventListener("click", rowLinkClickHandler);
    }
  };

  filterAndPaginate();

  searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    filterAndPaginate();
  });
};
