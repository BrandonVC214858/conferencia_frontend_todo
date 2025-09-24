import { apiService } from './apiService';

class TodoService {
  constructor() {
    this.endpoint = '/todos';
  }

  async getTodos(params = {}) {
    // FastAPI returns array directly for GET /todos
    const response = await apiService.get(this.endpoint);
    
    // The response should be an array directly from FastAPI
    if (Array.isArray(response)) {
      return response;
    }
    
    // Fallback if response has data property
    return response.data || [];
  }

  async getTodo(id) {
    const response = await apiService.get(`${this.endpoint}/${id}`);
    return response;
  }

  async createTodo(todo) {
    // Structure for FastAPI as per your example
    const todoData = {
      title: todo.title,
      description: todo.description || '',
      completed: false, // Always start as false for new todos
    };

    const response = await apiService.post(this.endpoint, todoData);
    return response;
  }

  async updateTodo(id, todo) {
    // Structure for FastAPI as per your example
    const todoData = {
      title: todo.title,
      description: todo.description || '',
      completed: todo.completed !== undefined ? todo.completed : false,
    };

    const response = await apiService.put(`${this.endpoint}/${id}`, todoData);
    return response;
  }

  async toggleTodo(id) {
    // Get the current todo first, then update its completed status
    const todo = await this.getTodo(id);
    const updatedTodo = {
      title: todo.title,
      description: todo.description || '',
      completed: !todo.completed,
    };
    
    const response = await apiService.put(`${this.endpoint}/${id}`, updatedTodo);
    return response;
  }

  async deleteTodo(id) {
    await apiService.delete(`${this.endpoint}/${id}`);
  }

  // Add health check method
  async healthCheck() {
    const response = await apiService.get('/health');
    return response;
  }

  // Validation function as per your example
  validateTodo(todoData) {
    const errors = {};
    
    if (!todoData.title || todoData.title.trim().length === 0) {
      errors.title = 'El título es requerido';
    }
    
    if (todoData.title && todoData.title.length > 255) {
      errors.title = 'El título no puede exceder 255 caracteres';
    }
    
    if (todoData.description && todoData.description.length > 1024) {
      errors.description = 'La descripción no puede exceder 1024 caracteres';
    }
    
    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

export const todoService = new TodoService();