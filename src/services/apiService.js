import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
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
        const apiError = {
          message: error.response?.data?.message || error.message || 'Something went wrong',
          status: error.response?.status || 500,
          code: error.response?.data?.code,
        };
        
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