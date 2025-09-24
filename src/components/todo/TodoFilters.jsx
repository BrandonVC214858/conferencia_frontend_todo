/**
 * 🔍 FILTROS DE TODOS
 * 
 * Componente que proporciona controles de filtrado y búsqueda para la lista de todos.
 * Permite a los usuarios filtrar por estado y buscar por texto en el título.
 * 
 * Funcionalidades principales:
 * - Búsqueda por texto en título del todo
 * - Filtrado por estado (todos, pendientes, completados)
 * - Botón para limpiar todos los filtros activos
 * - Indicador visual de filtros activos
 * - Diseño responsivo para diferentes tamaños de pantalla
 * 
 * Props:
 * @param {Object} filters - Objeto con los filtros actuales
 * @param {Function} onFiltersChange - Callback cuando cambian los filtros
 * @param {Function} onReset - Callback para resetear todos los filtros
 */

import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Button, Input, Select } from '../ui';

/**
 * 📋 OPCIONES DE FILTRADO POR ESTADO
 * 
 * Define las opciones disponibles para filtrar todos por su estado de completado
 */
const statusOptions = [
  { value: 'all', label: 'Todos' },            // Mostrar todos los todos
  { value: 'pending', label: 'Pendientes' },   // Solo todos sin completar
  { value: 'completed', label: 'Completados' }, // Solo todos completados
];

/**
 * Componente principal de filtros con búsqueda y estado
 */
const TodoFilters = ({ filters, onFiltersChange, onReset }) => {
  /**
   * 🔍 MANEJAR CAMBIO EN BÚSQUEDA POR TEXTO
   * 
   * @param {Event} e - Evento del input de búsqueda
   */
  const handleSearchChange = (e) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  /**
   * 📊 MANEJAR CAMBIO EN FILTRO DE ESTADO
   * 
   * @param {Event} e - Evento del select de estado
   */
  const handleStatusChange = (e) => {
    onFiltersChange({ ...filters, status: e.target.value });
  };

  /**
   * 🔍 DETECTAR SI HAY FILTROS ACTIVOS
   * 
   * Verifica si el usuario tiene algún filtro aplicado para mostrar el botón de limpiar
   */
  const hasActiveFilters = 
    (filters.search && filters.search.length > 0) ||
    (filters.status && filters.status !== 'all');

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
      {/* 🏷️ HEADER CON TÍTULO Y BOTÓN DE LIMPIAR - RESPONSIVO */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Filtros</h3>
        </div>
        
        {/* 🗑️ BOTÓN LIMPIAR FILTROS (solo si hay filtros activos) - RESPONSIVO */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="text-xs p-1 sm:p-2"
          >
            <RotateCcw className="h-3 w-3 sm:mr-1" />
            <span className="hidden sm:inline">Limpiar</span>
          </Button>
        )}
      </div>
      
      {/* 🎛️ CONTROLES DE FILTRADO - RESPONSIVO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* 🔍 CAMPO DE BÚSQUEDA POR TEXTO - RESPONSIVO */}
        <div className="relative">
          {/* 🔍 ÍCONO DE BÚSQUEDA DENTRO DEL INPUT */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          
          {/* 📝 INPUT DE BÚSQUEDA */}
          <Input
            placeholder="Buscar todos..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="pl-10"  // Espacio para el ícono
          />
        </div>
        
        {/* 📊 SELECT PARA FILTRO POR ESTADO - RESPONSIVO */}
        <Select
          options={statusOptions}
          value={filters.status || 'all'}
          onChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default TodoFilters;