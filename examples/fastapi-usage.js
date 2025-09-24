// 📋 Ejemplos de Uso - FastAPI Integration
// Este archivo muestra cómo usar los servicios integrados con FastAPI

import { todoService } from './src/services/todoService.js';

// ============================================
// 1. 📝 CREAR UN NUEVO TODO
// ============================================

async function createTodoExample() {
  try {
    const newTodo = {
      title: "Completar integración FastAPI",
      description: "Implementar todos los endpoints y pruebas",
      completed: false
    };

    const result = await todoService.createTodo(newTodo);
    console.log('✅ Todo creado:', result);
    
    // Respuesta esperada:
    // {
    //   "id": 1,
    //   "title": "Completar integración FastAPI", 
    //   "description": "Implementar todos los endpoints y pruebas",
    //   "completed": false,
    //   "created_at": "2025-09-24T10:00:00Z",
    //   "updated_at": "2025-09-24T10:00:00Z"
    // }

  } catch (error) {
    console.error('❌ Error al crear todo:', error);
  }
}

// ============================================
// 2. 📖 OBTENER TODOS LOS TODOS
// ============================================

async function getAllTodosExample() {
  try {
    const todos = await todoService.getTodos();
    console.log('📋 Lista de todos:', todos);
    
    // Respuesta esperada: Array de todos
    // [
    //   {
    //     "id": 1,
    //     "title": "Mi primera tarea",
    //     "description": "Descripción de ejemplo",
    //     "completed": false,
    //     "created_at": "2025-09-24T10:00:00Z",
    //     "updated_at": "2025-09-24T10:00:00Z"
    //   },
    //   ...
    // ]

  } catch (error) {
    console.error('❌ Error al obtener todos:', error);
  }
}

// ============================================
// 3. 🔍 OBTENER UN TODO ESPECÍFICO
// ============================================

async function getTodoByIdExample(todoId) {
  try {
    const todo = await todoService.getTodo(todoId);
    console.log('🔍 Todo específico:', todo);

  } catch (error) {
    if (error.status === 404) {
      console.error('❌ Todo no encontrado');
    } else {
      console.error('❌ Error al obtener todo:', error);
    }
  }
}

// ============================================
// 4. ✏️ ACTUALIZAR UN TODO
// ============================================

async function updateTodoExample(todoId) {
  try {
    const updatedData = {
      title: "Título actualizado",
      description: "Nueva descripción actualizada", 
      completed: true
    };

    const result = await todoService.updateTodo(todoId, updatedData);
    console.log('✏️ Todo actualizado:', result);

  } catch (error) {
    if (error.status === 404) {
      console.error('❌ Todo no encontrado para actualizar');
    } else if (error.status === 422) {
      console.error('❌ Datos inválidos:', error.details);
    } else {
      console.error('❌ Error al actualizar todo:', error);
    }
  }
}

// ============================================
// 5. 🔄 ALTERNAR ESTADO COMPLETADO
// ============================================

async function toggleTodoExample(todoId) {
  try {
    const result = await todoService.toggleTodo(todoId);
    console.log('🔄 Estado alternado:', result);

  } catch (error) {
    console.error('❌ Error al alternar estado:', error);
  }
}

// ============================================
// 6. 🗑️ ELIMINAR UN TODO
// ============================================

async function deleteTodoExample(todoId) {
  try {
    await todoService.deleteTodo(todoId);
    console.log('🗑️ Todo eliminado exitosamente');

  } catch (error) {
    if (error.status === 404) {
      console.error('❌ Todo no encontrado para eliminar');
    } else {
      console.error('❌ Error al eliminar todo:', error);
    }
  }
}

// ============================================
// 7. ❤️ HEALTH CHECK
// ============================================

async function healthCheckExample() {
  try {
    const health = await todoService.healthCheck();
    console.log('❤️ API saludable:', health);

  } catch (error) {
    console.error('💔 API no disponible:', error);
  }
}

// ============================================
// 8. ✅ VALIDACIÓN DE DATOS
// ============================================

function validateTodoExample() {
  const todoData = {
    title: "", // ❌ Título vacío
    description: "a".repeat(1025) // ❌ Descripción muy larga
  };

  const validation = todoService.validateTodo(todoData);
  
  if (!validation.isValid) {
    console.log('❌ Errores de validación:', validation.errors);
    // Output:
    // {
    //   title: 'El título es requerido',
    //   description: 'La descripción no puede exceder 1024 caracteres'
    // }
  } else {
    console.log('✅ Datos válidos');
  }
}

// ============================================
// 9. 🎯 EJEMPLO COMPLETO DE USO
// ============================================

async function completeWorkflowExample() {
  try {
    // 1. Verificar que la API esté disponible
    console.log('🔍 Verificando estado de la API...');
    await healthCheckExample();

    // 2. Crear un nuevo todo
    console.log('📝 Creando nuevo todo...');
    const newTodo = await todoService.createTodo({
      title: "Tarea de ejemplo",
      description: "Esta es una tarea de prueba",
      completed: false
    });

    // 3. Obtener todos los todos
    console.log('📋 Obteniendo lista completa...');
    const todos = await todoService.getTodos();

    // 4. Actualizar el todo recién creado
    console.log('✏️ Actualizando todo...');
    await todoService.updateTodo(newTodo.id, {
      title: "Tarea actualizada",
      description: "Descripción actualizada",
      completed: false
    });

    // 5. Alternar su estado
    console.log('🔄 Alternando estado...');
    await todoService.toggleTodo(newTodo.id);

    // 6. Finalmente eliminarlo (opcional)
    console.log('🗑️ Eliminando todo...');
    // await todoService.deleteTodo(newTodo.id);

    console.log('🎉 Flujo completo exitoso!');

  } catch (error) {
    console.error('❌ Error en el flujo:', error);
  }
}

// ============================================
// 10. 🔧 MANEJO DE ERRORES AVANZADO
// ============================================

async function advancedErrorHandlingExample() {
  try {
    await todoService.getTodo(999); // ID que no existe
    
  } catch (error) {
    // Manejo específico por tipo de error
    switch(error.status) {
      case 404:
        console.log('🔍 El todo solicitado no existe');
        break;
      case 422:
        console.log('📋 Datos de entrada inválidos:', error.details);
        break;
      case 0:
        console.log('🌐 Sin conexión con el servidor');
        console.log('💡 Verifica que FastAPI esté ejecutándose en http://localhost:8000');
        break;
      default:
        console.log('⚠️ Error inesperado:', error.message);
    }
  }
}

// ============================================
// 🚀 EJECUTAR EJEMPLOS
// ============================================

// Descomenta las líneas que quieras probar:

// createTodoExample();
// getAllTodosExample();
// getTodoByIdExample(1);
// updateTodoExample(1);
// toggleTodoExample(1);
// deleteTodoExample(1);
// healthCheckExample();
// validateTodoExample();
// completeWorkflowExample();
// advancedErrorHandlingExample();

export {
  createTodoExample,
  getAllTodosExample,
  getTodoByIdExample,
  updateTodoExample,
  toggleTodoExample,
  deleteTodoExample,
  healthCheckExample,
  validateTodoExample,
  completeWorkflowExample,
  advancedErrorHandlingExample
};