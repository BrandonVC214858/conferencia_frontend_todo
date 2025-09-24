/**
 * 🎣 HOOK PERSONALIZADO PARA MANEJO DE TODOS
 * 
 * Este hook encapsula toda la lógica de estado y operaciones relacionadas con los todos.
 * Proporciona una interfaz limpia para los componentes React sin que tengan que 
 * manejar directamente las llamadas a la API, estados de carga, errores, etc.
 * 
 * Funcionalidades:
 * - Estado de todos con paginación y filtros
 * - Operaciones CRUD (crear, actualizar, eliminar, alternar)
 * - Manejo de estados de carga y errores
 * - Filtrado y búsqueda client-side
 * - Paginación client-side
 * - Notificaciones automáticas con toast
 */

import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services';
import toast from 'react-hot-toast';

/**
 * Hook personalizado para el manejo completo de todos
 * 
 * @param {Object} initialFilters - Filtros iniciales para los todos
 * @param {string} initialFilters.status - Estado inicial ('all', 'completed', 'pending')
 * @param {string} initialFilters.search - Término de búsqueda inicial
 * @param {number} pageSize - Cantidad de todos por página (default: 10)
 * 
 * @returns {Object} - Objeto con estados y funciones para manejar todos
 */
export const useTodos = (initialFilters = {}, pageSize = 10) => {
  // 📊 ESTADOS DEL HOOK
  
  /** @type {Array} Lista de todos filtrados y paginados */
  const [todos, setTodos] = useState([]);
  
  /** @type {boolean} Indica si se están cargando los datos */
  const [loading, setLoading] = useState(true);
  
  /** @type {string|null} Mensaje de error si algo sale mal */
  const [error, setError] = useState(null);
  
  /** @type {number} Número total de todos (después del filtrado) */
  const [total, setTotal] = useState(0);
  
  /** @type {number} Número total de páginas */
  const [totalPages, setTotalPages] = useState(0);
  
  /** @type {number} Página actual (1-indexed) */
  const [currentPage, setCurrentPage] = useState(1);
  
  /** @type {Object} Filtros activos */
  const [filters, setFilters] = useState({
    status: 'all',        // 'all', 'completed', 'pending'
    search: '',           // Término de búsqueda
    ...initialFilters     // Sobrescribir con filtros iniciales si se proporcionan
  });

  /**
   * 📖 OBTENER Y PROCESAR TODOS
   * 
   * Esta función:
   * 1. Llama a la API para obtener todos los todos
   * 2. Transforma los datos de FastAPI al formato esperado por el frontend
   * 3. Aplica filtros del lado del cliente
   * 4. Aplica paginación del lado del cliente
   * 5. Actualiza los estados correspondientes
   * 
   * Se usa useCallback para evitar re-renderizados innecesarios
   */
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 🌐 LLAMADA A LA API
      // FastAPI devuelve un array directamente
      const response = await todoService.getTodos();
      let todosData = Array.isArray(response) ? response : [];

      // 🔄 TRANSFORMACIÓN DE DATOS
      // Convertir estructura de FastAPI a estructura esperada por el frontend
      const transformedTodos = todosData.map(todo => ({
        id: todo.id,
        title: todo.title,
        description: todo.description || '',
        completed: todo.completed || false,
        // Valores por defecto para campos no presentes en FastAPI básico
        priority: 'medium',
        dueDate: null,
        createdAt: todo.created_at || new Date().toISOString(),
        updatedAt: todo.updated_at || new Date().toISOString(),
      }));

      // 🔍 APLICAR FILTROS DEL LADO DEL CLIENTE
      let filteredTodos = transformedTodos;
      
      // Filtro por estado (completado/pendiente)
      if (filters.status !== 'all') {
        filteredTodos = filteredTodos.filter(todo => {
          if (filters.status === 'completed') return todo.completed;
          if (filters.status === 'pending') return !todo.completed;
          return true;
        });
      }

      // Filtro por búsqueda (título y descripción)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredTodos = filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(searchTerm) ||
          (todo.description && todo.description.toLowerCase().includes(searchTerm))
        );
      }

      // 📄 APLICAR PAGINACIÓN DEL LADO DEL CLIENTE
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      const paginatedTodos = filteredTodos.slice(start, end);
      const calculatedTotalPages = Math.ceil(filteredTodos.length / pageSize);
      
      // 💾 ACTUALIZAR ESTADOS
      setTodos(paginatedTodos);
      setTotal(filteredTodos.length);
      setTotalPages(calculatedTotalPages);
      
    } catch (err) {
      // 🚨 MANEJO DE ERRORES
      setError(err.message || 'Error al cargar los todos');
      toast.error('Error al cargar los todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filters]); // Dependencias para re-ejecutar cuando cambien

  // 🔄 EFECTO PARA CARGAR DATOS
  // Se ejecuta cuando cambian las dependencias del fetchTodos
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  /**
   * 📝 CREAR UN NUEVO TODO
  /**
   * 📝 CREAR NUEVO TODO
   * 
   * @param {Object} todoData - Datos del nuevo todo
   * @returns {Promise<void>}
   */
  const createTodo = async (todoData) => {
    try {
      await todoService.createTodo(todoData);
      toast.success('Todo creado exitosamente');
      // Re-cargar la lista para mostrar el nuevo todo
      await fetchTodos();
    } catch (err) {
      toast.error(err.message || 'Error al crear el todo');
      throw err; // Re-lanzar para que el componente pueda manejarlo si es necesario
    }
  };

  /**
   * ✏️ ACTUALIZAR UN TODO EXISTENTE
   * 
   * @param {number|string} id - ID del todo a actualizar
   * @param {Object} todoData - Nuevos datos del todo
   * @returns {Promise<void>}
   */
  const updateTodo = async (id, todoData) => {
    try {
      await todoService.updateTodo(id, todoData);
      toast.success('Todo actualizado exitosamente');
      // Re-cargar la lista para mostrar los cambios
      await fetchTodos();
    } catch (err) {
      toast.error(err.message || 'Error al actualizar el todo');
      throw err;
    }
  };

  /**
   * 🗑️ ELIMINAR UN TODO
   * 
   * @param {number|string} id - ID del todo a eliminar
   * @returns {Promise<void>}
   */
  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      toast.success('Todo eliminado exitosamente');
      // Re-cargar la lista para reflejar la eliminación
      await fetchTodos();
    } catch (err) {
      toast.error(err.message || 'Error al eliminar el todo');
      throw err;
    }
  };

  /**
   * 🔄 ALTERNAR ESTADO DE COMPLETADO
   * 
   * Cambia un todo de completado a pendiente o viceversa
   * 
   * @param {number|string} id - ID del todo a alternar
   * @returns {Promise<void>}
   */
  const toggleTodo = async (id) => {
    try {
      await todoService.toggleTodo(id);
      // No mostrar toast para toggle (acción muy frecuente)
      // Re-cargar la lista para mostrar el cambio de estado
      await fetchTodos();
    } catch (err) {
      toast.error(err.message || 'Error al cambiar el estado del todo');
      throw err;
    }
  };

  /**
   * 📄 CAMBIAR PÁGINA
   * 
   * @param {number} page - Número de página (1-indexed)
   */
  const setPage = (page) => {
    setCurrentPage(page);
  };

  /**
   * 🔍 ACTUALIZAR FILTROS
   * 
   * Al cambiar filtros, resetea a la primera página
   * 
   * @param {Object} newFilters - Nuevos filtros a aplicar
   */
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset a la primera página cuando cambian los filtros
  };

  // 🎯 RETORNAR API DEL HOOK
  // Interfaz pública que pueden usar los componentes
  return {
    // 📊 Estados
    todos,           // Lista de todos actual (filtrada y paginada)
    loading,         // Indica si se está cargando
    error,           // Mensaje de error si existe
    total,           // Total de todos (después de filtros)
    totalPages,      // Número total de páginas
    currentPage,     // Página actual
    
    // 🔄 Operaciones CRUD
    createTodo,      // Crear nuevo todo
    updateTodo,      // Actualizar todo existente
    deleteTodo,      // Eliminar todo
    toggleTodo,      // Alternar estado completado
    
    // 🛠️ Utilidades
    refreshTodos: fetchTodos,  // Re-cargar todos manualmente
    setPage,                   // Cambiar página
    setFilters: updateFilters, // Actualizar filtros
  };
};