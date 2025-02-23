'use client'
import React from 'react';
import { School, Clock, Sparkles, Heart } from 'lucide-react';

const Sorry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-purple-800 flex items-center justify-center gap-2">
            <School className="text-purple-600" size={32} />
            UnivBoard
          </h1>

          {/* 메인 메시지 배너 */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-xl shadow-sm">
            <div className="flex justify-center mb-4">
              <Clock className="text-purple-600" size={48} />
            </div>
            <h2 className="text-2xl font-semibold text-purple-900 mb-3">
              Coming Soon!
            </h2>
            <p className="text-purple-700 text-sm leading-relaxed">
              We&apos;re working hard to bring you the ultimate university experience.
              UnivBoard will be launching very soon!
            </p>
          </div>

          {/* 기능 프리뷰 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="text-purple-500" size={20} />
              What to Expect
            </h3>
            <div className="space-y-3 text-left">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-slate-700">🎯 AI-Powered Timetable Creation</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-slate-700">👥 Connect with Classmates</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-slate-700">📚 Course Reviews & Materials</p>
              </div>
            </div>
          </div>
        </div>

        {/* 알림 신청 섹션 */}
        <div className="text-center space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
            <p className="text-purple-800 font-medium mb-2">
              Want to be the first to know?
            </p>
            <p className="text-sm text-slate-600 mb-4">
              We&apos;ll notify you when UnivBoard launches at your university
            </p>
            <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 
                           text-white rounded-lg font-medium
                           hover:from-purple-600 hover:to-indigo-600 
                           transition-all flex items-center justify-center gap-2">
              <Heart size={18} />
              Stay Updated
            </button>
          </div>

          <div className="mt-6">
            <p className="text-sm text-purple-700 font-medium">
              Coming to top universities in India
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Thank you for your patience and support!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorry;
