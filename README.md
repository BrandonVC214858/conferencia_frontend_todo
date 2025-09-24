# 📋 Todo App - Aplicación de Gestión de Tareas

Una aplicación moderna y completamente responsiva para la gestión de tareas (TODOs) construida con **React 19 + Vite**, **Tailwind CSS** y **FastAPI** como backend. Diseñada con arquitectura profesional, componentes reutilizables y una experiencia de usuario excepcional.

## ✨ Características Principales

- 🎨 **Interfaz moderna y completamente responsiva** - Optimizada para móviles, tablets y desktop
- 🔄 **Gestión completa de TODOs** - CRUD completo con FastAPI backend
- 🔍 **Filtrado avanzado** - Por estado, búsqueda de texto y filtros combinados
- 📊 **Dashboard con estadísticas** - Contadores en tiempo real de tareas pendientes y completadas
- ✅ **Estados de carga inteligentes** - Feedback visual durante todas las operaciones
- 🔔 **Notificaciones toast** - Feedback inmediato para acciones del usuario
- 🕐 **Fechas relativas inteligentes** - Manejo automático de timezones UTC
- 🎯 **Validación robusta** - React Hook Form + Yup para formularios
- 🌟 **Health Check integrado** - Monitor de estado de conexión con la API
- ♿ **Accesibilidad completa** - ARIA labels, tooltips y navegación por teclado

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Biblioteca de interfaces de usuario con las últimas características
- **Vite** - Herramienta de desarrollo ultrarrápida
- **Tailwind CSS** - Framework CSS utilitario para diseño responsivo
- **React Hook Form** - Manejo eficiente de formularios
- **Yup** - Validación de esquemas y datos
- **Axios** - Cliente HTTP con interceptores personalizados
- **React Hot Toast** - Sistema de notificaciones elegante
- **Lucide React** - Iconos SVG modernos y optimizados
- **Date-fns** - Manipulación y formateo de fechas

### Backend
- **FastAPI** - Framework Python para APIs REST de alto rendimiento
- **Integración UTC** - Manejo correcto de zonas horarias

## 📁 Arquitectura del Proyecto

```
📦 src/
├── 🎯 components/              # Componentes reutilizables
│   ├── 🧩 ui/                 # Sistema de Design Components
│   │   ├── Button.jsx         # Botón con múltiples variantes
│   │   ├── Card.jsx           # Contenedor de tarjetas
│   │   ├── Input.jsx          # Input con validación
│   │   ├── Select.jsx         # Select personalizado
│   │   ├── Textarea.jsx       # Textarea con autosize
│   │   ├── LoadingSpinner.jsx # Spinner de carga
│   │   └── HealthCheck.jsx    # Monitor de estado de API
│   └── 📋 todo/               # Componentes específicos de TODO
│       ├── TodoForm.jsx       # Formulario crear/editar (con validación)
│       ├── TodoItem.jsx       # Item individual responsivo
│       ├── TodoList.jsx       # Lista de todos con estados
│       ├── TodoFilters.jsx    # Sistema de filtrado avanzado
│       └── Pagination.jsx     # Paginación con navegación
├── 🎣 hooks/                  # Custom React Hooks
│   └── useTodos.js           # Hook principal para manejo de estado
├── 📄 pages/                  # Páginas de la aplicación
│   └── TodoPage.jsx          # Página principal orquestadora
├── 🌐 services/              # Capa de servicios y API
│   ├── apiService.js         # Cliente HTTP con interceptores
│   └── todoService.js        # Operaciones CRUD de TODOs
├── 🛠️ utils/                 # Utilidades y helpers
│   ├── dateUtils.js          # Funciones de fechas con timezone
│   └── todoUtils.js          # Utilidades específicas de TODOs
└── 📱 App.jsx                # Componente raíz con providers
```

## � Instalación y Configuración

### 📋 Prerequisitos
- **Node.js 18+** - Runtime de JavaScript
- **npm o yarn** - Gestor de paquetes
- **FastAPI Backend** - API backend corriendo en puerto 8000

### 🔧 Instalación

1. **Clonar y configurar el proyecto**
   ```bash
   git clone <repository-url>
   cd conferencia_frontend_todo
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Editar `.env`:
   ```env
   # Configuración de API - FastAPI Backend
   VITE_API_URL=http://localhost:8000
   VITE_API_TIMEOUT=10000
   
   # Configuración de desarrollo
   VITE_NODE_ENV=development
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   🌐 Aplicación disponible en: `http://localhost:5173`

## � Integración con FastAPI

### 📡 Endpoints Implementados

| Método | Endpoint | Descripción | Implementado |
|--------|----------|-------------|--------------|
| `GET` | `/todos` | Obtener todos los TODOs | ✅ |
| `POST` | `/todos` | Crear nuevo TODO | ✅ |
| `PUT` | `/todos/{id}` | Actualizar TODO completo | ✅ |
| `PATCH` | `/todos/{id}/toggle` | Toggle estado completado | ✅ |
| `DELETE` | `/todos/{id}` | Eliminar TODO | ✅ |
| `GET` | `/health` | Health check de API | ✅ |

