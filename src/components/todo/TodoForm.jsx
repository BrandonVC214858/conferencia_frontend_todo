import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, X, Edit } from 'lucide-react';
import { Button, Input, Textarea } from '../ui';

const schema = yup.object({
  title: yup.string().required('El título es obligatorio').min(1, 'El título no puede estar vacío').max(255, 'El título no puede exceder 255 caracteres'),
  description: yup.string().max(1024, 'La descripción no puede exceder 1024 caracteres'),
});

const TodoForm = ({ todo, onSubmit, onCancel, loading = false }) => {
  const isEditing = !!todo;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      // Format data for FastAPI (simple structure as per your example)
      const submitData = {
        title: data.title,
        description: data.description || '',
        ...(isEditing && { completed: todo.completed }),
      };
      
      if (isEditing) {
        await onSubmit(todo.id, submitData);
      } else {
        await onSubmit(submitData);
      }
      
      if (!isEditing) {
        reset();
      }
      onCancel();
    } catch (error) {
      // Error is handled by the parent component
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? 'Editar Todo' : 'Nuevo Todo'}
        </h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Título"
          placeholder="Ingresa el título del todo..."
          error={errors.title?.message}
          {...register('title')}
        />
        
        <Textarea
          label="Descripción (opcional)"
          placeholder="Agrega una descripción..."
          rows={3}
          error={errors.description?.message}
          {...register('description')}
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            {isEditing ? (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Actualizar Todo
              </>
            ) : (
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