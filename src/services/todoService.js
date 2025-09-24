/**
 * 📋 SERVICIO DE TODOS
 * 
 * Este archivo maneja todas las operaciones CRUD (Create, Read, Update, Delete) 
 * relacionadas con los todos, interactuando directamente con la API de FastAPI.
 * 
 * Funcionalidades:
 * - Obtener lista de todos
 * - Crear nuevos todos
 * - Actualizar todos existentes
 * - Eliminar todos
 * - Alternar estado completado/pendiente
 * - Validación de datos
 * - Health check de la API
 */

import { apiService } from './apiService';

/**
 * Clase que encapsula todas las operaciones relacionadas con todos
 * Utiliza el patrón Repository para abstraer las llamadas a la API
 */
class TodoService {
  /**
   * Constructor - Define el endpoint base para todas las operaciones
   */
  constructor() {
    this.endpoint = '/todos'; // Endpoint base en FastAPI
  }

  /**
   * 📖 OBTENER TODOS LOS TODOS
   * 
   * Llama al endpoint GET /todos de FastAPI para obtener la lista completa
   * FastAPI devuelve un array directamente, sin paginación
   * 
   * @param {Object} params - Parámetros de filtrado (actualmente no usados por FastAPI básico)
   * @returns {Promise<Array>} - Array de todos desde FastAPI
   */
  async getTodos(params = {}) {
    // FastAPI returns array directly for GET /todos
    const response = await apiService.get(this.endpoint);
    
    // La respuesta debería ser un array directamente desde FastAPI
    if (Array.isArray(response)) {
      return response;
    }
    
    // Fallback si la respuesta tiene una propiedad data
    return response.data || [];
  }

  /**
   * 🔍 OBTENER UN TODO ESPECÍFICO
   * 
   * Llama al endpoint GET /todos/{id} para obtener un todo por su ID
   * 
   * @param {number|string} id - ID del todo a obtener
   * @returns {Promise<Object>} - Objeto todo desde FastAPI
   * @throws {Error} - Error 404 si el todo no existe
   */
  async getTodo(id) {
    const response = await apiService.get(`${this.endpoint}/${id}`);
    return response;
  }

  /**
   * 📝 CREAR UN NUEVO TODO
   * 
   * Llama al endpoint POST /todos para crear un nuevo todo
   * Estructura requerida por FastAPI: {title, description, completed}
   * 
   * @param {Object} todo - Datos del todo a crear
   * @param {string} todo.title - Título del todo (requerido)
   * @param {string} todo.description - Descripción opcional
   * @returns {Promise<Object>} - Todo creado con ID asignado por FastAPI
   */
  async createTodo(todo) {
    // Estructura para FastAPI según el ejemplo proporcionado
    const todoData = {
      title: todo.title,
      description: todo.description || '',
      completed: false, // Siempre empezar como no completado para nuevos todos
    };

    const response = await apiService.post(this.endpoint, todoData);
    return response;
  }

  /**
   * ✏️ ACTUALIZAR UN TODO EXISTENTE
   * 
   * Llama al endpoint PUT /todos/{id} para actualizar un todo completo
   * Estructura requerida por FastAPI: {title, description, completed}
   * 
   * @param {number|string} id - ID del todo a actualizar
   * @param {Object} todo - Datos actualizados del todo
   * @param {string} todo.title - Nuevo título
   * @param {string} todo.description - Nueva descripción
   * @param {boolean} todo.completed - Estado de completado
   * @returns {Promise<Object>} - Todo actualizado desde FastAPI
   */
  async updateTodo(id, todo) {
    // Estructura para FastAPI según el ejemplo proporcionado
    const todoData = {
      title: todo.title,
      description: todo.description || '',
      completed: todo.completed !== undefined ? todo.completed : false,
    };

    const response = await apiService.put(`${this.endpoint}/${id}`, todoData);
    return response;
  }

  /**
   * 🔄 ALTERNAR ESTADO DE COMPLETADO
   * 
   * Cambia el estado de un todo de completado a pendiente o viceversa
   * Como FastAPI no tiene endpoint específico para toggle, primero obtiene 
   * el todo actual y luego lo actualiza con el estado opuesto
   * 
   * @param {number|string} id - ID del todo a alternar
   * @returns {Promise<Object>} - Todo con estado actualizado
   */
  async toggleTodo(id) {
    // Obtener el todo actual primero
    const todo = await this.getTodo(id);
    
    // Crear objeto actualizado con estado opuesto
    const updatedTodo = {
      title: todo.title,
      description: todo.description || '',
      completed: !todo.completed, // Alternar el estado
    };
    
    // Enviar la actualización completa
    const response = await apiService.put(`${this.endpoint}/${id}`, updatedTodo);
    return response;
  }

  /**
   * 🗑️ ELIMINAR UN TODO
   * 
   * Llama al endpoint DELETE /todos/{id} para eliminar un todo
   * 
   * @param {number|string} id - ID del todo a eliminar
   * @returns {Promise<void>} - No devuelve datos, solo confirma la eliminación
   * @throws {Error} - Error 404 si el todo no existe
   */
  async deleteTodo(id) {
    await apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * ❤️ HEALTH CHECK DE LA API
   * 
   * Verifica que la API de FastAPI esté disponible y respondiendo
   * Llama al endpoint GET /health
   * 
   * @returns {Promise<Object>} - Estado de salud de la API
   * @throws {Error} - Error si la API no está disponible
   */
  async healthCheck() {
    const response = await apiService.get('/health');
    return response;
  }

  /**
   * ✅ VALIDACIÓN DE DATOS DEL TODO
   * 
   * Valida los datos del todo antes de enviarlos a la API
   * Implementa las mismas reglas que FastAPI para evitar errores 422
   * 
   * Reglas de validación:
   * - Título: requerido, no vacío, máximo 255 caracteres
   * - Descripción: opcional, máximo 1024 caracteres
   * 
   * @param {Object} todoData - Datos del todo a validar
   * @param {string} todoData.title - Título a validar
   * @param {string} todoData.description - Descripción a validar
   * @returns {Object} - {isValid: boolean, errors: Object}
   */
  validateTodo(todoData) {
    const errors = {};
    
    // Validación del título (requerido)
    if (!todoData.title || todoData.title.trim().length === 0) {
      errors.title = 'El título es requerido';
    }
    
    // Validación de longitud del título (máximo 255 caracteres)
    if (todoData.title && todoData.title.length > 255) {
      errors.title = 'El título no puede exceder 255 caracteres';
    }
    
    // Validación de longitud de la descripción (máximo 1024 caracteres)
    if (todoData.description && todoData.description.length > 1024) {
      errors.description = 'La descripción no puede exceder 1024 caracteres';
    }
    
    // Retornar resultado de la validación
    return { 
      isValid: Object.keys(errors).length === 0, 
      errors 
    };
  }
}

// 🏭 EXPORTAR INSTANCIA SINGLETON
// Una sola instancia de TodoService para toda la aplicación
export const todoService = new TodoService();