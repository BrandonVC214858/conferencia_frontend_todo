/**
 * 🔘 COMPONENTE BUTTON REUTILIZABLE
 * 
 * Botón versátil con múltiples variantes, tamaños y estados.
 * Incluye soporte para estado de carga con spinner animado.
 * 
 * Funcionalidades:
 * - Múltiples variantes de estilo (primary, secondary, danger, ghost)
 * - Diferentes tamaños (sm, md, lg)
 * - Estado de carga con spinner animado
 * - Estado deshabilitado
 * - Clases CSS personalizables
 * - Accesibilidad integrada (focus rings, aria attributes)
 */

import React from 'react';

/**
 * Componente Button reutilizable con múltiples variantes y estados
 * 
 * @param {string} variant - Variante de estilo ('primary', 'secondary', 'danger', 'ghost')
 * @param {string} size - Tamaño del botón ('sm', 'md', 'lg')
 * @param {boolean} loading - Si muestra spinner de carga (default: false)
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {ReactNode} children - Contenido del botón (texto, iconos, etc.)
 * @param {string} className - Clases CSS adicionales
 * @param {Object} props - Props adicionales que se pasan al elemento button
 * 
 * @example
 * // Botón primario básico
 * <Button onClick={handleClick}>Guardar</Button>
 * 
 * // Botón con estado de carga
 * <Button loading={isLoading} variant="primary">Enviando...</Button>
 * 
 * // Botón de peligro pequeño
 * <Button variant="danger" size="sm">Eliminar</Button>
 * 
 * // Botón fantasma (sin fondo)
 * <Button variant="ghost">Cancelar</Button>
 */
const Button = ({ 
  variant = 'primary',  // Variante por defecto
  size = 'md',          // Tamaño por defecto
  loading = false,      // Sin carga por defecto
  disabled,             // Estado de deshabilitado
  children,             // Contenido del botón
  className = '',       // Clases adicionales
  ...props              // Props adicionales para el elemento button
}) => {
  // 🎨 CLASES BASE COMUNES
  // Estilos que se aplican a todos los botones sin importar la variante
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // 🌈 VARIANTES DE ESTILO
  // Diferentes combinaciones de colores y estilos para cada tipo de botón
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',           // Azul sólido
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500', // Blanco con borde
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',              // Rojo sólido
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500',                     // Transparente
  };
  
  // 📏 TAMAÑOS DISPONIBLES
  // Diferentes tamaños de padding y texto para cada tamaño de botón
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',   // Pequeño
    md: 'px-4 py-2 text-sm',     // Mediano (default)
    lg: 'px-6 py-3 text-base',   // Grande
  };
  
  // 🎯 COMBINAR TODAS LAS CLASES
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button
      className={classes}
      disabled={disabled || loading} // Deshabilitar si está explícitamente disabled o cargando
      {...props} // Pasar props adicionales como onClick, type, etc.
    >
      {/* 🔄 SPINNER DE CARGA */}
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true" // Ocultar del screen reader, es solo decorativo
        >
          {/* Círculo de fondo (estático) */}
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          {/* Arco animado que gira */}
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {/* 📝 CONTENIDO DEL BOTÓN */}
      {children}
    </button>
  );
};

export default Button;