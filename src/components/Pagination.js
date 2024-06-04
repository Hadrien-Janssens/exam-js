export const Pagination = (currentPage, totalPages) => {
  if (totalPages === 0) {
    return "";
  }

  return `
    <nav class="mt-2">
      <ul class="pagination">
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
          <a class="page-link" href="?page=${currentPage - 1}">Previous</a>
        </li>
        ${Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          return `
            <li class="page-item ${currentPage === pageNumber ? "active" : ""}">
              <a class="page-link" href="?page=${pageNumber}">${pageNumber}</a>
            </li>
          `;
        }).join("")}
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
          <a class="page-link" href="?page=${currentPage + 1}">Next</a>
        </li>
      </ul>
    </nav>
    `;
};
