/**
 * 📅 UTILIDADES PARA MANEJO DE FECHAS
 * 
 * Este archivo contiene funciones utilitarias para formatear, manipular y 
 * validar fechas en la aplicación de todos. Utiliza la librería date-fns 
 * para operaciones de fechas más robustas y localizadas.
 * 
 * Funcionalidades:
 * - Formateo de fechas para visualización
 * - Formateo de fechas relativas (hace X tiempo)
 * - Validación de fechas vencidas
 * - Clases CSS dinámicas según estado de fecha
 * - Conversión entre formatos de API y frontend
 */

import { format, formatDistance, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * 📅 FORMATEAR FECHA PARA VISUALIZACIÓN
 * 
 * Convierte una fecha a formato legible en español (dd/MM/yyyy)
 * 
 * @param {Date|string} date - Fecha a formatear (Date object o string ISO)
 * @returns {string} - Fecha formateada como "24/09/2025" o string vacío si no hay fecha
 * 
 * @example
 * formatDate('2025-09-24T10:00:00Z') // "24/09/2025"
 * formatDate(new Date()) // "24/09/2025"
 * formatDate(null) // ""
 */
export const formatDate = (date) => {
  if (!date) return ''; // Manejar fechas nulas/undefined
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy');
};

/**
 * 🕐 FORMATEAR FECHA Y HORA PARA VISUALIZACIÓN
 * 
 * Convierte una fecha a formato legible con hora en español (dd/MM/yyyy HH:mm)
 * 
 * @param {Date|string} date - Fecha y hora a formatear
 * @returns {string} - Fecha y hora formateadas como "24/09/2025 10:30" o string vacío
 * 
 * @example
 * formatDateTime('2025-09-24T10:30:00Z') // "24/09/2025 10:30"
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy HH:mm');
};

/**
 * ⏰ FORMATEAR FECHA RELATIVA
 * 
 * Convierte una fecha a formato relativo en español (hace X tiempo, en X tiempo)
 * Útil para mostrar cuándo se creó un todo o cuándo vence
 * 
 * IMPORTANTE: FastAPI envía fechas en UTC, pero parseISO las interpreta como hora local.
 * Esta función maneja correctamente las diferencias de zona horaria.
 * 
 * @param {Date|string} date - Fecha a comparar con ahora
 * @returns {string} - Fecha relativa como "hace 2 horas", "en 3 días" o string vacío
 * 
 * @example
 * formatRelativeDate('2025-09-24T08:00:00Z') // "hace 2 horas"
 * formatRelativeDate('2025-09-26T10:00:00Z') // "en 2 días"
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  
  try {
    let dateObj;
    
    if (typeof date === 'string') {
      // Si la fecha es un string, puede venir en diferentes formatos desde FastAPI
      if (date.includes('T') && (date.includes('Z') || date.includes('+'))) {
        // Formato ISO con timezone (ej: "2025-09-24T10:00:00Z")
        dateObj = parseISO(date);
      } else if (date.includes('T')) {
        // Formato ISO sin timezone - asumir que es UTC desde FastAPI
        dateObj = parseISO(date + 'Z');
      } else {
        // Otros formatos, intentar parsear directamente
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }
    
    // Validar que la fecha sea válida
    if (isNaN(dateObj.getTime())) {
      console.warn('⚠️ Fecha inválida recibida:', date);
      return '';
    }
    
    return formatDistance(dateObj, new Date(), { 
      addSuffix: true, // Agregar "hace" o "en"
      locale: es       // Usar locale español
    });
  } catch (error) {
    console.error('❌ Error formateando fecha relativa:', error, 'Fecha:', date);
    return '';
  }
};

/**
 * 🚀 FORMATEAR FECHA RELATIVA DESDE FASTAPI
 * 
 * Función específica para manejar fechas que vienen desde FastAPI.
 * FastAPI envía fechas en UTC sin el sufijo 'Z', esta función las maneja correctamente.
 * 
 * @param {string|Date} date - Fecha desde FastAPI en formato UTC
 * @returns {string} - Fecha relativa en español
 */
export const formatRelativeDateFromAPI = (date) => {
  if (!date) return '';
  
  try {
    let dateObj;
    
    if (typeof date === 'string') {
      // FastAPI envía fechas como "2025-09-24T19:56:15.784244" 
      // Estas fechas están en UTC pero sin el sufijo 'Z'
      // Agregamos 'Z' para que JavaScript las interprete correctamente como UTC
      const utcDateString = date.endsWith('Z') ? date : date + 'Z';
      dateObj = new Date(utcDateString);
    } else {
      dateObj = date;
    }
    
    // Verificar que la fecha sea válida
    if (isNaN(dateObj.getTime())) {
      console.warn('⚠️ Fecha inválida:', date);
      return '';
    }
    
    // Usar formatDistance de date-fns para el formato relativo
    return formatDistance(dateObj, new Date(), { 
      addSuffix: true,
      locale: es 
    });
    
  } catch (error) {
    console.error('❌ Error formateando fecha desde API:', error);
    return '';
  }
};

/**
 * ⚠️ VERIFICAR SI UNA FECHA ESTÁ VENCIDA
 * 
 * Compara una fecha con el momento actual para determinar si ya pasó
 * 
 * @param {Date|string} dueDate - Fecha límite a verificar
 * @returns {boolean} - true si la fecha ya pasó, false si no o si no hay fecha
 * 
 * @example
 * isOverdue('2025-09-23T10:00:00Z') // true (si hoy es 24/09/2025)
 * isOverdue('2025-09-25T10:00:00Z') // false
 * isOverdue(null) // false
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

/**
 * 🎨 OBTENER CLASE CSS SEGÚN ESTADO DE FECHA
 * 
 * Retorna una clase CSS de color basada en qué tan cerca está la fecha límite
 * y si el todo está completado. Útil para indicadores visuales.
 * 
 * @param {Date|string} dueDate - Fecha límite del todo
 * @param {boolean} completed - Si el todo está completado (default: false)
 * @returns {string} - Clase CSS de Tailwind para el color del texto
 * 
 * Colores:
 * - Rojo: Fecha vencida (más de 0 horas atrás)
 * - Naranja: Vence pronto (menos de 24 horas)
 * - Amarillo: Vence en 3 días o menos
 * - Gris: Vence en más de 3 días o todo completado
 * 
 * @example
 * getDueDateClass('2025-09-23T10:00:00Z', false) // "text-red-600" (vencido)
 * getDueDateClass('2025-09-24T20:00:00Z', false) // "text-orange-600" (vence hoy)
 * getDueDateClass('2025-09-27T10:00:00Z', false) // "text-yellow-600" (vence en 3 días)
 * getDueDateClass('2025-09-30T10:00:00Z', false) // "text-gray-600" (vence en más de 3 días)
 * getDueDateClass('2025-09-23T10:00:00Z', true)  // "" (completado, sin color especial)
 */
export const getDueDateClass = (dueDate, completed = false) => {
  if (completed || !dueDate) return ''; // Sin color especial si está completado o no hay fecha
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffInHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 0) return 'text-red-600';    // Vencido (rojo)
  if (diffInHours < 24) return 'text-orange-600'; // Vence en menos de 24h (naranja)
  if (diffInHours < 72) return 'text-yellow-600'; // Vence en menos de 3 días (amarillo)
  
  return 'text-gray-600'; // Vence en más de 3 días (gris)
};

