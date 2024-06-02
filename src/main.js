import "./style.scss";

import { Counter } from "./pages/Counter.js";
import { Contact } from "./pages/Contact.js";
import { Home } from "./pages/Home.js";
import { app } from "./app.js";

const routes = {
  "/": Home,
  "/counter": Counter,
  "/contact": Contact,
};

app("#app", routes);
