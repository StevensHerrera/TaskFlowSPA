const API_URL = "http://localhost:3000/tasks";

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Error al crear la tarea");
  }

  return await response.json();
}

export async function getTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }

  return await response.json();
}

export async function getTasksByUserId(userId) {
  const response = await fetch(`${API_URL}?userId=${userId}`);

  if (!response.ok) {
    throw new Error("Error al obtener las tareas del usuario");
  }

  return await response.json();
}

export async function getTaskById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener la tarea");
  }

  return await response.json();
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la tarea");
  }

  return await response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea");
  }

  return true;
}
