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
    console.log("paths", path);

    const route = routesMap[path] ?? "404";

    try {
      const component = await import(`../../pages/${route}.ts`);

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
