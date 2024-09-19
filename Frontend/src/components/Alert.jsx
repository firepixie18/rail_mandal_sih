import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const Alert = ({ children, variant = 'default', icon, className = '', ...props }) => {
  const variants = {
    default: 'bg-gray-100 border-gray-300 text-gray-800',
    success: 'bg-green-100 border-green-300 text-green-800',
    error: 'bg-red-100 border-red-300 text-red-800',
    warning: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    info: 'bg-blue-100 border-blue-300 text-blue-800',
  };

  const icons = {
    default: Info,
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info,
  };

  const IconComponent = icon || icons[variant];

  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm rounded-lg border ${variants[variant]} ${className}`}
      role="alert"
      {...props}
    >
      <IconComponent className="flex-shrink-0 w-5 h-5 mr-3" />
      <div>{children}</div>
    </div>
  );
};

export const AlertTitle = ({ children, className = '', ...props }) => (
  <h3 className={`font-medium ${className}`} {...props}>
    {children}
  </h3>
);

export const AlertDescription = ({ children, className = '', ...props }) => (
  <div className={`mt-1 text-sm ${className}`} {...props}>
    {children}
  </div>
);

export default Alert;