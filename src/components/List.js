export const List = (items, itemTemplate) => {
  return `
    <ul class="list-group">
      ${items.map(itemTemplate).join("")}
    </ul>
    `;
};
