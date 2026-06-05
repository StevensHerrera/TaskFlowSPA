# TaskFlowSPA

TaskFlowSPA es una aplicacion web tipo SPA (Single Page Application) construida con JavaScript Vanilla, HTML, CSS y Tailwind CSS. Su objetivo es simular un sistema moderno de gestion de tareas y productividad mientras sirve como base practica para aprender arquitectura frontend sin depender de frameworks como React, Vue o Angular.

La aplicacion usara routing del lado del cliente con History API para navegar entre vistas sin recargar toda la pagina, integrando autenticacion, autorizacion por roles, proteccion de rutas, renderizado dinamico y persistencia de datos con un backend fake basado en `json-server`.

Para simplificar la autenticacion en esta primera SPA, la sesion activa del usuario se manejara con `localStorage`, mientras que `json-server` se utilizara para los datos persistentes del sistema.

## Objetivo del proyecto

Este proyecto esta pensado para practicar fundamentos clave del desarrollo frontend moderno:

- Routing SPA.
- Arquitectura frontend modular.
- Separacion de responsabilidades.
- Manejo de estado basico.
- Guards y proteccion de rutas.
- Reutilizacion de componentes.
- Escalabilidad en Vanilla JS.

## Tipo de arquitectura

Este proyecto usara una arquitectura frontend simple por capas (`layered architecture`) adaptada a una SPA en JavaScript Vanilla.

La idea es separar la aplicacion por responsabilidades para que sea mas facil de aprender, mantener y escalar poco a poco:

- `main.js` como punto de arranque.
- `router/` para la navegacion SPA.
- `views/` para las pantallas principales.
- `components/` para piezas reutilizables.
- `services/` para datos, sesion y comunicacion con el backend fake.
- `utils/` para funciones auxiliares.
- `styles/` para estilos globales y apoyo visual.

Esta decision busca que el equipo entienda primero como funciona una SPA antes de pasar a arquitecturas mas avanzadas o mas modulares por dominio.

## Stack principal

- JavaScript Vanilla
- HTML5
- CSS3
- Tailwind CSS
- Vite
- JSON Server como backend fake

## Funcionalidades previstas

- Inicio de sesion y cierre de sesion.
- Manejo de sesion del usuario.
- Rutas publicas y privadas.
- Sistema de roles y permisos.
- Navegacion SPA con `History API`.
- Renderizado dinamico de vistas.
- Componentes reutilizables.
- CRUD completo de tareas.
- Edicion de perfil del usuario autenticado.
- Eliminacion de la propia cuenta por parte del usuario autenticado.
- Dashboard principal con estadisticas basicas.
- Panel administrativo para usuarios `ADMIN`.
- Consumo de datos desde un backend fake con `json-server`.

## Roles iniciales

### `ADMIN`

- Puede gestionar usuarios.
- Puede visualizar todas las tareas.
- Puede modificar roles y permisos.
- Tiene acceso completo al sistema.

### `USER`

- Puede crear, editar y eliminar sus propias tareas.
- Puede visualizar solo la informacion relacionada con su cuenta.
- Puede editar su propio perfil.
- Puede eliminar su propia cuenta.

## Alcance funcional esperado

La SPA deberia incluir, como minimo, los siguientes modulos o vistas:

- `Login`
- `Dashboard`
- `Mis tareas`
- `Mi perfil`
- `Detalle o formulario de tarea`
- `Administracion de usuarios` solo para `ADMIN`
- `Pagina 404`

## Estructura sugerida

La estructura inicial del proyecto sera sencilla y progresiva:

```text
src/
  main.js
  router/
  views/
  components/
  services/
  utils/
  styles/
```

### Principios de arquitectura

- Cada modulo debe encargarse de una responsabilidad clara.
- Las vistas no deben contener toda la logica de negocio.
- El acceso al backend debe centralizarse en `services`.
- La logica de permisos debe aislarse en el sistema de routing o en utilidades de autorizacion.
- Los componentes compartidos deben ser reutilizables y faciles de identificar.
- Las vistas deben apoyarse en Tailwind CSS para mantener consistencia visual y velocidad de construccion.

## Flujo general de navegacion

1. El usuario entra a la aplicacion.
2. Si no tiene sesion activa, ve la vista de `login`.
3. Tras autenticarse, la sesion se guarda en `localStorage`.
4. El router redirige segun su estado de sesion y permisos.
5. Al recargar la app, la sesion se restaura desde `localStorage`.
6. Las rutas administrativas validan autenticacion y rol `ADMIN`.
7. Al cerrar sesion, los datos de sesion se eliminan del `localStorage`.

## Reglas de negocio base

- Un `USER` solo puede manipular sus propias tareas.
- Un `USER` solo puede editar su propio perfil.
- Un `USER` puede eliminar su propia cuenta.
- Un `ADMIN` puede ver y administrar todas las tareas y usuarios.
- Las rutas privadas no deben renderizarse si no existe una sesion valida.
- El estado de autenticacion debe persistirse de forma controlada en `localStorage`.

## Scripts disponibles

- `npm run dev`: levanta el entorno de desarrollo con Vite.
- `npm run build`: genera la version de produccion.
- `npm run preview`: sirve localmente el build generado.

## Inicio rapido

1. Instala dependencias:

```bash
npm install
```

2. Inicia la app en desarrollo:

```bash
npm run dev
```

3. En paralelo, cuando se agregue el backend fake, inicia `json-server` con el archivo de datos definido para el proyecto.

## Backend fake

La persistencia de datos del sistema estara basada en `json-server`. La idea es simular recursos como:

- `users`
- `tasks`

Ejemplo de responsabilidades del backend fake:

- Consultar usuarios.
- Validar credenciales de manera simulada.
- Consultar y actualizar perfil del usuario autenticado.
- Eliminar la cuenta del usuario autenticado.
- Obtener tareas por usuario.
- Crear, editar y eliminar tareas.
- Permitir consultas globales para administracion.

## Manejo de sesion

Para mantener el proyecto simple y enfocado en el aprendizaje:

- `json-server` se usara para `users` y `tasks`.
- `localStorage` se usara para guardar la sesion activa.
- No se manejara una coleccion `sessions` en el backend fake como parte del flujo principal.

Esto permite practicar autenticacion SPA sin agregar complejidad innecesaria en esta primera etapa.

## Criterios tecnicos del proyecto

- No usar frameworks SPA.
- Mantener una arquitectura simple por capas desde el inicio.
- Evitar mezclar DOM, reglas de negocio y acceso a datos en un mismo archivo.
- Priorizar codigo legible, escalable y facil de mantener.

## Estado actual

La base del proyecto ya esta montada con Vite. La implementacion funcional de la SPA se ira construyendo de forma progresiva, comenzando idealmente por:

1. Configuracion del router.
2. Layout base.
3. Modulo de autenticacion.
4. Guards de rutas.
5. Modulo de tareas.
6. Dashboard.
7. Panel administrativo.

## Licencia

Este proyecto se distribuye bajo la licencia incluida en [`LICENSE`](./LICENSE).
