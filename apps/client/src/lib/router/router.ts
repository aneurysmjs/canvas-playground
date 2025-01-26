export default function router(routesMap: Record<string, string>) {
  const route = (event: MouseEvent) => {
    event = event || window.event;
    console.log("event", event);
    event.preventDefault();

    const href = (event.target as HTMLAnchorElement).href;

    window.history.pushState({}, "", href);

    handleLocation();
  };

  const handleLocation = async () => {
    const path = window.location.pathname;

    const route = routesMap[path] ?? "404";

    try {
      /**
       * @see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#how-it-works
       */
      const component = await import(`../../app/${route}/Page.ts`);

      const outlet = document.querySelector("#route-outlet");

      if (outlet) {
        outlet.innerHTML = component.default();
      }
    } catch (error) {
      console.log("wow pastol", error);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    handleLocation();
  });

  window.onpopstate = handleLocation;
  window.route = route;
}
