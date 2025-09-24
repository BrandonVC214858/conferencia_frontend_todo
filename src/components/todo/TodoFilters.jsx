import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Button, Input, Select } from '../ui';

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'completed', label: 'Completados' },
];

const priorityOptions = [
  { value: 'all', label: 'Todas las prioridades' },
  { value: 'high', label: '🔴 Alta' },
  { value: 'medium', label: '🟡 Media' },
  { value: 'low', label: '🟢 Baja' },
];

const TodoFilters = ({ filters, onFiltersChange, onReset }) => {
  const handleSearchChange = (e) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFiltersChange({ ...filters, status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFiltersChange({ ...filters, priority: e.target.value });
  };

  const hasActiveFilters = 
    (filters.search && filters.search.length > 0) ||
    (filters.status && filters.status !== 'all') ||
    (filters.priority && filters.priority !== 'all');

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-900">Filtros</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="text-xs"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Limpiar
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            placeholder="Buscar todos..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        
        <Select
          options={statusOptions}
          value={filters.status || 'all'}
          onChange={handleStatusChange}
        />
        
        <Select
          options={priorityOptions}
          value={filters.priority || 'all'}
          onChange={handlePriorityChange}
        />
      </div>
    </div>
  );
};

export default TodoFilters;