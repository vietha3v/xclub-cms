import React from 'react';

interface ValidationErrorProps {
  error?: { message?: string };
  className?: string;
}

export default function ValidationError({ error, className = '' }: ValidationErrorProps) {
  if (!error?.message) return null;

  return (
    <div className={`flex items-center gap-2 text-error text-sm ${className}`}>
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{error.message}</span>
    </div>
  );
}

interface ValidationSuccessProps {
  message: string;
  className?: string;
}

export function ValidationSuccess({ message, className = '' }: ValidationSuccessProps) {
  return (
    <div className={`flex items-center gap-2 text-success text-sm ${className}`}>
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: { message?: string };
  success?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ 
  label, 
  required = false, 
  error, 
  success, 
  children, 
  className = '' 
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-base-content">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {children}
      <ValidationError error={error} />
      {success && <ValidationSuccess message={success} />}
    </div>
  );
}
