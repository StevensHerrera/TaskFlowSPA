import { renderAppNav, setupAppNav } from "../../components/appNav";
import { getSession, isAdmin, saveSession } from "../../services/auth.service";
import { getUsers, updateUser } from "../../services/user.service";

function renderUserCard(user) {
  const currentRole = user.roles?.[0] ?? "USER";
  const fullName = `${user.name} ${user.lastname}`.trim();

  return `
    <div class="rounded-2xl bg-blue-50 p-4" data-user-id="${user.id}">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="font-bold text-slate-900">${fullName}</p>
          <p class="text-sm text-slate-500">${user.email}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">${currentRole}</span>
          <select data-role-select="${user.id}" class="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700 focus:border-blue-400 focus:outline-none">
            <option value="USER" ${currentRole === "USER" ? "selected" : ""}>USER</option>
            <option value="ADMIN" ${currentRole === "ADMIN" ? "selected" : ""}>ADMIN</option>
          </select>
          <button type="button" data-save-role="${user.id}" class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white">
            Guardar rol
          </button>
        </div>
      </div>
    </div>`;
}

export function renderAdmin() {
  return `
    ${renderAppNav("/admin", { maxWidth: "max-w-7xl" })}
    <main class="mx-auto max-w-7xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Gestiona usuarios, revisa roles y monitorea el estado general del sistema.</p>
      </section>

      <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <h2 class="text-xl font-bold text-slate-900">Acciones rapidas</h2>
          <div class="mt-5 grid gap-4">
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" href="/admin">Gestionar usuarios</a>
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" href="/tasks">Ver todas las tareas</a>
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" href="/dashboard">Volver al dashboard</a>
          </div>
        </article>

        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-900">Usuarios registrados</h2>
            <span id="users-count" class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">0</span>
          </div>
          <div id="users-list" class="mt-5 space-y-4">
            <p class="text-slate-500">Cargando usuarios...</p>
          </div>
        </article>
      </section>
    </main>`;
}

export async function setupAdminView() {
  setupAppNav();

  const usersList = document.getElementById("users-list");
  const usersCount = document.getElementById("users-count");
  const session = getSession();

  if (!usersList || !usersCount || !session || !isAdmin(session)) {
    return;
  }

  try {
    const users = await getUsers();

    usersCount.textContent = String(users.length);

    if (users.length === 0) {
      usersList.innerHTML = `<p class="text-slate-500">No hay usuarios registrados.</p>`;
      return;
    }

    usersList.innerHTML = users.map(renderUserCard).join("");

    usersList.querySelectorAll("[data-save-role]").forEach((button) => {
      button.addEventListener("click", async () => {
        const userId = button.dataset.saveRole;
        const roleSelect = usersList.querySelector(`[data-role-select="${userId}"]`);
        const newRole = roleSelect?.value;

        if (!userId || !newRole) {
          return;
        }

        try {
          const user = users.find((item) => item.id === userId);

          if (!user) {
            throw new Error("Usuario no encontrado");
          }

          await updateUser(userId, { ...user, roles: [newRole] });
          user.roles = [newRole];

          const roleBadge = button
            .closest("[data-user-id]")
            ?.querySelector(".rounded-full.bg-white");

          if (roleBadge) {
            roleBadge.textContent = newRole;
          }

          if (session.id === userId) {
            saveSession({ ...session, roles: [newRole] });
          }

          alert("Rol actualizado correctamente");
        } catch (error) {
          alert(error.message || "No se pudo actualizar el rol");
        }
      });
    });
  } catch (error) {
    usersList.innerHTML = `
      <p class="rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700">
        ${error.message || "No se pudieron cargar los usuarios"}
      </p>`;
  }
}
