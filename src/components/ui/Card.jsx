/**
 * 🃏 COMPONENTE CARD
 * 
 * Componente reutilizable que proporciona un contenedor con estilo de tarjeta
 * consistente en toda la aplicación. Incluye bordes redondeados, sombras
 * y opciones de personalización.
 * 
 * Características:
 * - Fondo blanco con bordes redondeados
 * - Sombra sutil para efecto elevado
 * - Padding opcional y configurable
 * - Classes CSS adicionales personalizables
 * - Diseño responsive y accesible
 * 
 * Props:
 * @param {ReactNode} children - Contenido a renderizar dentro de la tarjeta
 * @param {string} className - Classes CSS adicionales para personalización
 * @param {boolean} padding - Si aplicar padding interno (por defecto: true)
 */

import React from 'react';

/**
 * Componente de tarjeta reutilizable con estilos consistentes
 */
const Card = ({ children, className = '', padding = true }) => {
  // 🎨 CONSTRUIR CLASES CSS DINÁMICAMENTE
  const classes = `
    bg-white rounded-lg border border-gray-200 shadow-sm
    ${padding ? 'p-6' : ''}    // Aplicar padding solo si se especifica
    ${className}               // Classes adicionales del usuario
  `;
  
  return (
    <div className={classes.trim()}>
      {children}
    </div>
  );
};

export default Card;