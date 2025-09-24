/**
 * ❤️ COMPONENTE HEALTH CHECK
 * 
 * Monitorea en tiempo real el estado de conexión con la API de FastAPI.
 * Muestra un indicador visual del estado de la conexión y realiza 
 * verificaciones periódicas automáticas.
 * 
 * Estados posibles:
 * - 'healthy': API disponible y respondiendo correctamente
 * - 'error': API no disponible o con errores
 * - 'checking': Verificando estado (estado transitorio)
 * 
 * Funcionalidades:
 * - Verificación inicial al montar el componente
 * - Verificaciones periódicas automáticas (configurable vía env)
 * - Indicadores visuales con iconos y colores
 * - Timestamps de última verificación
 * - Manejo de errores de conexión
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { todoService } from '../../services';

/**
 * Componente que muestra el estado de conexión con la API
 * 
 * @param {string} className - Clases CSS adicionales para el contenedor
 * 
 * @example
 * // En el header de la aplicación
 * <HealthCheck />
 * 
 * // Con clases personalizadas
 * <HealthCheck className="ml-4" />
 */
const HealthCheck = ({ className = '' }) => {
  // 🏥 ESTADOS DEL HEALTH CHECK
  
  /** @type {string} Estado actual de la API ('healthy', 'error', 'checking') */
  const [status, setStatus] = useState('checking');
  
  /** @type {Date|null} Timestamp de la última verificación realizada */
  const [lastCheck, setLastCheck] = useState(null);

  /**
   * 🔍 FUNCIÓN DE VERIFICACIÓN DE SALUD
   * 
   * Llama al endpoint /health de FastAPI para verificar que la API esté disponible.
   * Actualiza el estado y timestamp según el resultado.
   */
  const checkHealth = async () => {
    try {
      setStatus('checking'); // Indicar que se está verificando
      
      // 🌐 Llamar al endpoint de health check
      await todoService.healthCheck();
      
      // ✅ API respondió correctamente
      setStatus('healthy');
      setLastCheck(new Date());
    } catch (error) {
      // ❌ API no disponible o con error
      setStatus('error');
      setLastCheck(new Date());
      console.error('Health check failed:', error);
    }
  };

  // 🔄 CONFIGURAR VERIFICACIONES PERIÓDICAS
  useEffect(() => {
    // Verificación inicial al montar el componente
    checkHealth();

    // Configurar verificaciones periódicas
    // Intervalo configurable desde variables de entorno (default: 30 segundos)
    const interval = setInterval(checkHealth, 
      parseInt(import.meta.env.VITE_HEALTH_CHECK_INTERVAL) || 30000
    );

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []); // Sin dependencias, solo ejecutar una vez al montar

  /**
   * 🎨 OBTENER ICONO SEGÚN ESTADO
   * 
   * @returns {JSX.Element} Icono de Lucide React correspondiente al estado
   */
  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />; // ✅ Verde para saludable
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;       // ❌ Rojo para error
      case 'checking':
        return <AlertCircle className="h-4 w-4 text-yellow-500 animate-pulse" />; // ⚠️ Amarillo pulsante para verificando
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />; // Gris para estado desconocido
    }
  };

  /**
   * 📝 OBTENER TEXTO DESCRIPTIVO DEL ESTADO
   * 
   * @returns {string} Descripción textual del estado actual
   */
  const getStatusText = () => {
    switch (status) {
      case 'healthy':
        return 'API Conectada';      // API funcionando correctamente
      case 'error':
        return 'API Desconectada';   // API no disponible
      case 'checking':
        return 'Verificando...';     // Verificación en progreso
      default:
        return 'Estado desconocido'; // Estado no reconocido
    }
  };

  /**
   * 🌈 OBTENER CLASE CSS PARA COLOR DE TEXTO
   * 
   * @returns {string} Clase CSS de Tailwind para el color del texto
   */
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';  // Verde para saludable
      case 'error':
        return 'text-red-600';    // Rojo para error
      case 'checking':
        return 'text-yellow-600'; // Amarillo para verificando
      default:
        return 'text-gray-600';   // Gris por defecto
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* 🔍 ICONO DE ESTADO */}
      {getStatusIcon()}
      
      {/* 📝 TEXTO DE ESTADO */}
      <span className={`text-sm ${getStatusColor()}`}>
        {getStatusText()}
      </span>
      
      {/* 🕐 TIMESTAMP DE ÚLTIMA VERIFICACIÓN */}
      {lastCheck && status !== 'checking' && (
        <span className="text-xs text-gray-500">
          ({new Date(lastCheck).toLocaleTimeString()})
        </span>
      )}
    </div>
  );
};

export default HealthCheck;