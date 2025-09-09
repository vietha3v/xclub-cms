'use client';

import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export default function ErrorState({
  title = 'Có lỗi xảy ra',
  message = 'Đã xảy ra lỗi không mong muốn',
  icon = '❌',
  onRetry,
  retryText = 'Thử lại',
  className = ''
}: ErrorStateProps) {
  return (
    <div className={`text-center py-20 ${className}`}>
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-base-content mb-4">{title}</h3>
      <p className="text-base-content/70 mb-6">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">
          {retryText}
        </button>
      )}
    </div>
  );
}