### 📊 Estructura de Datos

```typescript
interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO 8601 UTC (ej: "2025-09-24T19:56:15.784244")
}

// Ejemplo de TODO
{
  "id": 1,
  "title": "Implementar autenticación",
  "description": "Añadir sistema de login con JWT",
  "completed": false,
  "createdAt": "2025-09-24T19:56:15.784244"
}
```

### 🌍 Manejo de Timezones
- ✅ **FastAPI envía fechas en UTC** sin sufijo 'Z'
- ✅ **Frontend detecta y corrige automáticamente** las fechas
- ✅ **Función `formatRelativeDateFromAPI`** maneja la conversión
- ✅ **Fechas relativas en español** ("hace 5 minutos", "hace 1 hora")

## 📱 Funcionalidades Implementadas

### ✅ Gestión de TODOs
- ➕ **Crear todos** con título y descripción opcional
- ✏️ **Editar todos** con formulario pre-rellenado
- 🔄 **Toggle completado/pendiente** con confirmación visual
- 🗑️ **Eliminar con confirmación** para prevenir errores accidentales
- 📊 **Estadísticas en tiempo real** (Total, Pendientes, Completados)

### 🔍 Sistema de Filtrado
- 🔎 **Búsqueda por texto** en títulos y descripciones
- 📋 **Filtro por estado** (Todos, Pendientes, Completados)
- 🧹 **Limpiar filtros** con un solo click
- 🏷️ **Indicadores visuales** de filtros activos

### 🎨 Interfaz y UX
- 📱 **Completamente responsivo** - Mobile-first design
- 🎯 **Diseño adaptativo** - Layout optimizado para cada dispositivo
- ⚡ **Estados de carga** - Spinners durante operaciones asíncronas
- 🔔 **Notificaciones toast** - Feedback inmediato y contextual
- 🎭 **Animaciones suaves** - Transiciones CSS para mejor UX
- 🖱️ **Interacciones intuitivas** - Hover states y feedback visual

### 🔧 Características Técnicas
- ✅ **Health Check** - Monitor de conexión con FastAPI
- ✅ **Manejo de errores** - Interceptores HTTP con retry logic
- ✅ **Validación de formularios** - Esquemas Yup con mensajes en español
- ✅ **Optimización de rendimiento** - Re-renders mínimos con React
- ✅ **Código documentado** - JSDoc completo en todos los archivos

## 📱 Responsividad

### 🎯 Breakpoints Optimizados
- 📱 **Mobile** (`< 640px`): Layout vertical, botones stack, iconos compactos
- 💻 **Desktop** (`≥ 640px`): Layout horizontal, texto completo, espaciado amplio

### 📐 Adaptaciones por Componente
- **📋 TodoItem**: Layout flexible que se apila en móvil
- **📝 TodoForm**: Botones de acción apilados en móvil
- **🔍 TodoFilters**: Grid responsivo 1→2 columnas
- **📊 Estadísticas**: Tarjetas compactas con texto escalable
- **🎯 Header**: Navegación que se colapsa en móvil

## 📜 Scripts Disponibles

```bash
# 🚀 Desarrollo
npm run dev          # Servidor de desarrollo con HMR

# 🏗️ Construcción
npm run build        # Build optimizado para producción
npm run preview      # Preview de la build de producción

# 🧹 Calidad de Código  
npm run lint         # ESLint para detectar errores
npm run lint:fix     # Auto-fix de problemas de linting
```

## 🚀 Despliegue

### � Build de Producción
```bash
npm run build
# Archivos optimizados generados en ./dist/
```

### 🌐 Variables de Entorno para Producción
```env
VITE_API_URL=https://api.tudominio.com
VITE_API_TIMEOUT=15000
VITE_NODE_ENV=production
```

## 🧪 Desarrollo y Debug

### 🐛 Herramientas de Debug
- **Console logs detallados** para fechas y timezone
- **Estados de carga visibles** en todos los componentes
- **Health check visual** del estado de la API
- **Error boundaries** para captura de errores

### 🔧 Funciones de Utilidad Debug
```javascript
// Debug de fechas con timezone
formatRelativeDateFromAPI(date) // Maneja UTC automáticamente
console.log('Debug fecha:', { raw, parsed, formatted });
```

## 🤝 Contribución

1. 🍴 Fork el proyecto
2. 🌿 Crea tu feature branch (`git checkout -b feature/nueva-caracteristica`)
3. 💾 Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. 📤 Push al branch (`git push origin feature/nueva-caracteristica`)  
5. 🔄 Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙋‍♂️ Soporte

- 📧 **Issues**: Crear issue en GitHub para bugs o features
- 📚 **Documentación**: JSDoc completo en el código fuente  
- 🛠️ **Debug**: Logs detallados en consola del navegador

---

🚀 **¡Proyecto completamente funcional y listo para producción!** ⭐

*Desarrollado con ❤️ usando React + FastAPI*