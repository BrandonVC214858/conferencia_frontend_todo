/**
 * 📝 COMPONENTE INPUT
 * 
 * Campo de entrada reutilizable con características avanzadas como validación,
 * etiquetas, mensajes de ayuda y estados de error. Proporciona una experiencia
 * de usuario consistente en todos los formularios de la aplicación.
 * 
 * Características:
 * - Etiqueta opcional asociada al input
 * - Validación visual con estados de error
 * - Mensajes de ayuda y error
 * - Estados deshabilitado y enfocado
 * - Accesibilidad con labels y IDs únicos
 * - Estilos consistentes con el design system
 * 
 * Props:
 * @param {string} label - Etiqueta descriptiva del campo
 * @param {string} error - Mensaje de error para mostrar
 * @param {string} helperText - Texto de ayuda informativo
 * @param {string} className - Classes CSS adicionales
 * @param {string} id - ID específico (se genera automáticamente si no se proporciona)
 * @param {...object} props - Props adicionales pasadas al elemento input
 */

import React from 'react';

/**
 * Componente de campo de entrada con validación y estilos consistentes
 */
const Input = ({ 
  label, 
  error, 
  helperText, 
  className = '', 
  id, 
  ...props 
}) => {
  // 🆔 GENERAR ID ÚNICO SI NO SE PROPORCIONA
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // 🎨 CLASES CSS DINÁMICAS BASADAS EN ESTADO
  const inputClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
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
      {/* 🏷️ ETIQUETA DEL CAMPO */}
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {/* 📝 CAMPO DE ENTRADA */}
      <input
        id={inputId}
        className={inputClasses.trim()}
        {...props}  // Propagar todas las props adicionales (placeholder, type, value, onChange, etc.)
      />
      
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

export default Input;