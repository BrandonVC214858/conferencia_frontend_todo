/**
 * 📄 COMPONENTE DE PAGINACIÓN
 * 
 * Componente reutilizable que proporciona controles de navegación entre páginas
 * para listas grandes de datos. Incluye navegación con números de página, 
 * botones anterior/siguiente y información de resultados.
 * 
 * Características:
 * - Navegación con números de página visibles
 * - Botones anterior/siguiente con estados deshabilitados
 * - Indicador de resultados mostrados (ej: "Mostrando 1 a 10 de 50")
 * - Puntos suspensivos (...) para páginas no visibles
 * - Diseño responsivo (móvil vs desktop)
 * - Página actual destacada visualmente
 * 
 * Props:
 * @param {number} currentPage - Página actualmente seleccionada
 * @param {number} totalPages - Número total de páginas disponibles
 * @param {Function} onPageChange - Callback cuando se cambia de página
 * @param {number} total - Número total de elementos
 * @param {number} pageSize - Número de elementos por página
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui';

/**
 * Componente principal de paginación con navegación completa
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  total,
  pageSize,
}) => {
  // 🚫 NO MOSTRAR PAGINACIÓN SI HAY UNA PÁGINA O MENOS
  if (totalPages <= 1) return null;

  // 📊 CALCULAR ÍNDICES DE ELEMENTOS MOSTRADOS
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, total);

  /**
   * 📄 CALCULAR PÁGINAS VISIBLES CON PUNTOS SUSPENSIVOS
   * 
   * Genera un array con los números de página que se deben mostrar,
   * incluyendo puntos suspensivos (...) cuando hay muchas páginas.
   * 
   * Ejemplo: [1, '...', 4, 5, 6, '...', 10]
   */
  const getVisiblePages = () => {
    const delta = 2; // Número de páginas a mostrar a cada lado de la actual
    const range = [];
    const rangeWithDots = [];

    // 🎯 CREAR RANGO DE PÁGINAS ALREDEDOR DE LA ACTUAL
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // 🏁 AGREGAR PRIMERA PÁGINA Y PUNTOS SUSPENSIVOS SI ES NECESARIO
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // 📋 AGREGAR PÁGINAS DEL RANGO CENTRAL
    rangeWithDots.push(...range);

    // 🏁 AGREGAR ÚLTIMA PÁGINA Y PUNTOS SUSPENSIVOS SI ES NECESARIO
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* 📱 VERSIÓN MÓVIL - Solo botones anterior/siguiente */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
      
      {/* 🖥️ VERSIÓN DESKTOP - Paginación completa */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/* 📊 INFORMACIÓN DE RESULTADOS */}
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{startIndex}</span> a{' '}
            <span className="font-medium">{endIndex}</span> de{' '}
            <span className="font-medium">{total}</span> resultados
          </p>
        </div>
        
        {/* 📄 CONTROLES DE NAVEGACIÓN */}
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* ⬅️ BOTÓN ANTERIOR */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            
            {/* 🔢 NÚMEROS DE PÁGINA Y PUNTOS SUSPENSIVOS */}
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  // ⋯ PUNTOS SUSPENSIVOS
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>
                ) : (
                  // 🔢 BOTÓN DE NÚMERO DE PÁGINA
                  <button
                    onClick={() => onPageChange(page)}
                    className={`
                      relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
                      ${currentPage === page 
                        ? 'z-10 bg-blue-600 text-white focus-visible:outline-blue-600'  // Página actual
                        : 'text-gray-900'  // Otras páginas
                      }
                    `}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
            
            {/* ➡️ BOTÓN SIGUIENTE */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;