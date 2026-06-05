import { getSession, saveSession, clearSession } from "../../services/auth.service";
import { getUserById, getUserByEmail, updateUser, deleteUser } from "../../services/user.service";

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function renderProfile() {
  const session = getSession();
  const displayName = session ? `${session.name} ${session.lastname}` : "Usuario";

  return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/profile">Perfil</a>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
          <p class="mt-4 text-blue-50">Bienvenido, ${displayName}.</p>
        </aside>

        <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
          <form id="profile-form" class="grid gap-5">
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-name">Nombre</label>
                <input id="profile-name" type="text" value="${session?.name || ""}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-lastname">Apellido</label>
                <input id="profile-lastname" type="text" value="${session?.lastname || ""}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-email">Correo</label>
              <input id="profile-email" type="email" value="${session?.email || ""}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-password">Nueva contrasena</label>
              <input id="profile-password" type="password" placeholder="Dejar vacio para mantener la actual" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>
            <div class="flex flex-col gap-3 pt-2 sm:flex-row">
              <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Guardar cambios</button>
              <button type="button" id="delete-account-btn" class="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50">Eliminar mi cuenta</button>
            </div>
          </form>
        </section>
      </section>
    </main>`;
}

export async function setupProfileView() {
  const session = getSession();
  if (!session) return;

  const form = document.getElementById("profile-form");
  const nameInput = document.getElementById("profile-name");
  const lastnameInput = document.getElementById("profile-lastname");
  const emailInput = document.getElementById("profile-email");
  const passwordInput = document.getElementById("profile-password");
  const deleteBtn = document.getElementById("delete-account-btn");

  if (!form || !nameInput || !lastnameInput || !emailInput || !passwordInput || !deleteBtn) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newName = nameInput.value.trim();
    const newLastname = lastnameInput.value.trim();
    const newEmail = emailInput.value.trim().toLowerCase();
    const newPassword = passwordInput.value;

    if (!newName || !newLastname || !newEmail) {
      alert("Nombre, apellido y correo son obligatorios.");
      return;
    }

    try {
      if (newEmail !== session.email) {
        const existingUser = await getUserByEmail(newEmail);
        if (existingUser) {
          alert("Ya existe una cuenta con ese correo.");
          return;
        }
      }

      const currentUser = await getUserById(session.id);

      const updatedUser = {
        ...currentUser,
        name: newName,
        lastname: newLastname,
        email: newEmail,
        password: newPassword || currentUser.password,
      };

      await updateUser(session.id, updatedUser);
      saveSession(updatedUser);
      alert("Perfil actualizado exitosamente.");
    } catch (error) {
      alert(error.message || "No se pudo actualizar el perfil");
    }
  });

  deleteBtn.addEventListener("click", async () => {
    if (!confirm("Estas seguro de eliminar tu cuenta? Esta accion no se puede deshacer.")) return;

    try {
      await deleteUser(session.id);
      clearSession();
      navigateTo("/");
    } catch (error) {
      alert(error.message || "No se pudo eliminar la cuenta");
    }
  });
}
