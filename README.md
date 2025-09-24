# Todo App Frontend

Una aplicación moderna de gestión de tareas (TODO) construida con React + Vite y Tailwind CSS. Esta aplicación se conecta a un backend externo mediante APIs REST para gestionar las tareas de manera eficiente.

## 🚀 Características

- **Interfaz moderna y responsive** con Tailwind CSS
- **Gestión completa de TODOs** (Crear, Leer, Actualizar, Eliminar)
- **Filtrado avanzado** por estado, prioridad y búsqueda de texto
- **Paginación** para manejar grandes cantidades de datos
- **Validación de formularios** con React Hook Form y Yup
- **Notificaciones** en tiempo real con React Hot Toast
- **Fechas de vencimiento** con indicadores visuales
- **Prioridades** con códigos de color
- **Arquitectura profesional** con separación de responsabilidades

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de interfaces de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **Tailwind CSS** - Framework de CSS utilitario
- **React Hook Form** - Manejo de formularios
- **Yup** - Validación de esquemas
- **Axios** - Cliente HTTP para APIs
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos
- **Date-fns** - Manipulación de fechas

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de interfaz base
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   └── ...
│   └── todo/           # Componentes específicos de TODO
│       ├── TodoForm.jsx
│       ├── TodoItem.jsx
│       ├── TodoList.jsx
│       └── ...
├── hooks/              # Hooks personalizados
│   └── useTodos.js
├── pages/              # Páginas de la aplicación
│   └── TodoPage.jsx
├── services/           # Servicios de API
│   ├── apiService.js
│   └── todoService.js
├── utils/              # Utilidades y helpers
│   ├── dateUtils.js
│   └── todoUtils.js
└── App.jsx            # Componente principal
```

## 🚦 Instalación y Configuración

### Prerequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Editar `.env` con la URL de tu backend:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173`

## 📡 API Backend

La aplicación espera un backend que implemente los siguientes endpoints:

### Endpoints de TODO

- `GET /api/todos` - Obtener todos los TODOs (con paginación y filtros)
- `GET /api/todos/:id` - Obtener un TODO específico
- `POST /api/todos` - Crear un nuevo TODO
- `PUT /api/todos/:id` - Actualizar un TODO completo
- `PATCH /api/todos/:id/toggle` - Cambiar estado de completado
- `DELETE /api/todos/:id` - Eliminar un TODO

### Estructura de Datos

```javascript
const todo = {
  id: 1,
  title: "Ejemplo de TODO",
  description: "Esta es una tarea de ejemplo",
  completed: false,
  priority: "medium", // 'low', 'medium', 'high'
  createdAt: "2025-09-23T00:00:00.000Z",
  updatedAt: "2025-09-23T00:00:00.000Z",
  dueDate: "2025-09-25T00:00:00.000Z"
};
```

### Parámetros de Query (GET /api/todos)

- `page` - Número de página
- `limit` - Elementos por página
- `status` - 'all', 'completed', 'pending'
- `priority` - 'all', 'low', 'medium', 'high'
- `search` - Texto de búsqueda

## 🚀 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Preview de la build de producción
- `npm run lint` - Ejecutar ESLint

## 📱 Funcionalidades Implementadas

### Gestión de TODOs
- ✅ Crear nuevos TODOs con título, descripción, prioridad y fecha límite
- ✅ Marcar TODOs como completados/pendientes
- ✅ Eliminar TODOs con confirmación
- ✅ Visualizar TODOs con indicadores de prioridad y estado

### Filtrado y Búsqueda
- ✅ Búsqueda por texto en título y descripción
- ✅ Filtrar por estado (todos, completados, pendientes)
- ✅ Filtrar por prioridad (baja, media, alta)
- ✅ Limpiar filtros rápidamente

### Interfaz de Usuario
- ✅ Diseño completamente responsive
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Notificaciones toast para feedback
- ✅ Estados de carga con spinners
- ✅ Paginación para grandes datasets

## 🛠️ Backend de Prueba

Si no tienes un backend disponible, puedes usar `json-server`:

```bash
# Instalar json-server globalmente
npm install -g json-server

# Crear archivo db.json con datos de prueba
# Ejecutar el servidor
json-server --watch db.json --port 3000

# Actualizar .env
VITE_API_URL=http://localhost:3000
```