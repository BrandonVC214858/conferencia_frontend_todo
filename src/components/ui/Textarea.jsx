/**
 * 📄 COMPONENTE TEXTAREA
 * 
 * Área de texto multilínea reutilizable para entrada de texto largo.
 * Mantiene consistencia visual y funcional con otros componentes de formulario
 * como Input y Select, incluyendo validación y mensajes de ayuda.
 * 
 * Características:
 * - Área de texto multilínea redimensionable
 * - Etiqueta opcional asociada
 * - Estados de validación y error
 * - Mensajes de ayuda informativos
 * - Accesibilidad con IDs únicos
 * - Estilos consistentes con otros campos de formulario
 * - Resize deshabilitado por defecto para mantener diseño
 * 
 * Props:
 * @param {string} label - Etiqueta descriptiva del textarea
 * @param {string} error - Mensaje de error para mostrar
 * @param {string} helperText - Texto de ayuda informativo
 * @param {string} className - Classes CSS adicionales
 * @param {string} id - ID específico (se genera automáticamente si no se proporciona)
 * @param {...object} props - Props adicionales pasadas al elemento textarea
 */

import React from 'react';

/**
 * Componente de área de texto con validación y estilos consistentes
 */
const Textarea = ({ 
  label, 
  error, 
  helperText, 
  className = '', 
  id, 
  ...props 
}) => {
  // 🆔 GENERAR ID ÚNICO SI NO SE PROPORCIONA
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  // 🎨 CLASES CSS DINÁMICAS BASADAS EN ESTADO
  const textareaClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    resize-none    // Desactivar redimensionado para mantener diseño consistente
    ${error 
      ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'  // Estado de error
      : 'border-gray-300 text-gray-900 focus:border-blue-500'                   // Estado normal
    }
    ${className}  // Classes adicionales del usuario
  `;
  
  return (
    <div className="space-y-1">
      {/* 🏷️ ETIQUETA DEL TEXTAREA */}
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {/* 📄 ELEMENTO TEXTAREA */}
      <textarea
        id={textareaId}
        className={textareaClasses.trim()}
        {...props}  // Propagar props adicionales (placeholder, rows, cols, value, onChange, etc.)
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

export default Textarea;