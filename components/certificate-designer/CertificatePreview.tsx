'use client';

import React from 'react';
import { CertificateTemplate } from '@/types/template';

interface CertificatePreviewProps {
  template: CertificateTemplate;
  previewData?: Record<string, any>;
  className?: string;
}

export default function CertificatePreview({ 
  template, 
  previewData = {}, 
  className = '' 
}: CertificatePreviewProps) {
  const generatePreviewHtml = (template: CertificateTemplate, data: Record<string, any>) => {
    let html = template.htmlTemplate;
    
    // Replace variables with preview data
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, value || `{{${key}}}`);
    });
    
    return html;
  };

  const previewHtml = generatePreviewHtml(template, previewData);

  return (
    <div className={`certificate-preview ${className}`}>
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{
          transform: 'scale(0.2)',
          transformOrigin: 'center',
          maxWidth: '100%',
          overflow: 'visible'
        }}
        dangerouslySetInnerHTML={{ __html: previewHtml }}
      />
    </div>
  );
}
