import "./style.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import { Categorie } from "./pages/categorie/Categorie";
import Panier from "./pages/Panier";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/categorie": Categorie,
  "/article": Article,
  "/panier": Panier,
};

app("#app", routes);
