import { renderAppNav, setupAppNav } from "../../components/appNav";
import { getSession, isAdmin } from "../../services/auth.service";
import {
  deleteTask,
  getTasks,
  getTasksByUserId,
} from "../../services/task.service";
import { getUsers } from "../../services/user.service";
import { confirmDelete } from "../../utils/alerts";

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function renderTaskCard(task, userName) {
  return `
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${task.status}</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900">${task.title}</h2>
          <p class="mt-3 max-w-2xl text-slate-600">${task.description || "Sin descripcion"}</p>
          ${task.date ? `<p class="mt-2 text-sm text-slate-500">Fecha limite: ${task.date}</p>` : ""}
          ${userName ? `<p class="mt-1 text-sm text-slate-500">Creada por: ${userName}</p>` : ""}
        </div>
        <div class="flex gap-3">
          <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/tasks/edit/${task.id}">Editar</a>
          <button type="button" data-delete-task="${task.id}" class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Eliminar</button>
        </div>
      </div>
    </article>`;
}

export function renderTasks() {
  const session = getSession();
  const admin = isAdmin(session);

  return `
    ${renderAppNav("/tasks")}
    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">${admin ? "Todas las tareas" : "Mis tareas"}</h1>
          <p class="mt-4 max-w-2xl text-blue-50">
            ${
              admin
                ? "Como administrador puedes visualizar y gestionar las tareas de todos los usuarios."
                : "Vista principal para listar, editar y eliminar tus propias tareas."
            }
          </p>
        </div>
        <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/tasks/new">
          Crear tarea
        </a>
      </section>

      <section id="tasks-list" class="mt-8 grid gap-4">
        <p class="rounded-3xl border border-blue-100 bg-white p-6 text-slate-500">Cargando tareas...</p>
      </section>
    </main>`;
}

export async function setupTasksView() {
  setupAppNav();

  const list = document.getElementById("tasks-list");
  const session = getSession();

  if (!list || !session) {
    return;
  }

  try {
    const isAdmin = session.roles?.includes("ADMIN");
    const tasks = isAdmin
      ? await getTasks()
      : await getTasksByUserId(session.id);

    let usersMap = {};
    if (isAdmin) {
      const users = await getUsers();
      usersMap = Object.fromEntries(users.map(u => [u.id, `${u.name} ${u.lastname}`]));
    }

    if (tasks.length === 0) {
      list.innerHTML = `
        <p class="rounded-3xl border border-blue-100 bg-white p-6 text-slate-600">
          No tienes tareas registradas. Crea la primera desde el boton superior.
        </p>`;
      return;
    }

    list.innerHTML = tasks.map(task => renderTaskCard(task, isAdmin ? usersMap[task.userId] : null)).join("");

    list.querySelectorAll("[data-delete-task]").forEach((button) => {
      button.addEventListener("click", async () => {
        const taskId = button.dataset.deleteTask;

        if (!taskId || !(await confirmDelete("Deseas eliminar esta tarea?"))) {
          return;
        }

        try {
          await deleteTask(taskId);
          navigateTo("/tasks");
        } catch (error) {
          alert(error.message || "No se pudo eliminar la tarea");
        }
      });
    });
  } catch (error) {
    list.innerHTML = `
      <p class="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-700">
        ${error.message || "No se pudieron cargar las tareas"}
      </p>`;
  }
}
