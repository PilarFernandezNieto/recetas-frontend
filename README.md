# 📖 Libro de Recetas — Frontend

Aplicación web desarrollada con **Vue 3** y **Vite** que actúa como frontend para la aplicación _Libro de Recetas_. Permite consultar recetas públicamente y gestionar el contenido desde un panel de administración.

---

## 🗂️ Descripción general

El frontend consume la API REST del backend Laravel y ofrece:

- **Portada pública**: listado de recetas accesible sin autenticación.
- **Ficha de receta**: vista detallada de cada receta.
- **Autenticación**: registro e inicio de sesión mediante Sanctum (cookies de sesión).
- **Panel de administración** (acceso restringido a administradores):
  - Gestión de recetas
  - Gestión de ingredientes
  - Gestión de categorías
  - Gestión de usuarios

### Estructura principal

```
src/
├── views/
│   ├── Home.vue               # Portada pública con listado de recetas
│   ├── FichaRecetaPortada.vue # Detalle de una receta
│   ├── Dashboard.vue          # Panel principal tras el login
│   ├── admin/                 # Vistas del panel de administración
│   │   ├── recetas/
│   │   ├── ingredientes/
│   │   ├── categorias/
│   │   └── usuarios/
│   └── auth/                  # Vistas de login y registro
├── stores/                    # Estado global con Pinia
├── router/                    # Rutas y middleware de autenticación
├── components/                # Componentes reutilizables
└── layouts/                   # Layouts (público y autenticado)
```

---

## ⚙️ Requisitos previos

- **Node.js** >= 18
- **npm**
- El backend (`recetas-backend`) en ejecución en `http://localhost:8000`

---

## 🚀 Instalación y puesta en marcha (desarrollo)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar el entorno

Copia el archivo de ejemplo y edítalo:

```bash
cp .env.example .env.local
```

Variables clave en `.env.local`:

```dotenv
VITE_APP_BACKEND_URL=http://localhost:8000
VITE_APP_NAME="Libro de Recetas"
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

> El frontend quedará disponible en **http://localhost:5173**

---

## 🔗 Backend relacionado

El backend (Laravel 11 + Sanctum) se encuentra en la carpeta `recetas-backend`. Consulta su propio `README.md` para iniciarlo antes de arrancar el frontend.

---

## 🛠️ Tecnologías utilizadas

| Tecnología       | Versión  |
| ---------------- | -------- |
| Vue              | ^3.3.4   |
| Vite             | ^4.3.9   |
| Vue Router       | ^4.2.2   |
| Pinia            | ^2.1.3   |
| Tailwind CSS     | ^3.3.2   |
| Flowbite Vue     | ^0.1.9   |
| Axios            | ^1.4.0   |

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
