import { apiService } from './apiService';

class TodoService {
  constructor() {
    this.endpoint = '/todos';
  }

  async getTodos(params = {}) {
    const queryParams = {
      page: params.page || 1,
      limit: params.limit || 10,
      ...(params.status && params.status !== 'all' && { status: params.status }),
      ...(params.priority && params.priority !== 'all' && { priority: params.priority }),
      ...(params.search && { search: params.search }),
    };

    const response = await apiService.get(this.endpoint, queryParams);
    return response;
  }

  async getTodo(id) {
    const response = await apiService.get(`${this.endpoint}/${id}`);
    return response;
  }

  async createTodo(todo) {
    const response = await apiService.post(this.endpoint, todo);
    return response;
  }

  async updateTodo(id, todo) {
    const response = await apiService.put(`${this.endpoint}/${id}`, todo);
    return response;
  }

  async toggleTodo(id) {
    const response = await apiService.patch(`${this.endpoint}/${id}/toggle`);
    return response;
  }

  async deleteTodo(id) {
    await apiService.delete(`${this.endpoint}/${id}`);
  }
}

export const todoService = new TodoService();