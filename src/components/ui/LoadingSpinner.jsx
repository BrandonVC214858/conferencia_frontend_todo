/**
 * ⏳ COMPONENTE LOADING SPINNER
 * 
 * Indicador de carga animado que se puede usar en cualquier parte de la aplicación
 * para mostrar estados de carga. Incluye diferentes tamaños y personalización
 * de estilos para adaptarse a diferentes contextos.
 * 
 * Características:
 * - Animación de rotación suave
 * - Múltiples tamaños predefinidos (sm, md, lg)
 * - SVG vectorial escalable
 * - Color consistente con el theme de la app
 * - Classes CSS personalizables
 * - Accesible y responsive
 * 
 * Props:
 * @param {string} size - Tamaño del spinner: 'sm' | 'md' | 'lg' (por defecto: 'md')
 * @param {string} className - Classes CSS adicionales para personalización
 */

import React from 'react';

/**
 * Componente de spinner de carga con diferentes tamaños
 */
const LoadingSpinner = ({ size = 'md', className = '' }) => {
  // 📏 TAMAÑOS PREDEFINIDOS PARA DIFERENTES CONTEXTOS
  const sizeClasses = {
    sm: 'h-4 w-4',   // Para botones pequeños o indicadores inline
    md: 'h-8 w-8',   // Tamaño estándar para la mayoría de casos
    lg: 'h-12 w-12', // Para pantallas de carga principales
  };
  
  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      {/* 🎨 SVG ANIMADO CON CÍRCULO PARCIAL */}
      <svg 
        className="h-full w-full text-blue-600" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        {/* ⚪ CÍRCULO BASE (TRANSPARENTE) */}
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        
        {/* 🔵 ARCO VISIBLE QUE GIRA */}
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;