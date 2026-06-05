import { getSession } from "../../services/auth.service";
import {
  createTask,
  getTaskById,
  updateTask,
} from "../../services/task.service";

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function getTaskIdFromPath() {
  const match = window.location.pathname.match(/^\/tasks\/edit\/([^/]+)$/);
  return match ? match[1] : null;
}

export function renderTaskForm() {
  const isEdit = Boolean(getTaskIdFromPath());

  return `
  <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
        </nav>
      </div>
    </header>

  <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Formulario</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-900">${isEdit ? "Editar tarea" : "Crear tarea"}</h1>
        <p class="mt-4 max-w-2xl text-slate-600">${isEdit ? "Actualiza los datos de la tarea seleccionada." : "Registra una tarea nueva para tu flujo de trabajo."}</p>

        <form id="task-form" class="mt-8 grid gap-5">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Titulo</label>
            <input id="title" type="text" placeholder="Ej. Preparar proyecto final" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="description">Descripcion</label>
            <textarea id="description" rows="5" placeholder="Describe la tarea..." class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"></textarea>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="status">Estado</label>
              <select id="status" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="date">Fecha limite</label>
              <input id="date" type="date" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
          </div>

          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Guardar tarea</button>
            <a class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/tasks">Cancelar</a>
          </div>
        </form>
      </section>
  </main>`;
}

export async function setupTasksFormView() {
  const taskId = getTaskIdFromPath();
  const form = document.getElementById("task-form");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const status = document.getElementById("status");
  const date = document.getElementById("date");
  const session = getSession();

  if (!form || !title || !description || !status || !date || !session) {
    return;
  }

  if (taskId) {
    try {
      const task = await getTaskById(taskId);
      const isAdmin = session.roles?.includes("ADMIN");

      if (!isAdmin && task.userId !== session.id) {
        alert("No tienes permiso para editar esta tarea.");
        navigateTo("/tasks");
        return;
      }

      title.value = task.title ?? "";
      description.value = task.description ?? "";
      status.value = task.status ?? "Pendiente";
      date.value = task.date ?? "";
    } catch (error) {
      alert(error.message || "No se pudo cargar la tarea");
      navigateTo("/tasks");
      return;
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const trimmedTitle = title.value.trim();

    if (!trimmedTitle) {
      alert("El titulo es obligatorio.");
      return;
    }

    const taskData = {
      title: trimmedTitle,
      description: description.value.trim(),
      status: status.value,
      date: date.value,
      userId: session.id,
    };

    try {
      if (taskId) {
        const existingTask = await getTaskById(taskId);
        await updateTask(taskId, { ...existingTask, ...taskData });
      } else {
        await createTask(taskData);
      }

      navigateTo("/tasks");
    } catch (error) {
      alert(error.message || "No se pudo guardar la tarea");
    }
  });
}
