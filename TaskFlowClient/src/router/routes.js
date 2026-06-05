import { renderHome } from "../views/home";
import { renderLogin, setupLogin } from "../views/auth/login";
import { renderRegister, setupRegister } from "../views/auth/register";
import { renderDashboard, setupDashboard } from "../views/app/dashboard";
import { renderTasks, setupTasksView } from "../views/tasks/tasks";
import { renderTaskForm, setupTasksFormView } from "../views/tasks/taskForm";
import { renderProfile, setupProfileView } from "../views/users/profile";
import { renderAdmin, setupAdminView } from "../views/users/admin";
import { renderNotFound } from "../views/notFound";


export const routes = {
    "/": {
        render: renderHome,
        requiresAuth: false,
    },
    "/login": {
        render: renderLogin,
        setup: setupLogin,
        requiresAuth: false,
        redirectIfAuthenticated: true,
    },
    "/register": {
        render: renderRegister,
        setup: setupRegister,
        requiresAuth: false,
        redirectIfAuthenticated: true,
    },
    "/dashboard": {
        render: renderDashboard,
        setup: setupDashboard,
        requiresAuth: true,
    },
    "/tasks": {
        render: renderTasks,
        requiresAuth: true,
        setup: setupTasksView,
    },
    "/tasks/new": {
        render: renderTaskForm,
        requiresAuth: true,
        setup: setupTasksFormView,
    },
    "/tasks/edit/:id": {
        render: renderTaskForm,
        requiresAuth: true,
        setup: setupTasksFormView,
    },
    "/profile": {
        render: renderProfile,
        requiresAuth: true,
        setup: setupProfileView,
    },
    "/admin": {
        render: renderAdmin,
        requiresAuth: true,
        allowedRoles: ["ADMIN"],
        setup: setupAdminView,
    }
}

export const notFoundView = renderNotFound;