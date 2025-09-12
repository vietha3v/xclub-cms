'use client';

import React from 'react';
import { MedalTemplate } from '@/types/template';
import dlv from 'dlv';

interface MedalPreviewProps {
  template: MedalTemplate;
  previewData?: Record<string, string>;
  className?: string;
}

export default function MedalPreview({ 
  template, 
  previewData = {}, 
  className = '' 
}: MedalPreviewProps) {
  const generatePreviewHtml = () => {
    let html = dlv(template, 'htmlTemplate', '');
    
    // Replace variables in HTML template
    const variables = dlv(template, 'variables', []);
    variables.forEach((variable: any) => {
      const value = dlv(previewData, variable.name, `{{${variable.name}}}`);
      const regex = new RegExp(`{{${variable.name}}}`, 'g');
      html = html.replace(regex, value);
    });
    
    return html;
  };

  const defaultPreviewData = {
    participantName: 'Nguyễn Văn A',
    challengeName: 'Thử thách chạy bộ 5K',
    achievement: 'Hạng nhất',
    completionDate: '15/12/2024',
    score: '95',
    time: '25:30',
    distance: '5.0 km'
  };

  const finalPreviewData = { ...defaultPreviewData, ...previewData };
  const previewHtml = generatePreviewHtml();

  return (
    <div className={`medal-preview ${className}`}>
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{
          transform: 'scale(0.3)',
          transformOrigin: 'center',
          maxWidth: '100%',
          overflow: 'visible'
        }}
        dangerouslySetInnerHTML={{ __html: previewHtml }}
      />
    </div>
  );
}
