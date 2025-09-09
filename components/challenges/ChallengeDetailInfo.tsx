'use client';

import { Challenge } from '@/types/challenge';
import { Calendar, Users, Trophy, Clock } from 'lucide-react';

interface ChallengeDetailInfoProps {
  challenge: Challenge;
}

export default function ChallengeDetailInfo({ challenge }: ChallengeDetailInfoProps) {
  return (
    <div className="space-y-6">
      {/* Challenge Info */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Thông tin thử thách</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <div className="text-sm text-base-content/60">Ngày bắt đầu</div>
                <div className="font-medium">
                  {new Date(challenge.startDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <div className="text-sm text-base-content/60">Ngày kết thúc</div>
                <div className="font-medium">
                  {new Date(challenge.endDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <div className="text-sm text-base-content/60">Người tham gia</div>
                <div className="font-medium">{challenge.participantCount || 0}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-primary" />
              <div>
                <div className="text-sm text-base-content/60">Độ khó</div>
                <div className="font-medium">{challenge.difficulty}</div>
              </div>
            </div>
          </div>

          {challenge.tags && challenge.tags.length > 0 && (
            <div className="mt-4">
              <div className="text-sm text-base-content/60 mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map((tag, index) => (
                  <div key={index} className="badge badge-outline">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Challenge Rules */}
      {challenge.rules && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Quy tắc thử thách</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{challenge.rules}</p>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Rewards */}
      {challenge.rewards && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Phần thưởng</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{challenge.rewards}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
