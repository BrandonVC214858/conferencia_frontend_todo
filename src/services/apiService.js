import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        let apiError = {
          message: 'Error desconocido',
          status: 500,
          code: null,
        };

        if (error.response) {
          const { status, data } = error.response;
          
          // Handle FastAPI errors as per your example
          if (status === 404) {
            apiError.message = 'Todo no encontrado';
            apiError.status = 404;
          } else if (status === 422) {
            // FastAPI validation errors
            apiError.message = 'Datos inválidos';
            apiError.status = 422;
            apiError.code = 'VALIDATION_ERROR';
            // Include validation details if available
            if (data?.detail) {
              apiError.details = data.detail;
              if (Array.isArray(data.detail)) {
                // Format validation errors for better display
                apiError.message = data.detail.map(err => 
                  `${err.loc?.join('.') || 'Campo'}: ${err.msg}`
                ).join(', ');
              } else if (typeof data.detail === 'string') {
                apiError.message = data.detail;
              }
            }
          } else if (status >= 500) {
            apiError.message = 'Error del servidor';
            apiError.status = status;
          } else {
            apiError.message = data?.message || error.message || 'Error en la petición';
            apiError.status = status;
          }
        } else if (error.request) {
          // Network error
          apiError.message = 'Error de conexión. Verifica que el servidor esté ejecutándose en http://localhost:8000';
          apiError.status = 0;
          apiError.code = 'NETWORK_ERROR';
        } else {
          apiError.message = error.message || 'Error inesperado';
        }
        
        return Promise.reject(apiError);
      }
    );
  }

  async get(endpoint, params) {
    const response = await this.api.get(endpoint, { params });
    return response.data;
  }

  async post(endpoint, data) {
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  async put(endpoint, data) {
    const response = await this.api.put(endpoint, data);
    return response.data;
  }

  async patch(endpoint, data) {
    const response = await this.api.patch(endpoint, data);
    return response.data;
  }

  async delete(endpoint) {
    const response = await this.api.delete(endpoint);
    return response.data;
  }
}

export const apiService = new ApiService();