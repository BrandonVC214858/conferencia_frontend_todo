# 📋 Frontend Todo App - FastAPI Integration

Una aplicación de todos moderna desarrollada con **React + Vite** y **Tailwind CSS**, completamente integrada con los endpoints de **FastAPI**.

## 🚀 Características

- ✅ Interfaz moderna y responsiva con Tailwind CSS
- 🔄 Integración completa con FastAPI backend
- 📝 Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar)
- 🔍 Filtrado y búsqueda en tiempo real
- 📱 Health check para monitorear conexión con la API
- 🎨 Componentes UI reutilizables
- ⚡ Manejo de estados optimizado con hooks personalizados
- 🛡️ Validación de formularios con Yup
- 🔔 Notificaciones con React Hot Toast

## 🛠️ Tecnologías

- **Frontend**: React 19, Vite, Tailwind CSS
- **Gestión de estado**: React Hooks personalizados
- **Formularios**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Iconos**: Lucide React
- **Notificaciones**: React Hot Toast
- **Backend**: FastAPI (Python)

## 📋 Endpoints de FastAPI Soportados

```
Base URL: http://localhost:8000

GET    /todos        - Listar todos los todos
POST   /todos        - Crear un nuevo todo  
GET    /todos/{id}   - Obtener un todo específico
PUT    /todos/{id}   - Actualizar un todo
DELETE /todos/{id}   - Eliminar un todo
GET    /health       - Health check
```

## 📊 Estructura de Datos

### Todo Object (FastAPI Response)
```json
{
  "id": 1,
  "title": "Mi tarea",
  "description": "Descripción de la tarea",
  "completed": false,
  "created_at": "2025-09-24T10:00:00Z",
  "updated_at": "2025-09-24T10:00:00Z"
}
```

### Crear Todo (POST /todos)
```json
{
  "title": "Mi nueva tarea",
  "description": "Descripción opcional",
  "completed": false
}
```

### Actualizar Todo (PUT /todos/{id})
```json
{
  "title": "Título actualizado", 
  "description": "Nueva descripción",
  "completed": true
}
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── todo/
│   │   ├── TodoForm.jsx          # Formulario crear/editar
│   │   ├── TodoItem.jsx          # Item individual
│   │   ├── TodoList.jsx          # Lista de todos
│   │   ├── TodoFilters.jsx       # Filtros y búsqueda  
│   │   └── Pagination.jsx        # Paginación
│   └── ui/
│       ├── Button.jsx            # Botón reutilizable
│       ├── Input.jsx             # Input reutilizable
│       ├── Card.jsx              # Card reutilizable
│       ├── HealthCheck.jsx       # Monitor de conexión API
│       └── ...
├── hooks/
│   └── useTodos.js               # Hook personalizado para todos
├── services/
│   ├── apiService.js             # Cliente HTTP base
│   └── todoService.js            # Servicio todos + validación
├── utils/
│   ├── dateUtils.js              # Utilidades de fechas
│   └── todoUtils.js              # Utilidades todos
└── pages/
    └── TodoPage.jsx              # Página principal
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Development Configuration  
VITE_APP_TITLE=Todo App
VITE_APP_VERSION=1.0.0

# Health Check Configuration
VITE_HEALTH_CHECK_INTERVAL=30000
```

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🔧 Configuración del Backend

Asegúrate de que tu backend FastAPI tenga **CORS habilitado** para permitir requests desde el frontend:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔄 Características de Integración

### 1. Manejo de Errores Avanzado
```javascript
// Manejo específico de errores FastAPI
if (status === 404) {
    apiError.message = 'Todo no encontrado';
} else if (status === 422) {
    apiError.message = 'Datos inválidos';
    // Incluye detalles de validación de FastAPI
}
```

### 2. Health Check Automático
- Monitoreo automático de conexión con la API
- Indicador visual del estado de conexión
- Reconexión automática en caso de falla

### 3. Validación Cliente-Servidor
```javascript
// Validación en frontend (antes de enviar)
validateTodo(todoData) {
    const errors = {};
    
    if (!todoData.title || todoData.title.trim().length === 0) {
        errors.title = 'El título es requerido';
    }
    
    if (todoData.title && todoData.title.length > 255) {
        errors.title = 'El título no puede exceder 255 caracteres';
    }
    
    return { isValid: Object.keys(errors).length === 0, errors };
}
```

### 4. Estado Optimista
- Actualizaciones locales inmediatas para mejor UX
- Rollback automático en caso de error
- Sincronización con servidor

## 🎯 Funcionalidades

- ✅ **Crear todos** - Formulario con validación completa
- ✅ **Listar todos** - Con paginación y filtros
- ✅ **Actualizar todos** - Edición inline y cambio de estado
- ✅ **Eliminar todos** - Con confirmación
- ✅ **Buscar** - Búsqueda en título y descripción  
- ✅ **Filtrar** - Por estado (completado/pendiente)
- ✅ **Health Check** - Monitor de estado de API

## 🚀 Desarrollo

### Comandos Disponibles

```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Build para producción
npm run preview  # Preview de la build
npm run lint     # Linter ESLint
```

### URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000  
- **API Docs**: http://localhost:8000/docs

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Implementación

- El proyecto está optimizado para trabajar con la estructura básica de FastAPI
- Se incluye manejo de errores específico para códigos HTTP 404, 422, etc.
- Los filtros y la paginación se manejan del lado del cliente para simplicidad
- El health check ayuda a identificar problemas de conectividad con la API
- Los formularios incluyen validación tanto client-side como preparación para server-side

¡Listo para usar con tu backend FastAPI! 🎉