# Laravel API Breeze - Edición Vite + Vue 3 🏝️

## Introducción

Este repositorio es una implemetnación del kit de inicio de aplicación/autenticación[Laravel API Breeze](https://laravel.com/docs/starter-kits) con frontend en [Vue](https://vuejs.org).

## Configuración de entorno recomendado

Usa [VSCode](https://code.visualstudio.com/) junto con [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y desactiva Vetur) y el [plugin TypeScript Vue para Volar](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Documentación oficial

### Instalación

Primero crea un backend de Laravel instalando **Laravel API Breeze** en una [nueva aplicación Laravel](https://laravel.com/docs/installation) e instala el scaffolding de la API de Breeze.

```bash
# Crear la apliación Laravel...
laravel new vue-backend

cd vue-backend

# Instalar Breeze y sus dependecias...
composer require laravel/breeze --dev

php artisan breeze:install api

# Ejecutar las migraciones de base de datos...
php artisan migrate
```

A continuación, asegúrate de que las variables de entorno APP_URL y FRONTEND_URL de tu aplicación estén configuradas en http://localhost:8000 y http://localhost:3000, respectivamente.

Después de definir las variables de entorno, puedes servir la aplicación de Laravel usando el comando Artisan `serve`:

```bash
#  Servir la aplicación...
php artisan serve
```

Luego, clona este repositorio e instala sus dependecias con `yarn install`o `npm install`.

Después, copia el archivo `.env.example`a `.env`y especifia la URL de tu backend:

```ini
VITE_APP_BACKEND_URL=http://localhost:8000
```

Finalmente, ejecuta la aplicación con:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`:

> Nota: Actualmente se recomienda usar `localhost`tanto para el backend como para el frontend durante el desarrollo local, a fin de evitar problemas de CORS o de 'Same-Origin'.

### Middleware de Autenticación

Esta aplicación Vue incluye un *middleware* personalizado llamado `auth`, diseñado para abstraer toda la lógica de autenticación fuera de tus páginas.

Además, el middleware puede usarse para acceder al usuario autenticado actualmente:

```js
// Primero crea una ruta dentro del archivo router/index.js
{
    path: '/example-page',
    name: 'example-page',
    meta: { title: 'Example Page', middleware: ['auth'] },
    component: () => import('../views/ExamplePage.vue'),
},
```

```js
// views/ExamplePage.vue
<script lang="ts" setup>
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
import { useAuthStore } from '../stores/auth'

const { user, logout } = useAuthStore()
</script>

<template>
  <AuthenticatedLayout>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-10">
        <p>{{ user?.name }}</p>

        <button @click="logout()">Sign out</button>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped></style>
```

> Nota: Debes usar [encadenamiento opcional](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Optional_chaining)(`user?.name` en lugar de `user.name`) al acceder a propiedades del objeto `user` para manejar el renderizado del lado del servidor en Vue.

## Contribución

Las contribuciones están abiertas.

Crea un *Pull Request* y se añadirá al proyecto si cumple los requisitos de calidad.

## Licencia

Laravel API Breeze Vite + Vue 3 es un software de código abierto bajo la licencia de [MIT license](LICENSE).
