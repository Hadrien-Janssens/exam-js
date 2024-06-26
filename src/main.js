import "./style.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import Panier from "./pages/Panier";
import { Favoris } from "./pages/Favoris";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/article": Article,
  "/panier": Panier,
  "/favoris": Favoris,
};

app("#app", routes);
