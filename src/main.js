import "./style.scss";

import { Counter } from "./pages/Counter.js";
import { Contact } from "./pages/Contact.js";
import { Home } from "./pages/Home.js";
import { app } from "./framework/app.js";
import { Users } from "./pages/Users/Users.js";
import { User } from "./pages/Users/User.js";

const routes = {
  "/": Home,
  "/compteur": Counter,
  "/contact": Contact,
  "/utilisateur": User,
  "/utilisateurs": Users,
};

app("#app", routes);
