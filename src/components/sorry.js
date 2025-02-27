'use client'
import React from 'react';
import { Star, Sparkles, Heart } from 'lucide-react';

const Sorry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-sm mx-auto px-3 py-4 space-y-4">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-purple-800 flex items-center justify-center gap-2">
            <Star className="text-purple-600" size={24} />
            One in a Billion
          </h1>

          {/* 메인 메시지 배너 */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl shadow-sm">
            <div className="flex justify-center mb-3">
              <Heart className="text-purple-600" size={36} />
            </div>
            <h2 className="text-xl font-semibold text-purple-900 mb-2">
              Thank You for Your Interest!
            </h2>
            <p className="text-purple-700 text-sm leading-relaxed">
              We&apos;re incredibly grateful for your interest in One in a Billion. 
              Your support means everything to us as we prepare for our launch.
            </p>
          </div>

          {/* 기능 프리뷰 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
            <h3 className="text-base font-semibold text-purple-800 mb-3 flex items-center justify-center gap-2">
              <Sparkles className="text-purple-500" size={18} />
              Coming Next Month!
            </h3>
            <div className="space-y-2 text-left">
              <div className="p-2 bg-purple-50 rounded-lg">
                <p className="text-sm text-slate-700">🚀 Our app will be launching next month</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <p className="text-sm text-slate-700">✨ Exclusive features for early supporters</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <p className="text-sm text-slate-700">🌟 Be part of something extraordinary</p>
              </div>
            </div>
          </div>
        </div>

        {/* 인터뷰 및 인스타그램 섹션 */}
        <div className="text-center space-y-3">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
            <p className="text-purple-800 font-medium mb-2">
              Share Your Thoughts & Get a Gift
            </p>
            <p className="text-sm text-slate-600 mb-3">
              Contact us for an interview about your expectations and receive a special gift from our team!
            </p>
            <a 
              href="https://www.instagram.com/1inabillion.official?igsh=MWJpcGNyMnNmNDYzZw%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-500 to-purple-500 
                        text-white rounded-lg font-medium
                        hover:from-pink-600 hover:to-purple-600 
                        transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="18" cy="6" r="1.5"></circle>
              </svg>
              Contact Us on Instagram
            </a>
          </div>

          <div className="mt-4">
            <p className="text-sm text-purple-700 font-medium">
              Your continued interest means the world to us
            </p>
            <p className="text-xs text-slate-500 mt-1">
              We can&apos;t wait to show you what we&apos;ve been working on!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorry;
