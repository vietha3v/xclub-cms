'use client';

import React from 'react';
import { Construction, ArrowLeft, Home } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  description?: string;
  featureName?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  onBack?: () => void;
  onHome?: () => void;
  className?: string;
}

export default function ComingSoon({
  title = 'Chức năng đang phát triển',
  description = 'Chúng tôi đang nỗ lực hoàn thiện tính năng này để mang đến trải nghiệm tốt nhất cho bạn.',
  featureName,
  showBackButton = true,
  showHomeButton = true,
  onBack,
  onHome,
  className = ''
}: ComingSoonProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className={`min-h-screen bg-base-200 flex items-center justify-center p-4 ${className}`}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-4">
            <Construction className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-base-content mb-4">
          {title}
        </h1>

        {/* Feature Name */}
        {featureName && (
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-lg font-semibold">
              {featureName}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-sm text-base-content/50">
            Đang trong quá trình phát triển...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="btn btn-outline btn-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </button>
          )}
          
          {showHomeButton && (
            <button
              onClick={handleHome}
              className="btn btn-primary btn-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Về trang chủ
            </button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-base-100 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Thông tin cập nhật</h3>
          <p className="text-base-content/70 text-sm">
            Chúng tôi sẽ thông báo ngay khi tính năng này sẵn sàng. 
            Hãy theo dõi các thông báo từ hệ thống hoặc liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào.
          </p>
        </div>
      </div>
    </div>
  );
}
