# TaskFlowSPA

TaskFlowSPA is a Single Page Application built with vanilla JavaScript, HTML, CSS, and Tailwind CSS. It simulates a modern task management and productivity system while serving as a hands-on project to learn frontend architecture without relying on frameworks like React, Vue, or Angular.

The app uses client-side routing with the History API to navigate between views without full page reloads, integrating authentication, role-based authorization, route guards, dynamic rendering, and data persistence with a fake backend powered by `json-server`.

To keep authentication simple for this first SPA, the active user session is managed with `localStorage`, while `json-server` handles persistent data.

## Project objective

This project is designed to practice key frontend development fundamentals:

- SPA routing.
- Modular frontend architecture.
- Separation of concerns.
- Basic state management.
- Route guards and access control.
- Component reusability.
- Scalability in vanilla JavaScript.

## Architecture

This project uses a simple layered architecture adapted for a vanilla JavaScript SPA.

The idea is to separate the application by responsibilities to make it easier to learn, maintain, and scale incrementally:

- `main.js` — application entry point.
- `router/` — SPA navigation and route guards.
- `views/` — screen components.
- `components/` — reusable UI pieces.
- `services/` — data, session, and API communication.
- `utils/` — helper functions.
- `styles/` — global styles.

## Tech stack

- Vanilla JavaScript (ES Modules)
- HTML5
- CSS3 + Tailwind CSS
- Vite
- JSON Server (fake backend)
- SweetAlert2
- bcryptjs

## Features

- User registration with bcrypt password hashing.
- Login and logout with session persistence in `localStorage`.
- Public and private routes with access guards.
- Role-based access control (`USER` / `ADMIN`).
- SPA navigation with the History API.
- Dynamic view rendering.
- Reusable components (navigation bar, buttons).
- Complete task CRUD with ownership validation.
- Profile editing for authenticated users.
- Account deletion for authenticated users.
- Admin panel: user management (role change, user deletion).
- Admin panel: task assignment to specific users.
- Dashboard with role-based statistics.
- Data persistence with `json-server`.
- SweetAlert2 toast notifications and confirmation dialogs.

## Roles

### `ADMIN`

- Full system access.
- Manages users (change roles, delete users).
- Views and manages all tasks.
- Can assign tasks to any user.
- Sees the creator name on each task.

### `USER`

- Creates, edits, and deletes their own tasks.
- Views only their own information.
- Edits their own profile.
- Deletes their own account.

## Route structure

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/login` | Public (redirects if authenticated) | Login page |
| `/register` | Public (redirects if authenticated) | Registration page |
| `/dashboard` | Authenticated | Main dashboard with stats |
| `/tasks` | Authenticated | Task list (own or all for admin) |
| `/tasks/new` | Authenticated | Create task form |
| `/tasks/edit/:id` | Authenticated | Edit task form |
| `/profile` | Authenticated | User profile editing |
| `/admin` | ADMIN only | User management panel |

## Quick start

1. Install dependencies:

```bash
cd TaskFlowClient
npm install
```

2. Install API dependencies:

```bash
cd TaskFlowAPI
npm install
```

3. Start the fake backend:

```bash
cd TaskFlowAPI
npm start
```

4. In a separate terminal, start the dev server:

```bash
cd TaskFlowClient
npm run dev
```

## Available scripts

- `npm run dev` — starts the Vite development server.
- `npm run build` — builds the production bundle.
- `npm run preview` — serves the production build locally.

## Fake backend

Data persistence is based on `json-server`. It simulates two resources:

- `users`
- `tasks`

Example responsibilities:
- Query users and validate credentials.
- Fetch and update the authenticated user's profile.
- Delete the authenticated user's account.
- Fetch tasks by user or globally (admin).
- Create, edit, and delete tasks.

## Session management

- `json-server` stores `users` and `tasks`.
- `localStorage` stores the active session (`SESSION_ACTUAL` key).
- No separate `sessions` collection in the fake backend.

## Business rules

- A `USER` can only manipulate their own tasks.
- A `USER` can only edit their own profile.
- A `USER` can delete their own account.
- An `ADMIN` can view and manage all tasks and users.
- Private routes do not render without a valid session.
- Authentication state is persisted in `localStorage`.
- Passwords are hashed with bcrypt before storage.

## Project structure

```
TaskFlowSPA/
  TaskFlowAPI/
    database.json
    package.json
  TaskFlowClient/
    index.html
    vite.config.ts
    package.json
    src/
      main.js
      router/
        router.js
        routes.js
      views/
        home.js
        notFound.js
        auth/
          login.js
          register.js
        app/
          dashboard.js
        tasks/
          tasks.js
          taskForm.js
        users/
          profile.js
          admin.js
      components/
        appNav.js
        atoms/
          buttonLink.js
      services/
        auth.service.js
        user.service.js
        task.service.js
      utils/
        alerts.js
        crypto.js
      styles/
        global.css
```

## License

This project is distributed under the license included in [`LICENSE`](./LICENSE).
