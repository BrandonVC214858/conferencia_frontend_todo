/**
 * 📝 COMPONENTE FORMULARIO DE TODO
 * 
 * Formulario reutilizable para crear y editar todos. Maneja tanto la creación 
 * de nuevos todos como la edición de todos existentes usando el mismo componente.
 * 
 * Funcionalidades:
 * - Creación de nuevos todos
 * - Edición de todos existentes
 * - Validación de formulario con Yup
 * - Manejo de estado de carga
 * - Integración con React Hook Form
 * - Validación client-side antes del envío
 * - Mensajes de error personalizados
 * - Reset automático del formulario después de crear
 * 
 * Campos del formulario:
 * - Título (requerido, máximo 255 caracteres)
 * - Descripción (opcional, máximo 1024 caracteres)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, X, Edit } from 'lucide-react';
import { Button, Input, Textarea } from '../ui';

// 📋 ESQUEMA DE VALIDACIÓN CON YUP
// Define las reglas de validación que coinciden con las del backend FastAPI
const schema = yup.object({
  // Título: requerido, no vacío, máximo 255 caracteres
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(1, 'El título no puede estar vacío')
    .max(255, 'El título no puede exceder 255 caracteres'),
  
  // Descripción: opcional, máximo 1024 caracteres
  description: yup
    .string()
    .max(1024, 'La descripción no puede exceder 1024 caracteres'),
});

/**
 * Componente de formulario para crear y editar todos
 * 
 * @param {Object|null} todo - Todo existente para editar (null para crear nuevo)
 * @param {Function} onSubmit - Función a llamar al enviar el formulario
 *   - Para crear: onSubmit(todoData)
 *   - Para editar: onSubmit(todoId, todoData)
 * @param {Function} onCancel - Función a llamar al cancelar el formulario
 * @param {boolean} loading - Si el formulario está en estado de carga
 * 
 * @example
 * // Crear nuevo todo
 * <TodoForm 
 *   onSubmit={handleCreate} 
 *   onCancel={() => setShowForm(false)}
 *   loading={isCreating}
 * />
 * 
 * // Editar todo existente
 * <TodoForm 
 *   todo={todoToEdit}
 *   onSubmit={handleUpdate} 
 *   onCancel={() => setEditingTodo(null)}
 *   loading={isUpdating}
 * />
 */
const TodoForm = ({ todo, onSubmit, onCancel, loading = false }) => {
  // 🔍 DETERMINAR SI ESTAMOS EDITANDO O CREANDO
  const isEditing = !!todo;
  
  // 🎣 CONFIGURAR REACT HOOK FORM
  const {
    register,           // Función para registrar campos del formulario
    handleSubmit,       // Función para manejar el envío del formulario
    formState: { errors }, // Errores de validación
    reset,              // Función para resetear el formulario
  } = useForm({
    resolver: yupResolver(schema), // Usar Yup para validación
    defaultValues: {
      // Valores por defecto: vacíos para crear, valores del todo para editar
      title: todo?.title || '',
      description: todo?.description || '',
    },
  });

  /**
   * 📨 MANEJAR ENVÍO DEL FORMULARIO
   * 
   * Procesa los datos del formulario y llama a la función onSubmit apropiada
   * según si estamos creando o editando un todo.
   * 
   * @param {Object} data - Datos del formulario validados
   */
  const handleFormSubmit = async (data) => {
    try {
      // 🔄 FORMATEAR DATOS PARA FASTAPI
      const submitData = {
        title: data.title,                    // Título del todo
        description: data.description || '',  // Descripción (vacía si no se proporciona)
        ...(isEditing && { completed: todo.completed }), // Preservar estado si editando
      };
      
      if (isEditing) {
        // ✏️ MODO EDICIÓN: pasar ID y datos
        await onSubmit(todo.id, submitData);
      } else {
        // 📝 MODO CREACIÓN: solo pasar datos
        await onSubmit(submitData);
      }
      
      // 🧹 LIMPIAR FORMULARIO SOLO DESPUÉS DE CREAR (no al editar)
      if (!isEditing) {
        reset();
      }
      
      // 🚪 CERRAR FORMULARIO
      onCancel();
    } catch (error) {
      // ⚠️ Los errores son manejados por el componente padre
      // que mostrará las notificaciones toast correspondientes
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* 📋 HEADER DEL FORMULARIO */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? 'Editar Todo' : 'Nuevo Todo'}
        </h3>
        {/* ❌ BOTÓN DE CERRAR */}
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* 📝 FORMULARIO */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* 🏷️ CAMPO TÍTULO */}
        <Input
          label="Título"
          placeholder="Ingresa el título del todo..."
          error={errors.title?.message}
          {...register('title')} // Registrar campo con React Hook Form
        />
        
        {/* 📄 CAMPO DESCRIPCIÓN */}
        <Textarea
          label="Descripción (opcional)"
          placeholder="Agrega una descripción..."
          rows={3}
          error={errors.description?.message}
          {...register('description')}
        />
        
        {/* 🎯 BOTONES DE ACCIÓN */}
        <div className="flex justify-end space-x-3 pt-4">
          {/* ❌ BOTÓN CANCELAR */}
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          
          {/* ✅ BOTÓN ENVIAR */}
          <Button type="submit" loading={loading}>
            {isEditing ? (
              // ✏️ Texto para editar
              <>
                <Edit className="h-4 w-4 mr-2" />
                Actualizar Todo
              </>
            ) : (
              // ➕ Texto para crear
              <>
                <Plus className="h-4 w-4 mr-2" />
                Crear Todo
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;