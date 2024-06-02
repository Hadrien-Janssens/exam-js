import { Layout } from "../components/Layout";
import { Nav } from "../components/Nav";

export const ROUTE_CHANGED_EVENT = "route-changed";

export const app = (elementId, routes) => {
  const appElement = document.querySelector(elementId);

  appElement.innerHTML = Layout();

  const headerElement = document.querySelector("header");
  const mainElement = document.querySelector("main");
  Nav(headerElement);

  const changePage = () => {
    const page = routes[currentRoute];
    page(mainElement);
  };

  let currentRoute = window.location.pathname;
  changePage(currentRoute);

  headerElement.addEventListener(ROUTE_CHANGED_EVENT, () => {
    const newRoute = window.location.pathname;
    if (currentRoute !== newRoute) {
      currentRoute = newRoute;
      changePage(currentRoute);
    }
  });
};
