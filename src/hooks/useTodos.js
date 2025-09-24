import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services';
import toast from 'react-hot-toast';

export const useTodos = (initialFilters = {}, pageSize = 10) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    ...initialFilters
  });

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get todos from FastAPI (returns array directly)
      const response = await todoService.getTodos();
      let todosData = Array.isArray(response) ? response : [];

      // Transform FastAPI data structure to frontend structure
      const transformedTodos = todosData.map(todo => ({
        id: todo.id,
        title: todo.title,
        description: todo.description || '',
        completed: todo.completed || false,
        // Default values for fields not in FastAPI basic structure
        priority: 'medium',
        dueDate: null,
        createdAt: todo.created_at || new Date().toISOString(),
        updatedAt: todo.updated_at || new Date().toISOString(),
      }));

      // Apply client-side filtering
      let filteredTodos = transformedTodos;
      
      if (filters.status !== 'all') {
        filteredTodos = filteredTodos.filter(todo => {
          if (filters.status === 'completed') return todo.completed;
          if (filters.status === 'pending') return !todo.completed;
          return true;
        });
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredTodos = filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(searchTerm) ||
          (todo.description && todo.description.toLowerCase().includes(searchTerm))
        );
      }

      // Apply client-side pagination
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      const paginatedTodos = filteredTodos.slice(start, end);
      const calculatedTotalPages = Math.ceil(filteredTodos.length / pageSize);
      
      setTodos(paginatedTodos);
      setTotal(filteredTodos.length);
      setTotalPages(calculatedTotalPages);
    } catch (err) {
      setError(err.message || 'Error al cargar los todos');
      toast.error('Error al cargar los todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (todoData) => {
    try {
      await todoService.createTodo(todoData);
      toast.success('Todo creado exitosamente');
      await fetchTodos();
    } catch (err) {
      toast.error(err.message || 'Error al crear el todo');
      throw err;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      await todoService.updateTodo(id, todoData);
      toast.success('Todo actualizado exitosamente');
      await fetchTodos();
    } catch (err) {
      toast.error(err.message || 'Error al actualizar el todo');
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      toast.success('Todo eliminado exitosamente');
      await fetchTodos();
    } catch (err) {
      toast.error(err.message || 'Error al eliminar el todo');
      throw err;
    }
  };

  const toggleTodo = async (id) => {
    try {
      await todoService.toggleTodo(id);
      await fetchTodos();
    } catch (err) {
      toast.error(err.message || 'Error al cambiar el estado del todo');
      throw err;
    }
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return {
    todos,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos: fetchTodos,
    setPage,
    setFilters: updateFilters,
  };
};