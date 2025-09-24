/**
 * 🎯 COMPONENTE TODO ITEM
 * 
 * Componente individual que representa un solo todo en la lista. Maneja
 * todas las interacciones del usuario como marcar completado, editar y eliminar.
 * Incluye indicadores visuales del estado y metadata del todo.
 * 
 * Funcionalidades principales:
 * - Toggle de estado completado/pendiente con confirmación visual
 * - Botones de edición y eliminación con estados de carga
 * - Indicadores de estado visual (completado, pendiente)
 * - Información de fecha de creación relativa
 * - Estados de carga para acciones asíncronas
 * - Confirmación antes de eliminar
 * - Diseño responsive y accesible
 * 
 * Props:
 * @param {Object} todo - Objeto todo con id, title, description, completed, createdAt
 * @param {Function} onToggle - Callback para alternar estado completado (recibe todo.id)
 * @param {Function} onDelete - Callback para eliminar todo (recibe todo.id)
 * @param {Function} onEdit - Callback opcional para editar todo (recibe todo object)
 */

import React, { useState } from 'react';
import { Check, Clock, Trash2, Edit } from 'lucide-react';
import { formatRelativeDate } from '../../utils';
import { Button } from '../ui';

/**
 * Componente de item individual de todo con todas sus interacciones
 */
const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  // 🎛️ ESTADOS LOCALES PARA OPERACIONES ASÍNCRONAS
  // Controlan los indicadores de carga durante las operaciones
  
  /** @type {boolean} Si está procesando la eliminación del todo */
  const [isDeleting, setIsDeleting] = useState(false);
  
  /** @type {boolean} Si está procesando el toggle de completado */
  const [isToggling, setIsToggling] = useState(false);

  /**
   * 🔄 MANEJAR TOGGLE DE ESTADO COMPLETADO
   * 
   * Cambia el estado del todo entre completado y pendiente.
   * Incluye estado de carga para prevenir clicks múltiples y dar feedback visual.
   */
  const handleToggle = async () => {
    setIsToggling(true); // Mostrar estado de carga
    try {
      await onToggle(todo.id); // Ejecutar callback del componente padre
    } finally {
      setIsToggling(false); // Limpiar estado de carga siempre
    }
  };

  /**
   * 🗑️ MANEJAR ELIMINACIÓN CON CONFIRMACIÓN
   * 
   * Muestra un diálogo de confirmación antes de eliminar el todo.
   * Solo procede si el usuario confirma la acción.
   */
  const handleDelete = async () => {
    // 💡 CONFIRMACIÓN DEL USUARIO ANTES DE ELIMINAR
    if (window.confirm('¿Estás seguro de que quieres eliminar este todo?')) {
      setIsDeleting(true); // Mostrar estado de carga
      try {
        await onDelete(todo.id); // Ejecutar callback del componente padre
      } finally {
        setIsDeleting(false); // Limpiar estado de carga siempre
      }
    }
  };

  return (
    <div className={`
      bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md
      ${todo.completed ? 'opacity-75' : ''} // Reducir opacidad si está completado
    `}>
      <div className="flex items-start space-x-3">
        {/* ✅ CHECKBOX DE COMPLETADO */}
        <button
          onClick={handleToggle}
          disabled={isToggling} // Deshabilitar durante la carga
          className={`
            flex-shrink-0 mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors
            ${todo.completed 
              ? 'bg-green-500 border-green-500 text-white'  // Verde cuando completado
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50' // Gris con hover cuando pendiente
            }
          `}
        >
          {/* ✓ ICONO DE CHECK (solo visible cuando completado) */}
          {todo.completed && <Check className="h-3 w-3" />}
        </button>
        
        {/* 📝 CONTENIDO PRINCIPAL DEL TODO */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              {/* 🏷️ TÍTULO DEL TODO */}
              <h3 className={`
                text-base font-medium 
                ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'} // Tachado si completado
              `}>
                {todo.title}
              </h3>
              
              {/* 📄 DESCRIPCIÓN DEL TODO (opcional) */}
              {todo.description && (
                <p className={`
                  mt-1 text-sm 
                  ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'} // Tachado si completado
                `}>
                  {todo.description}
                </p>
              )}
              
              {/* 🏷️ METADATOS Y BADGES DEL TODO */}
              <div className="flex items-center space-x-4 mt-2">
                {/* 🎯 BADGE DE ESTADO (Completado/Pendiente) */}
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                  ${todo.completed 
                    ? 'bg-green-100 text-green-800 border-green-200' // Verde para completado
                    : 'bg-blue-100 text-blue-800 border-blue-200'    // Azul para pendiente
                  }
                `}>
                  {todo.completed ? '✅ Completado' : '⏳ Pendiente'}
                </span>
                
                {/* 🕐 TIMESTAMP DE CREACIÓN (si está disponible) */}
                {todo.createdAt && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatRelativeDate(todo.createdAt)} {/* Ej: "hace 2 horas" */}
                  </div>
                )}
              </div>
            </div>
            
            {/* 🛠️ BOTONES DE ACCIÓN */}
            <div className="flex items-center space-x-1 ml-4">
              {/* ✏️ BOTÓN DE EDITAR (opcional, solo si se proporciona onEdit) */}
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(todo)} // Pasar el objeto todo completo
                  className="p-1"
                  title="Editar todo" // Tooltip para accesibilidad
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              
              {/* 🗑️ BOTÓN DE ELIMINAR */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                loading={isDeleting} // Mostrar spinner durante eliminación
                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Eliminar todo" // Tooltip para accesibilidad
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;