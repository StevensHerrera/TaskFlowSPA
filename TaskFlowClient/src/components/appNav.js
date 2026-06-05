import { clearSession, getSession, isAdmin } from "../services/auth.service";

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function renderAppNav(activePath, options = {}) {
  const { maxWidth = "max-w-6xl" } = options;
  const admin = isAdmin(getSession());

  const navLink = (path, label) => {
    const isActive = activePath === path;
    const classes = isActive
      ? "rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
      : "rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700";

    return `<a class="${classes}" href="${path}">${label}</a>`;
  };

  return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex ${maxWidth} items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          ${navLink("/dashboard", "Dashboard")}
          ${navLink("/tasks", "Tareas")}
          ${navLink("/profile", "Perfil")}
          ${admin ? navLink("/admin", "Admin") : ""}
          <a id="logout-btn" class="rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/login">Logout</a>
        </nav>
      </div>
    </header>`;
}

export function setupAppNav() {
  const logoutBtn = document.getElementById("logout-btn");

  if (!logoutBtn) {
    return;
  }

  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clearSession();
    navigateTo("/login");
  });
}
