import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { todoService } from '../../services';

const HealthCheck = ({ className = '' }) => {
  const [status, setStatus] = useState('checking'); // 'healthy', 'error', 'checking'
  const [lastCheck, setLastCheck] = useState(null);

  const checkHealth = async () => {
    try {
      setStatus('checking');
      await todoService.healthCheck();
      setStatus('healthy');
      setLastCheck(new Date());
    } catch (error) {
      setStatus('error');
      setLastCheck(new Date());
      console.error('Health check failed:', error);
    }
  };

  useEffect(() => {
    // Initial check
    checkHealth();

    // Set up periodic health checks
    const interval = setInterval(checkHealth, 
      parseInt(import.meta.env.VITE_HEALTH_CHECK_INTERVAL) || 30000
    );

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'checking':
        return <AlertCircle className="h-4 w-4 text-yellow-500 animate-pulse" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'healthy':
        return 'API Conectada';
      case 'error':
        return 'API Desconectada';
      case 'checking':
        return 'Verificando...';
      default:
        return 'Estado desconocido';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'checking':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {getStatusIcon()}
      <span className={`text-sm ${getStatusColor()}`}>
        {getStatusText()}
      </span>
      {lastCheck && status !== 'checking' && (
        <span className="text-xs text-gray-500">
          ({new Date(lastCheck).toLocaleTimeString()})
        </span>
      )}
    </div>
  );
};

export default HealthCheck;