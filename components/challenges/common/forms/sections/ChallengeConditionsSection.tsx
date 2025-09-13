'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ChallengeConditionsSection() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold mb-4">Điều kiện thử thách</h2>
        
        <div className="text-center py-8 text-base-content/60">
          <p>Không có điều kiện đặc biệt nào</p>
        </div>
      </div>
    </div>
  );
}
