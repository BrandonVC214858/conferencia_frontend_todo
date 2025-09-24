/**
 * 📋 COMPONENTE SELECT
 * 
 * Campo de selección reutilizable que permite elegir entre múltiples opciones.
 * Incluye validación visual, etiquetas y mensajes de ayuda. Mantiene consistencia
 * con el resto de componentes de formulario.
 * 
 * Características:
 * - Lista configurable de opciones
 * - Etiqueta opcional asociada
 * - Estados de validación y error
 * - Mensajes de ayuda informativos
 * - Accesibilidad con IDs únicos
 * - Estilos consistentes con Input
 * 
 * Props:
 * @param {string} label - Etiqueta descriptiva del select
 * @param {string} error - Mensaje de error para mostrar
 * @param {string} helperText - Texto de ayuda informativo
 * @param {Array} options - Array de objetos con {value, label} para las opciones
 * @param {string} className - Classes CSS adicionales
 * @param {string} id - ID específico (se genera automáticamente si no se proporciona)
 * @param {...object} props - Props adicionales pasadas al elemento select
 */

import React from 'react';

/**
 * Componente de selección con opciones configurables y validación
 */
const Select = ({ 
  label, 
  error, 
  helperText, 
  options = [], 
  className = '', 
  id, 
  ...props 
}) => {
  // 🆔 GENERAR ID ÚNICO SI NO SE PROPORCIONA
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  // 🎨 CLASES CSS DINÁMICAS BASADAS EN ESTADO
  const selectClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error 
      ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'  // Estado de error
      : 'border-gray-300 text-gray-900 focus:border-blue-500'                   // Estado normal
    }
    ${className}  // Classes adicionales del usuario
  `;
  
  return (
    <div className="space-y-1">
      {/* 🏷️ ETIQUETA DEL SELECT */}
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {/* 📋 ELEMENTO SELECT */}
      <select
        id={selectId}
        className={selectClasses.trim()}
        {...props}  // Propagar props adicionales (value, onChange, disabled, etc.)
      >
        {/* 🔄 RENDERIZAR OPCIONES DESDE EL ARRAY */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* ❌ MENSAJE DE ERROR */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {/* ℹ️ TEXTO DE AYUDA (solo si no hay error) */}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;