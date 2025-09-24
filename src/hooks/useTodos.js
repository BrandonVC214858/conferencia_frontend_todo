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
    priority: 'all',
    search: '',
    ...initialFilters
  });

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit: pageSize,
        ...filters,
      };

      const response = await todoService.getTodos(params);
      
      setTodos(response.data || []);
      setTotal(response.total || 0);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError(err.message || 'Error al cargar los todos');
      toast.error('Error al cargar los todos');
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