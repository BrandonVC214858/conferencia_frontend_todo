/**
 * 🚀 COMPONENTE PRINCIPAL DE LA APLICACIÓN
 * 
 * Este es el punto de entrada principal de la aplicación Todo App.
 * Actualmente renderiza directamente la página TodoPage, pero puede
 * expandirse para incluir routing, providers globales, o layout principal.
 * 
 * Funcionalidades:
 * - Renderiza la página principal de todos
 * - Punto central para agregar configuraciones globales
 * - Base para futuras expansiones de routing
 * - Configuración de providers y contextos globales
 * 
 * Arquitectura:
 * - Componente simple que delega a TodoPage
 * - Preparado para escalabilidad futura
 * - Separación clara entre App y páginas específicas
 */

import React from 'react';
import { TodoPage } from './pages';

/**
 * Componente raíz de la aplicación
 * 
 * Actualmente renderiza solo TodoPage, pero puede expandirse para incluir:
 * - React Router para navegación
 * - Context Providers para estado global
 * - Layout components compartidos
 * - Configuración de temas
 * - Manejo de errores global
 */
const App = () => {
  return <TodoPage />;
};

export default App;
