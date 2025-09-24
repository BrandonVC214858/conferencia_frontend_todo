import React, { useState } from 'react';
import { Check, Clock, Trash2, Edit } from 'lucide-react';
import { formatRelativeDate } from '../../utils';
import { Button } from '../ui';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(todo.id);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este todo?')) {
      setIsDeleting(true);
      try {
        await onDelete(todo.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`
      bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md
      ${todo.completed ? 'opacity-75' : ''}
    `}>
      <div className="flex items-start space-x-3">
        <button
          onClick={handleToggle}
          disabled={isToggling}
          className={`
            flex-shrink-0 mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors
            ${todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
            }
          `}
        >
          {todo.completed && <Check className="h-3 w-3" />}
        </button>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <h3 className={`
                text-base font-medium 
                ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}
              `}>
                {todo.title}
              </h3>
              
              {todo.description && (
                <p className={`
                  mt-1 text-sm 
                  ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}
                `}>
                  {todo.description}
                </p>
              )}
              
              <div className="flex items-center space-x-4 mt-2">
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                  ${todo.completed ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}
                `}>
                  {todo.completed ? '✅ Completado' : '⏳ Pendiente'}
                </span>
                
                {todo.createdAt && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatRelativeDate(todo.createdAt)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 ml-4">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(todo)}
                  className="p-1"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                loading={isDeleting}
                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;