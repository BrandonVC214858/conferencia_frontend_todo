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

const TodoPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
  });

  const {
    todos,
    loading,
    total,
    totalPages,
    currentPage,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    setPage,
    setFilters: updateFilters,
  } = useTodos(filters, 10);

  const handleCreateTodo = async (todoData) => {
    await createTodo(todoData);
    setShowForm(false);
  };

  const handleEditTodo = async (id, todoData) => {
    await updateTodo(id, todoData);
    setEditingTodo(null);
  };

  const handleStartEdit = (todo) => {
    setEditingTodo(todo);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = { status: 'all', search: '' };
    setFilters(resetFilters);
    updateFilters(resetFilters);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
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
              <HealthCheck />
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

      {/* Stats */}
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

        {/* Form */}
        {showForm && (
          <div className="mb-6">
            <TodoForm
              onSubmit={handleCreateTodo}
              onCancel={() => setShowForm(false)}
              loading={loading}
            />
          </div>
        )}

        {/* Edit Form */}
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

        {/* Filters */}
        <div className="mb-6">
          <TodoFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Todo List */}
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