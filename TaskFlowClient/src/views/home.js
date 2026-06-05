export function renderHome(){
  return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
        class="text-xl font-black tracking-tight text-blue-900"
        href="/src/views/home.html"
        >TaskFlowSPA</a
        >
        <nav class="hidden items-center gap-3 md:flex">
        <a
            class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
            href="/"
            >Home</a
        >
        <a
            class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
            href="/login"
            >Login</a
        >
        <a
            class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            href="/register"
            >Registrarse</a
        >
        </nav>
    </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-14">
    <section class="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
        <p
            class="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
        >
            Organiza tu trabajo con calma
        </p>
        <h1
            class="mt-6 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl"
        >
            Una plataforma clara para gestionar tareas, usuarios y productividad.
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            TaskFlowSPA presenta el recorrido principal del proyecto con una
            interfaz uniforme, amable y lista para convertirse luego en una SPA real
            con autenticacion, roles, permisos y CRUD de tareas.
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
            class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-500"
            href="/login"
            >Iniciar sesion</a
            >
            <a
            class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-6 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
            href="/register"
            >Crear cuenta</a
            >
        </div>
        </div>

        <section
        class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/70"
        >
        <h2 class="text-2xl font-bold text-slate-900">Vistas del proyecto</h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <a
            class="rounded-3xl bg-sky-50 p-5 hover:bg-sky-100"
            href="/dashboard"
            >
            <p class="text-sm font-semibold text-blue-600">Dashboard</p>
            <p class="mt-2 text-sm text-slate-600">
                Resumen principal de productividad.
            </p>
            </a>
            <a
            class="rounded-3xl bg-sky-50 p-5 hover:bg-sky-100"
            href="/tasks"
            >
            <p class="text-sm font-semibold text-blue-600">Mis tareas</p>
            <p class="mt-2 text-sm text-slate-600">CRUD principal del usuario.</p>
            </a>
            <a
            class="rounded-3xl bg-sky-50 p-5 hover:bg-sky-100"
            href="/profile"
            >
            <p class="text-sm font-semibold text-blue-600">Mi perfil</p>
            <p class="mt-2 text-sm text-slate-600">
                Actualizar cuenta y datos personales.
            </p>
            </a>
            <a
            class="rounded-3xl bg-sky-50 p-5 hover:bg-sky-100"
            href="/admin"
            >
            <p class="text-sm font-semibold text-blue-600">Admin</p>
            <p class="mt-2 text-sm text-slate-600">
                Gestion de usuarios y roles.
            </p>
            </a>
        </div>
        </section>
    </section>
    </main>`;
}
