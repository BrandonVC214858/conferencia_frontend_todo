/**
 * 📋 UTILIDADES PARA MANEJO DE TODOS
 * 
 * Este archivo contiene funciones utilitarias para la manipulación, 
 * formateo y organización de todos en el frontend. Estas funciones
 * ayudan con la presentación visual y el procesamiento de datos.
 * 
 * Funcionalidades:
 * - Colores dinámicos según prioridad
 * - Íconos para diferentes prioridades
 * - Ordenamiento por prioridad y estado
 * - Filtrado de todos por estado
 */

/**
 * 🎨 OBTENER COLOR DE PRIORIDAD
 * 
 * Retorna clases CSS de Tailwind para colorear elementos según la prioridad del todo.
 * Utiliza un esquema de colores semafórico: rojo (alta), amarillo (media), verde (baja).
 * 
 * @param {string} priority - Nivel de prioridad ('high', 'medium', 'low')
 * @returns {string} - Clases CSS de Tailwind para background, text y border
 * 
 * @example
 * getPriorityColor('high')   // "bg-red-100 text-red-800 border-red-200"
 * getPriorityColor('medium') // "bg-yellow-100 text-yellow-800 border-yellow-200"
 * getPriorityColor('low')    // "bg-green-100 text-green-800 border-green-200"
 * getPriorityColor('other')  // "bg-gray-100 text-gray-800 border-gray-200"
 */
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';      // Rojo para alta prioridad
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Amarillo para media prioridad
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';    // Verde para baja prioridad
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';       // Gris por defecto
  }
};

/**
 * 🔴 OBTENER ÍCONO DE PRIORIDAD
 * 
 * Retorna un emoji que representa visualmente la prioridad del todo.
 * Ayuda a identificar rápidamente la importancia de las tareas.
 * 
 * @param {string} priority - Nivel de prioridad ('high', 'medium', 'low')
 * @returns {string} - Emoji representativo de la prioridad
 * 
 * @example
 * getPriorityIcon('high')   // "🔴" (círculo rojo)
 * getPriorityIcon('medium') // "🟡" (círculo amarillo)
 * getPriorityIcon('low')    // "🟢" (círculo verde)
 * getPriorityIcon('other')  // "⚪" (círculo blanco)
 */
export const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'high':
      return '🔴'; // Círculo rojo para alta prioridad
    case 'medium':
      return '🟡'; // Círculo amarillo para media prioridad
    case 'low':
      return '🟢'; // Círculo verde para baja prioridad
    default:
      return '⚪'; // Círculo blanco por defecto
  }
};

/**
 * 📊 ORDENAR TODOS POR PRIORIDAD
 * 
 * Ordena un array de todos priorizando por:
 * 1. Estado: Todos pendientes primero, completados al final
 * 2. Prioridad: Alta > Media > Baja (dentro de cada grupo de estado)
 * 
 * No modifica el array original, retorna una nueva copia ordenada.
 * 
 * @param {Array} todos - Array de objetos todo a ordenar
 * @returns {Array} - Nueva array de todos ordenada
 * 
 * @example
 * const todos = [
 *   { id: 1, priority: 'low', completed: false },
 *   { id: 2, priority: 'high', completed: true },
 *   { id: 3, priority: 'high', completed: false }
 * ];
 * sortTodosByPriority(todos);
 * // Resultado: [todo3 (high, pending), todo1 (low, pending), todo2 (high, completed)]
 */
export const sortTodosByPriority = (todos) => {
  // Mapeo de prioridades a valores numéricos para ordenamiento
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...todos].sort((a, b) => {
    // Primero ordenar por estado: pendientes primero
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Todos completados van al final
    }
    
    // Dentro del mismo estado, ordenar por prioridad (alta a baja)
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

/**
 * 🔍 FILTRAR TODOS POR ESTADO
 * 
 * Filtra un array de todos basándose en su estado de completado.
 * Útil para mostrar solo todos completados, pendientes, o todos.
 * 
 * @param {Array} todos - Array de objetos todo a filtrar
 * @param {string} filter - Tipo de filtro ('completed', 'pending', 'all')
 * @returns {Array} - Array filtrada de todos
 * 
 * @example
 * const todos = [
 *   { id: 1, completed: true },
 *   { id: 2, completed: false },
 *   { id: 3, completed: true }
 * ];
 * 
 * filterTodos(todos, 'completed'); // [todo1, todo3]
 * filterTodos(todos, 'pending');   // [todo2]
 * filterTodos(todos, 'all');       // [todo1, todo2, todo3]
 */
export const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed);   // Solo todos completados
    case 'pending':
      return todos.filter(todo => !todo.completed);  // Solo todos pendientes
    default:
      return todos; // Devolver todos sin filtrar
  }
};