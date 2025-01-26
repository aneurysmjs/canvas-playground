import "./assets/css/styles.css";

import router from "@/lib/router/router.js";

import { mount } from "@/lib/renderer/renderer.js";

import routesMap from "@/routes/routesMap.js";

import Nav from "@/ui/core/Nav/index.js";

router(routesMap);

const app = document.querySelector("#app");

if (app) {
  mount(app, Nav());
}
