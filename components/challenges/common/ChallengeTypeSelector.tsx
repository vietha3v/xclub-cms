'use client';

import React from 'react';
import { ChallengeCategory } from '@/types/challenge';

interface ChallengeTypeSelectorProps {
  onSelect: (category: ChallengeCategory) => void;
}

export default function ChallengeTypeSelector({ onSelect }: ChallengeTypeSelectorProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full max-w-6xl">
        {/* Thử thách cá nhân */}
        <div 
          className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-80 sm:h-96"
          onClick={() => onSelect(ChallengeCategory.INDIVIDUAL)}
        >
          <div className="card-body text-center p-6 flex flex-col justify-center">
            <div className="flex justify-center items-center gap-1 sm:gap-2 mb-3">
              <span className="text-2xl sm:text-3xl">🏃‍♂️</span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Thử thách cá nhân</h3>
              <span className="text-2xl sm:text-3xl">🏆</span>
            </div>
            <div className="h-12 sm:h-16 mb-4">
              <textarea 
                className="w-full h-full text-sm sm:text-base text-base-content/70 leading-tight text-justify resize-none border-none bg-transparent p-0 focus:outline-none"
                value="Bạn có thể dừng hoặc tiếp tục, nhưng dám thử thách cũng là bạn đã dám bắt đầu!"
                readOnly
                rows={3}
              />
            </div>
            <div className="text-sm text-base-content/60 mb-4">
              <p className="font-medium mb-2">🔥 Thử thách hot:</p>
              <ul className="text-left space-y-1">
                <li className="hidden sm:block">• "100km tháng này - Let's go!"</li>
                <li>• "30 ngày streak - Không bỏ cuộc!"</li>
                <li className="hidden sm:block">• "5km mỗi sáng - Thức dậy sớm!"</li>
                <li>• "Sub 5 phút/km - Tốc độ thần thánh!"</li>
              </ul>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-primary">
              <span className="text-xl sm:text-2xl">🥇</span>
              <span className="text-xl sm:text-2xl">💪</span>
              <span className="text-xl sm:text-2xl">⚡</span>
            </div>
          </div>
        </div>

        {/* Thử thách đồng đội */}
        <div 
          className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-80 sm:h-96"
          onClick={() => onSelect(ChallengeCategory.TEAM)}
        >
          <div className="card-body text-center p-6 flex flex-col justify-center">
            <div className="flex justify-center items-center gap-1 sm:gap-2 mb-3">
              <span className="text-2xl sm:text-3xl">👥</span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Thử thách tập thể</h3>
              <span className="text-2xl sm:text-3xl">🏅</span>
            </div>
            <div className="h-12 sm:h-16 mb-4">
              <textarea 
                className="w-full h-full text-sm sm:text-base text-base-content/70 leading-tight text-justify resize-none border-none bg-transparent p-0 focus:outline-none"
                value="Không chỉ là về đích, mà còn là hành trình cùng đồng đội – chạy để gắn kết, chạy để bứt phá."
                readOnly
                rows={3}
              />
            </div>
            <div className="text-sm text-base-content/60 mb-4">
              <p className="font-medium mb-2">⚡ Thử thách team:</p>
              <ul className="text-left space-y-1">
                <li className="hidden sm:block">• "1000km CLB - Cùng nhau chinh phục!"</li>
                <li>• "Đội 5 người 42km - Teamwork!"</li>
                <li className="hidden sm:block">• "50 buổi tập/tuần - Không ai bỏ lại ai!"</li>
                <li>• "CLB vs CLB - Ai mạnh hơn?"</li>
              </ul>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-primary">
              <span className="text-xl sm:text-2xl">🏆</span>
              <span className="text-xl sm:text-2xl">🤝</span>
              <span className="text-xl sm:text-2xl">🔥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
