/**
 * 🌐 SERVICIO DE API BASE
 * 
 * Este archivo contiene la configuración principal para todas las llamadas HTTP
 * hacia el backend FastAPI. Utiliza Axios como cliente HTTP y maneja:
 * - Configuración base de URL y headers
 * - Interceptores para requests y responses
 * - Manejo centralizado de errores
 * - Autenticación con tokens (si está disponible)
 */

import axios from 'axios';

/**
 * Clase principal para manejar todas las comunicaciones HTTP con la API
 * Singleton pattern: una sola instancia para toda la aplicación
 */
class ApiService {
  /**
   * Constructor - Inicializa la instancia de Axios con configuración base
   */
  constructor() {
    // Crear instancia de Axios con configuración predeterminada
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000', // URL del backend FastAPI
      timeout: 10000, // Timeout de 10 segundos para las requests
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido por defecto
      },
    });

    // Configurar interceptores para requests y responses
    this.setupInterceptors();
  }

  /**
   * 🔧 CONFIGURACIÓN DE INTERCEPTORES
   * 
   * Los interceptores permiten procesar las requests antes de enviarlas
   * y las responses antes de devolverlas a los componentes
   */
  setupInterceptors() {
    // 📤 INTERCEPTOR DE REQUEST (antes de enviar)
    this.api.interceptors.request.use(
      (config) => {
        // Agregar token de autenticación si está disponible
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Manejar errores antes de enviar la request
        return Promise.reject(error);
      }
    );

    // 📥 INTERCEPTOR DE RESPONSE (después de recibir)
    this.api.interceptors.response.use(
      (response) => {
        // Si la response es exitosa, simplemente pasarla
        return response;
      },
      (error) => {
        // 🚨 MANEJO CENTRALIZADO DE ERRORES
        let apiError = {
          message: 'Error desconocido',
          status: 500,
          code: null,
        };

        if (error.response) {
          // El servidor respondió con un código de error
          const { status, data } = error.response;
          
          // Manejo específico de errores FastAPI según el código HTTP
          if (status === 404) {
            apiError.message = 'Todo no encontrado';
            apiError.status = 404;
          } else if (status === 422) {
            // Error de validación de FastAPI (Unprocessable Entity)
            apiError.message = 'Datos inválidos';
            apiError.status = 422;
            apiError.code = 'VALIDATION_ERROR';
            
            // Incluir detalles de validación si están disponibles
            if (data?.detail) {
              apiError.details = data.detail;
              if (Array.isArray(data.detail)) {
                // Formatear errores de validación para mejor visualización
                apiError.message = data.detail.map(err => 
                  `${err.loc?.join('.') || 'Campo'}: ${err.msg}`
                ).join(', ');
              } else if (typeof data.detail === 'string') {
                apiError.message = data.detail;
              }
            }
          } else if (status >= 500) {
            // Errores del servidor (5xx)
            apiError.message = 'Error del servidor';
            apiError.status = status;
          } else {
            // Otros errores HTTP
            apiError.message = data?.message || error.message || 'Error en la petición';
            apiError.status = status;
          }
        } else if (error.request) {
          // Error de red - no hay respuesta del servidor
          apiError.message = 'Error de conexión. Verifica que el servidor esté ejecutándose en http://localhost:8000';
          apiError.status = 0;
          apiError.code = 'NETWORK_ERROR';
        } else {
          // Error en la configuración de la request
          apiError.message = error.message || 'Error inesperado';
        }
        
        return Promise.reject(apiError);
      }
    );
  }

  /**
   * 📖 MÉTODO GET
   * Realiza una petición GET al endpoint especificado
   * 
   * @param {string} endpoint - Ruta del endpoint (ej: '/todos')
   * @param {Object} params - Parámetros query opcionales
   * @returns {Promise} - Datos de la respuesta
   */
  async get(endpoint, params) {
    const response = await this.api.get(endpoint, { params });
    return response.data; // Devolver solo los datos, no toda la respuesta de Axios
  }

  /**
   * 📝 MÉTODO POST
   * Realiza una petición POST para crear nuevos recursos
   * 
   * @param {string} endpoint - Ruta del endpoint (ej: '/todos')
   * @param {Object} data - Datos a enviar en el body de la request
   * @returns {Promise} - Datos de la respuesta
   */
  async post(endpoint, data) {
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  /**
   * ✏️ MÉTODO PUT
   * Realiza una petición PUT para actualizar recursos completos
   * 
   * @param {string} endpoint - Ruta del endpoint (ej: '/todos/1')
   * @param {Object} data - Datos completos del recurso
   * @returns {Promise} - Datos de la respuesta
   */
  async put(endpoint, data) {
    const response = await this.api.put(endpoint, data);
    return response.data;
  }

  /**
   * 🔄 MÉTODO PATCH
   * Realiza una petición PATCH para actualizaciones parciales
   * 
   * @param {string} endpoint - Ruta del endpoint (ej: '/todos/1/toggle')
   * @param {Object} data - Datos parciales a actualizar
   * @returns {Promise} - Datos de la respuesta
   */
  async patch(endpoint, data) {
    const response = await this.api.patch(endpoint, data);
    return response.data;
  }

  /**
   * 🗑️ MÉTODO DELETE
   * Realiza una petición DELETE para eliminar recursos
   * 
   * @param {string} endpoint - Ruta del endpoint (ej: '/todos/1')
   * @returns {Promise} - Datos de la respuesta
   */
  async delete(endpoint) {
    const response = await this.api.delete(endpoint);
    return response.data;
  }
}

// 🏭 EXPORTAR INSTANCIA SINGLETON
// Una sola instancia de ApiService para toda la aplicación
export const apiService = new ApiService();