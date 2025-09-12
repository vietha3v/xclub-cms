'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Eye, Code, Palette, Undo, Redo } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { MedalTemplate, CertificateTemplate, TemplateVariable } from '@/types/template';
import Modal from '@/components/common/Modal';

interface TemplateEditorProps {
  template: MedalTemplate | CertificateTemplate;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: MedalTemplate | CertificateTemplate) => void;
}

export default function TemplateEditor({
  template,
  isOpen,
  onClose,
  onSave
}: TemplateEditorProps) {
  const [htmlContent, setHtmlContent] = useState(template.htmlTemplate);
  const [cssContent, setCssContent] = useState(template.cssStyles);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'preview'>('html');
  const [isDirty, setIsDirty] = useState(false);
  const [previewData, setPreviewData] = useState<Record<string, string>>({});
  const { showToast } = useToast();

  const htmlEditorRef = useRef<HTMLTextAreaElement>(null);
  const cssEditorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Initialize preview data
  useEffect(() => {
    const initialData: Record<string, string> = {};
    template.variables.forEach(variable => {
      switch (variable.type) {
        case 'participant_name':
          initialData[variable.name] = 'Nguyễn Văn A';
          break;
        case 'challenge_name':
          initialData[variable.name] = 'Marathon 2025';
          break;
        case 'achievement':
          initialData[variable.name] = '21km Half Marathon';
          break;
        case 'completion_date':
          initialData[variable.name] = '15/01/2025';
          break;
        case 'rank':
          initialData[variable.name] = '5';
          break;
        case 'score':
          initialData[variable.name] = '95';
          break;
        case 'distance':
          initialData[variable.name] = '21.1';
          break;
        case 'time':
          initialData[variable.name] = '1:45:30';
          break;
        default:
          initialData[variable.name] = `Sample ${variable.label}`;
      }
    });
    setPreviewData(initialData);
  }, [template.variables]);

  // Check for changes
  useEffect(() => {
    const hasChanges = htmlContent !== template.htmlTemplate || cssContent !== template.cssStyles;
    setIsDirty(hasChanges);
  }, [htmlContent, cssContent, template.htmlTemplate, template.cssStyles]);

  const handleSave = () => {
    const updatedTemplate = {
      ...template,
      htmlTemplate: htmlContent,
      cssStyles: cssContent,
    };
    onSave(updatedTemplate);
    setIsDirty(false);
    showToast('Template đã được lưu thành công!', 'success');
  };

  const handleClose = () => {
    if (isDirty) {
      if (confirm('Bạn có thay đổi chưa được lưu. Bạn có chắc chắn muốn đóng?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const generatePreview = () => {
    if (!previewRef.current) return;

    let html = htmlContent;
    let css = cssContent;

    // Replace variables with preview data
    template.variables.forEach(variable => {
      const regex = new RegExp(`{{${variable.name}}}`, 'g');
      html = html.replace(regex, previewData[variable.name] || `{{${variable.name}}}`);
    });

    // Create preview HTML
    const previewHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

    // Create iframe for preview
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.srcdoc = previewHtml;

    // Clear and add iframe
    previewRef.current.innerHTML = '';
    previewRef.current.appendChild(iframe);
  };

  const handleTabChange = (tab: 'html' | 'css' | 'preview') => {
    setActiveTab(tab);
    if (tab === 'preview') {
      setTimeout(() => generatePreview(), 100);
    }
  };

  const handleUndo = () => {
    // Simple undo implementation
    if (activeTab === 'html' && htmlEditorRef.current) {
      htmlEditorRef.current.focus();
      document.execCommand('undo');
    } else if (activeTab === 'css' && cssEditorRef.current) {
      cssEditorRef.current.focus();
      document.execCommand('undo');
    }
  };

  const handleRedo = () => {
    // Simple redo implementation
    if (activeTab === 'html' && htmlEditorRef.current) {
      htmlEditorRef.current.focus();
      document.execCommand('redo');
    } else if (activeTab === 'css' && cssEditorRef.current) {
      cssEditorRef.current.focus();
      document.execCommand('redo');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Chỉnh sửa Template</h2>
          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              className="btn btn-ghost btn-sm"
              title="Hoàn tác"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              className="btn btn-ghost btn-sm"
              title="Làm lại"
            >
              <Redo className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary"
              disabled={!isDirty}
            >
              <Save className="w-4 h-4" />
              Lưu
            </button>
            <button
              onClick={handleClose}
              className="btn btn-ghost"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs tabs-bordered border-b">
          <button
            className={`tab ${activeTab === 'html' ? 'tab-active' : ''}`}
            onClick={() => handleTabChange('html')}
          >
            <Code className="w-4 h-4 mr-2" />
            HTML
          </button>
          <button
            className={`tab ${activeTab === 'css' ? 'tab-active' : ''}`}
            onClick={() => handleTabChange('css')}
          >
            <Palette className="w-4 h-4 mr-2" />
            CSS
          </button>
          <button
            className={`tab ${activeTab === 'preview' ? 'tab-active' : ''}`}
            onClick={() => handleTabChange('preview')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'html' && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b bg-base-200">
                <h3 className="font-semibold">HTML Template</h3>
                <p className="text-sm text-base-content/70">
                  Chỉnh sửa HTML template. Sử dụng {{variableName}} để tham chiếu biến.
                </p>
              </div>
              <div className="flex-1 p-4">
                <textarea
                  ref={htmlEditorRef}
                  className="w-full h-full font-mono text-sm resize-none border rounded p-4"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="Nhập HTML template..."
                />
              </div>
            </div>
          )}

          {activeTab === 'css' && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b bg-base-200">
                <h3 className="font-semibold">CSS Styles</h3>
                <p className="text-sm text-base-content/70">
                  Chỉnh sửa CSS styles cho template.
                </p>
              </div>
              <div className="flex-1 p-4">
                <textarea
                  ref={cssEditorRef}
                  className="w-full h-full font-mono text-sm resize-none border rounded p-4"
                  value={cssContent}
                  onChange={(e) => setCssContent(e.target.value)}
                  placeholder="Nhập CSS styles..."
                />
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b bg-base-200">
                <h3 className="font-semibold">Preview Template</h3>
                <p className="text-sm text-base-content/70">
                  Xem trước template với dữ liệu mẫu.
                </p>
              </div>
              
              {/* Preview Data Controls */}
              <div className="p-4 border-b bg-base-100">
                <h4 className="font-medium mb-2">Dữ liệu preview:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {template.variables.map((variable, index) => (
                    <div key={index} className="form-control">
                      <label className="label">
                        <span className="label-text text-sm">{variable.label}</span>
                      </label>
                      <input
                        type="text"
                        className="input input-sm input-bordered"
                        value={previewData[variable.name] || ''}
                        onChange={(e) => setPreviewData({
                          ...previewData,
                          [variable.name]: e.target.value
                        })}
                        placeholder={`Nhập ${variable.label.toLowerCase()}...`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={generatePreview}
                  className="btn btn-sm btn-primary mt-2"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Cập nhật Preview
                </button>
              </div>

              {/* Preview Container */}
              <div className="flex-1 p-4">
                <div
                  ref={previewRef}
                  className="w-full h-full border rounded bg-white overflow-auto"
                  style={{ minHeight: '400px' }}
                >
                  {/* Preview will be rendered here */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-base-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-base-content/70">
              {isDirty && (
                <span className="text-warning">Có thay đổi chưa được lưu</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="btn btn-ghost"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary"
                disabled={!isDirty}
              >
                <Save className="w-4 h-4 mr-1" />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
