import { format, formatDistance, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy HH:mm');
};

export const formatRelativeDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { 
    addSuffix: true,
    locale: es 
  });
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const getDueDateClass = (dueDate, completed = false) => {
  if (completed || !dueDate) return '';
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffInHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 0) return 'text-red-600'; // Overdue
  if (diffInHours < 24) return 'text-orange-600'; // Due soon
  if (diffInHours < 72) return 'text-yellow-600'; // Due in 3 days
  
  return 'text-gray-600';
};

// Helper functions for FastAPI date handling
export const formatDateForAPI = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

export const formatDateFromAPI = (dateString) => {
  if (!dateString) return null;
  return dateString.split('T')[0]; // Return just the date part for inputs
};