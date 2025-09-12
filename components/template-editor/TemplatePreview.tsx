'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Download, Share, Copy, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { MedalTemplate, CertificateTemplate, PreviewDataDto } from '@/types/template';

interface TemplatePreviewProps {
  template: MedalTemplate | CertificateTemplate;
  previewData: PreviewDataDto;
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatePreview({
  template,
  previewData,
  isOpen,
  onClose
}: TemplatePreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      generatePreview();
    }
  }, [isOpen, template, previewData]);

  const generatePreview = () => {
    let html = template.htmlTemplate;

    // Replace variables with preview data
    template.variables.forEach(variable => {
      const regex = new RegExp(`{{${variable.name}}}`, 'g');
      const value = previewData[variable.name as keyof PreviewDataDto] || 
                   previewData[variable.name] || 
                   `{{${variable.name}}}`;
      html = html.replace(regex, String(value));
    });

    // Create complete HTML document
    const completeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${template.name} - Preview</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
            font-family: Arial, sans-serif;
          }
          .preview-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        <div class="preview-container">
          ${html}
        </div>
      </body>
      </html>
    `;

    setGeneratedHtml(completeHtml);

    // Render preview in iframe
    if (previewRef.current) {
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.srcdoc = completeHtml;
      
      previewRef.current.innerHTML = '';
      previewRef.current.appendChild(iframe);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([generatedHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.name}-preview.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast({
        type: 'success',
        message: 'File đã được tải xuống!',
        title: 'Thành công'
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi tải xuống file',
        title: 'Lỗi'
      });
    }
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(generatedHtml);
      showToast({
        type: 'success',
        message: 'HTML đã được sao chép vào clipboard!',
        title: 'Thành công'
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi sao chép',
        title: 'Lỗi'
      });
    }
  };

  const handleShare = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: template.name,
          text: template.description || '',
          url: window.location.href,
        });
      } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast({
          type: 'success',
          message: 'Link đã được sao chép vào clipboard!',
          title: 'Thành công'
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi chia sẻ',
        title: 'Lỗi'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-6xl h-5/6">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold">{template.name}</h2>
              {template.description && (
                <p className="text-base-content/70 mt-1">{template.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className="btn btn-ghost btn-sm"
                title={showCode ? 'Ẩn code' : 'Hiện code'}
              >
                {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCopy}
                className="btn btn-ghost btn-sm"
                title="Sao chép HTML"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="btn btn-ghost btn-sm"
                title="Tải xuống"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="btn btn-ghost btn-sm"
                title="Chia sẻ"
              >
                <Share className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm"
              >
                Đóng
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {showCode ? (
              <div className="h-full flex">
                {/* Code View */}
                <div className="flex-1 p-4">
                  <h3 className="font-semibold mb-2">Generated HTML:</h3>
                  <pre className="bg-base-200 p-4 rounded text-sm overflow-auto h-full">
                    {generatedHtml}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-full p-4">
                <h3 className="font-semibold mb-2">Preview:</h3>
                <div
                  ref={previewRef}
                  className="w-full h-full border rounded bg-white overflow-auto"
                  style={{ minHeight: '500px' }}
                >
                  {/* Preview will be rendered here */}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-base-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-base-content/70">
                Template: {template.type} | Biến: {template.variables.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={generatePreview}
                  className="btn btn-outline btn-sm"
                >
                  Làm mới Preview
                </button>
                <button
                  onClick={onClose}
                  className="btn btn-primary btn-sm"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
