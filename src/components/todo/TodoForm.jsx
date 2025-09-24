import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, X } from 'lucide-react';
import { Button, Input, Textarea, Select } from '../ui';

const schema = yup.object({
  title: yup.string().required('El título es obligatorio').min(1, 'El título no puede estar vacío'),
  description: yup.string(),
  priority: yup.string().oneOf(['low', 'medium', 'high']).required('La prioridad es obligatoria'),
  dueDate: yup.string(),
});

const priorityOptions = [
  { value: 'low', label: '🟢 Baja' },
  { value: 'medium', label: '🟡 Media' },
  { value: 'high', label: '🔴 Alta' },
];

const TodoForm = ({ onSubmit, onCancel, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      // Remove empty fields
      const submitData = {
        ...data,
        dueDate: data.dueDate || undefined,
        description: data.description || undefined,
      };
      
      await onSubmit(submitData);
      reset();
      onCancel();
    } catch (error) {
      // Error is handled by the parent component
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Nuevo Todo</h3>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Prioridad"
            options={priorityOptions}
            error={errors.priority?.message}
            {...register('priority')}
          />
          
          <Input
            label="Fecha límite (opcional)"
            type="datetime-local"
            error={errors.dueDate?.message}
            {...register('dueDate')}
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            <Plus className="h-4 w-4 mr-2" />
            Crear Todo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;