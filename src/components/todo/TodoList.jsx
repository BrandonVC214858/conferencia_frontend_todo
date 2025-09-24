/**
 * 📋 LISTA DE TODOS
 * 
 * Componente que renderiza una lista de todos con diferentes estados:
 * - Lista completa con todos los items
 * - Estado de carga con spinner
 * - Estado vacío con mensaje informativo
 * - Manejo de errores y estados intermedios
 * 
 * Funcionalidades:
 * - Renderizado de lista de TodoItem components
 * - Animaciones de carga con LoadingSpinner
 * - Mensajes informativos para estados vacíos
 * - Propagación de eventos hacia el componente padre
 * 
 * Props:
 * @param {Array} todos - Array de objetos todo para mostrar
 * @param {boolean} loading - Si está cargando datos
 * @param {Function} onToggle - Callback para alternar estado completado
 * @param {Function} onDelete - Callback para eliminar todo
 * @param {Function} onEdit - Callback para editar todo
 */

import React from 'react';
import TodoItem from './TodoItem';
import { LoadingSpinner } from '../ui';

/**
 * Componente de lista de todos con manejo de estados
 */
const TodoList = ({ todos, loading, onToggle, onDelete, onEdit }) => {
  // 🔄 ESTADO DE CARGA - Mostrar spinner mientras se cargan datos
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // 📭 ESTADO VACÍO - Sin todos disponibles
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        {/* 📋 ÍCONO VISUAL PARA ESTADO VACÍO */}
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
        </div>
        
        {/* 💬 MENSAJE INFORMATIVO */}
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          No hay todos
        </h3>
        <p className="text-sm text-gray-500">
          Comienza creando tu primer todo.
        </p>
      </div>
    );
  }

  // 📋 RENDERIZADO DE LA LISTA DE TODOS
  return (
    <div className="space-y-3">
      {/* 🔄 MAPEO DE CADA TODO A COMPONENTE TodoItem */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}    // Clave única para optimización de React
          todo={todo}      // Datos del todo individual
          onToggle={onToggle}  // Función para cambiar estado completado
          onDelete={onDelete}  // Función para eliminar todo
          onEdit={onEdit}      // Función para iniciar edición
        />
      ))}
    </div>
  );
};

export default TodoList;