/**
 * 🔄 FORMATEAR FECHA PARA ENVIAR A LA API
 * 
 * Convierte una fecha del frontend al formato ISO que espera FastAPI
 * 
 * @param {Date|string} date - Fecha a convertir
 * @returns {string|null} - Fecha en formato ISO o null si no hay fecha
 * 
 * @example
 * formatDateForAPI(new Date()) // "2025-09-24T10:00:00.000Z"
 * formatDateForAPI('2025-09-24') // "2025-09-24T00:00:00.000Z"
 * formatDateForAPI(null) // null
 */
export const formatDateForAPI = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

/**
 * 📥 FORMATEAR FECHA DESDE LA API
 * 
 * Convierte una fecha ISO de FastAPI al formato que esperan los inputs de fecha HTML
 * Extrae solo la parte de la fecha (YYYY-MM-DD) sin la hora
 * 
 * @param {string} dateString - Fecha ISO de la API
 * @returns {string|null} - Fecha en formato YYYY-MM-DD o null si no hay fecha
 * 
 * @example
 * formatDateFromAPI('2025-09-24T10:00:00Z') // "2025-09-24"
 * formatDateFromAPI(null) // null
 */
export const formatDateFromAPI = (dateString) => {
  if (!dateString) return null;
  return dateString.split('T')[0]; // Tomar solo la parte de fecha antes de 'T'
};