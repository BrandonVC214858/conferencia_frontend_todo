import React from 'react';

const Card = ({ children, className = '', padding = true }) => {
  const classes = `
    bg-white rounded-lg border border-gray-200 shadow-sm
    ${padding ? 'p-6' : ''}
    ${className}
  `;
  
  return (
    <div className={classes.trim()}>
      {children}
    </div>
  );
};

export default Card;