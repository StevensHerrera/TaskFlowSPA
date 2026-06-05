import { getSession } from "../services/auth.service";
import { notFoundView, routes } from "./routes";

function resolveRoute(pathname) {
  if (routes[pathname]) {
    return routes[pathname];
  }

  if (/^\/tasks\/edit\/[^/]+$/.test(pathname)) {
    return routes["/tasks/edit/:id"];
  }

  return { render: notFoundView };
}

export function renderRoute() {
  const app = document.getElementById("app");
  const currentPath = window.location.pathname;
  const route = resolveRoute(currentPath);

  const session = getSession()

  if(route.redirectIfAuthenticated && session){
    window.history.replaceState({},"","/dashboard")
    renderRoute()
    return
  }

  if(route.requiresAuth && !session){
    window.history.replaceState({}, "", "/login")
    renderRoute()
    return
  }

  if(route.allowedRoles && !route.allowedRoles.some((role) => session.roles?.includes(role))){
    window.history.replaceState({}, "", "/dashboard")
    renderRoute()
    return
  }

  app.innerHTML = route.render();

  if (route.setup) {
    route.setup();
  }
}

export function initRouter(){
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a");

        if (!link) {
            return;
        }
        
        const href = link.getAttribute("href");

        if(!href || !href.startsWith("/")){
            return;
        }

        event.preventDefault(); 
        window.history.pushState({}, "", href);
        renderRoute();
    });
    
    window.addEventListener("popstate", renderRoute);
    renderRoute();     
}
