 export async function createUser(user) {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Error al crear usuario");
  }

  return await response.json();
}

export async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }
  return await response.json();
}

export async function getUserById(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener el usuario");
  }
  return await response.json();
}

export async function getUserByEmail(email) {
  const response = await fetch(`http://localhost:3000/users?email=${email}`);
  if (!response.ok) {
    throw new Error("Error al obtener el usuario");
  }

  const users = await response.json();

  return users[0] || null;
}

export async function updateUser(id, user) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el usuario");
  }

  return await response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el usuario");
  }

  return true;
}

// export const userService = {
//   createUser,
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// };

