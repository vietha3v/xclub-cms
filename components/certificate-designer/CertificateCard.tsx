'use client';

import { Edit, Trash2, Eye } from 'lucide-react';
import { CertificateTemplate } from '@/types/template';
import CertificatePreview from './CertificatePreview';
import dlv from 'dlv';

interface CertificateCardProps {
  template: CertificateTemplate;
  onEdit: (template: CertificateTemplate) => void;
  onDelete: (id: string) => void;
  onPreview: (template: CertificateTemplate) => void;
}

export default function CertificateCard({ 
  template, 
  onEdit, 
  onDelete, 
  onPreview 
}: CertificateCardProps) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Preview Section - 16:9 ratio */}
      <div 
        className="bg-base-200 p-4 flex items-center justify-center" 
        style={{ 
          minHeight: '180px',
          aspectRatio: '16/9'
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <CertificatePreview 
            template={template} 
            className="max-w-full max-h-full"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      
      <div className="card-body">
        <div className="flex justify-between items-start mb-3">
          <h3 className="card-title text-lg">{dlv(template, 'name', '')}</h3>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              ⋯
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <button onClick={() => onEdit(template)}>
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa
                </button>
              </li>
              <li>
                <button onClick={() => onPreview(template)}>
                  <Eye className="w-4 h-4" />
                  Xem trước
                </button>
              </li>
              <li>
                <button onClick={() => onDelete(dlv(template, 'id', ''))}>
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {dlv(template, 'description', '') && (
          <p className="text-sm text-base-content/70 mb-3">
            {dlv(template, 'description', '')}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-primary badge-sm">
            {dlv(template, 'type', '')}
          </span>
          {dlv(template, 'isActive', false) && (
            <span className="badge badge-success badge-sm">
              Hoạt động
            </span>
          )}
        </div>

        <div className="card-actions justify-end">
          <button
            onClick={() => onPreview(template)}
            className="btn btn-outline btn-sm"
          >
            <Eye className="w-4 h-4 mr-1" />
            Xem trước
          </button>
          <button
            onClick={() => onEdit(template)}
            className="btn btn-primary btn-sm"
          >
            <Edit className="w-4 h-4 mr-1" />
            Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );
}
