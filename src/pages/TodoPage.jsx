/**
 * 🏠 PÁGINA PRINCIPAL DE TODOS
 * 
 * Página principal de la aplicación que combina todos los componentes para 
 * crear una interfaz completa de gestión de todos. Esta página coordina
 * todas las operaciones CRUD y el estado de la aplicación.
 * 
 * Funcionalidades principales:
 * - Header con título, health check y botón para crear
 * - Formulario de creación de nuevos todos
 * - Formulario de edición de todos existentes
 * - Filtros y búsqueda de todos
 * - Lista paginada de todos
 * - Paginación de resultados
 * - Notificaciones toast para feedback
 * - Estados de carga y error
 * 
 * Arquitectura:
 * - Usa el hook personalizado useTodos para manejo de estado
 * - Coordina múltiples componentes reutilizables
 * - Maneja eventos y callbacks entre componentes
 */

import React, { useState } from 'react';
import { Plus, ListTodo } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useTodos } from '../hooks';
import { 
  Button, 
  Card,
  TodoForm, 
  TodoList, 
  TodoFilters, 
  Pagination,
  HealthCheck 
} from '../components';

/**
 * Componente de página principal que orquesta toda la funcionalidad de todos
 */
const TodoPage = () => {
  // 🎛️ ESTADOS LOCALES DE LA PÁGINA
  
  /** @type {boolean} Si mostrar el formulario de creación */
  const [showForm, setShowForm] = useState(false);
  
  /** @type {Object|null} Todo que se está editando actualmente */
  const [editingTodo, setEditingTodo] = useState(null);
  
  /** @type {Object} Filtros activos para la lista de todos */
  const [filters, setFilters] = useState({
    status: 'all',  // 'all', 'completed', 'pending'
    search: '',     // Término de búsqueda
  });

  // 🎣 HOOK PERSONALIZADO PARA MANEJO DE TODOS
  const {
    todos,           // Lista actual de todos (filtrada y paginada)
    loading,         // Estado de carga
    total,           // Total de todos después de filtros
    totalPages,      // Número total de páginas
    currentPage,     // Página actual
    createTodo,      // Función para crear nuevo todo
    updateTodo,      // Función para actualizar todo existente
    toggleTodo,      // Función para alternar estado completado
    deleteTodo,      // Función para eliminar todo
    setPage,         // Función para cambiar página
    setFilters: updateFilters, // Función para actualizar filtros
  } = useTodos(filters, 10); // 10 todos por página

  /**
   * 📝 MANEJAR CREACIÓN DE TODO
   */
  const handleCreateTodo = async (todoData) => {
    await createTodo(todoData);
    setShowForm(false);
  };

  /**
   * ✏️ MANEJAR EDICIÓN DE TODO
   */
  const handleEditTodo = async (id, todoData) => {
    await updateTodo(id, todoData);
    setEditingTodo(null);
  };

  /**
   * 🖊️ INICIAR EDICIÓN DE UN TODO
   */
  const handleStartEdit = (todo) => {
    setEditingTodo(todo);
    setShowForm(false);
  };

  /**
   * ❌ CANCELAR EDICIÓN
   */
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  /**
   * 🔍 ACTUALIZAR FILTROS
   */
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  /**
   * 🔄 RESETEAR FILTROS
   */
  const handleResetFilters = () => {
    const resetFilters = { status: 'all', search: '' };
    setFilters(resetFilters);
    updateFilters(resetFilters);
  };

  // 📊 CÁLCULOS DE ESTADÍSTICAS
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🍞 NOTIFICACIONES TOAST */}
      <Toaster position="top-right" />
      
      {/* 📋 HEADER PRINCIPAL */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <ListTodo className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Todo App
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Organiza tus tareas de manera eficiente
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* ❤️ HEALTH CHECK DE LA API */}
              <HealthCheck />
              
              {/* ➕ BOTÓN CREAR NUEVO TODO */}
              <Button 
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingTodo(null);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Todo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/*  ESTADÍSTICAS RÁPIDAS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pendientes</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-gray-600">Completados</div>
            </div>
          </Card>
        </div>

        {/* 📝 FORMULARIO DE CREACIÓN */}
        {showForm && (
          <div className="mb-6">
            <TodoForm
              onSubmit={handleCreateTodo}
              onCancel={() => setShowForm(false)}
              loading={loading}
            />
          </div>
        )}

        {/* ✏️ FORMULARIO DE EDICIÓN */}
        {editingTodo && (
          <div className="mb-6">
            <TodoForm
              todo={editingTodo}
              onSubmit={handleEditTodo}
              onCancel={handleCancelEdit}
              loading={loading}
            />
          </div>
        )}

        {/* 🔍 FILTROS Y BÚSQUEDA */}
        <div className="mb-6">
          <TodoFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* 📋 LISTA PRINCIPAL DE TODOS */}
        <Card padding={false}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Todos ({total})
            </h2>
          </div>
          
          <div className="p-6">
            <TodoList
              todos={todos}
              loading={loading}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={handleStartEdit}
            />
          </div>
          
          {/* 📄 PAGINACIÓN */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              total={total}
              pageSize={10}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default TodoPage;