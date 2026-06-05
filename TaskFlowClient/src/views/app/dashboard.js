import { renderAppNav, setupAppNav } from "../../components/appNav";
import {
  getDisplayName,
  getPrimaryRole,
  getSession,
  isAdmin,
} from "../../services/auth.service";
import { getTasks, getTasksByUserId } from "../../services/task.service";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function getTaskStats(tasks) {
  const today = getTodayDate();

  return {
    active: tasks.filter((task) => task.status !== "Completada").length,
    completed: tasks.filter((task) => task.status === "Completada").length,
    pendingToday: tasks.filter(
      (task) => task.date === today && task.status !== "Completada",
    ).length,
  };
}

function renderAdminQuickActions() {
  return `
    <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/admin">
      <p class="text-sm font-semibold text-blue-600">Administracion</p>
      <h3 class="mt-2 text-lg font-bold text-slate-900">Gestionar usuarios</h3>
    </a>
    <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/tasks">
      <p class="text-sm font-semibold text-blue-600">Tareas globales</p>
      <h3 class="mt-2 text-lg font-bold text-slate-900">Ver todas las tareas</h3>
    </a>`;
}

function renderUserQuickActions() {
  return `
    <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/tasks/new">
      <p class="text-sm font-semibold text-blue-600">Crear</p>
      <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
    </a>
    <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/profile">
      <p class="text-sm font-semibold text-blue-600">Cuenta</p>
      <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
    </a>`;
}

export function renderDashboard() {
  const session = getSession();
  const admin = isAdmin(session);
  const displayName = getDisplayName(session);
  const role = getPrimaryRole(session);

  return `
    ${renderAppNav("/dashboard")}
    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
            <h1 class="mt-3 text-4xl font-black tracking-tight">Bienvenido, ${displayName}.</h1>
            <p class="mt-4 max-w-2xl text-blue-50">
              ${
                admin
                  ? "Tienes acceso completo al sistema: gestiona usuarios, visualiza todas las tareas y administra roles."
                  : "Gestiona tus propias tareas, edita tu perfil y mantén tu productividad al día."
              }
            </p>
          </div>
          <span class="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
            Rol: ${role}
          </span>
        </div>
      </section>

      <section class="mt-8 grid gap-4 md:grid-cols-3">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">${admin ? "Tareas activas (global)" : "Mis tareas activas"}</p>
          <p id="task-stat-active" class="mt-3 text-4xl font-black text-blue-700">0</p>
        </article>
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">${admin ? "Completadas (global)" : "Mis completadas"}</p>
          <p id="task-stat-completed" class="mt-3 text-4xl font-black text-blue-700">0</p>
        </article>
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Pendientes hoy</p>
          <p id="task-stat-today" class="mt-3 text-4xl font-black text-blue-700">0</p>
        </article>
      </section>

      <section class="mt-8">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
            <a class="text-sm font-semibold text-blue-700 hover:text-blue-600" href="/tasks">
              ${admin ? "Ver todas las tareas" : "Ver mis tareas"}
            </a>
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            ${admin ? renderAdminQuickActions() : renderUserQuickActions()}
          </div>
        </article>
      </section>

      <section class="mt-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
        <h2 class="text-xl font-bold text-slate-900">Permisos de tu perfil</h2>
        <ul class="mt-4 grid gap-3 text-slate-600 md:grid-cols-2">
          ${
            admin
              ? `
            <li>• Gestionar usuarios del sistema.</li>
            <li>• Visualizar y administrar todas las tareas.</li>
            <li>• Modificar roles y permisos.</li>
            <li>• Acceso completo al panel administrativo.</li>`
              : `
            <li>• Crear, editar y eliminar tus propias tareas.</li>
            <li>• Visualizar solo la informacion de tu cuenta.</li>
            <li>• Editar tu propio perfil.</li>
            <li>• Eliminar tu propia cuenta.</li>`
          }
        </ul>
      </section>
    </main>`;
}

export async function setupDashboard() {
  setupAppNav();

  const session = getSession();
  const activeStat = document.getElementById("task-stat-active");
  const completedStat = document.getElementById("task-stat-completed");
  const todayStat = document.getElementById("task-stat-today");

  if (!session || !activeStat || !completedStat || !todayStat) {
    return;
  }

  try {
    const tasks = isAdmin(session)
      ? await getTasks()
      : await getTasksByUserId(session.id);
    const stats = getTaskStats(tasks);

    activeStat.textContent = stats.active;
    completedStat.textContent = stats.completed;
    todayStat.textContent = stats.pendingToday;
  } catch (error) {
    activeStat.textContent = "-";
    completedStat.textContent = "-";
    todayStat.textContent = "-";
    console.error(error);
  }
}
