import React from 'react';
import { Calendar, Users, Bell, BookOpen, Clock, Sparkles, ArrowRight, CheckCircle, School } from 'lucide-react';
import ClientSideActions from './ClientSideActions';

const OneInABillion = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-purple-800 flex items-center justify-center gap-2">
            One In A Billion
          </h1>
        </div>

        {/* 비디오 대신 새로운 콘텐츠 컨테이너 */}
        <ClientSideActions />

        {/* 하단 정보 */}
        <div className="text-center space-y-3 mt-2">
          <div className="mt-2">
            <p className="text-sm text-purple-700 font-medium">
              already 1000+ users
            </p>
            <p className="text-xs text-slate-500">
              get started now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneInABillion;