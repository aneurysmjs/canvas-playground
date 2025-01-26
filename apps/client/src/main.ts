import "./assets/css/styles.css";

import router from "./lib/router/router.js";

const routesMap = {
  "/": "home",
  "/about": "about",
};

router(routesMap);
