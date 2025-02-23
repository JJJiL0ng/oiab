'use client'
import React, { useState } from 'react';
import { Calendar, Users, Bell, BookOpen, Clock, Sparkles, ArrowRight, CheckCircle, School } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '../config/firebase'; // 수정된 import 경로

const UnivBoard = () => {
  const router = useRouter();
  const [storeClicked, setStoreClicked] = useState('');

  const handleStoreClick = async (store) => {
    try {
      if (!db) {
        console.error('Firebase DB가 초기화되지 않았습니다.');
        router.push('/sorry');
        return;
      }

      setStoreClicked(store); // 즉시 UI 업데이트

      // Firebase에 데이터 저장하고 바로 페이지 이동
      await addDoc(collection(db, "store_clicks"), {
        storeType: store,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
        userAgent: window.navigator.userAgent,
      });
      
      // 지연 시간을 500ms로 줄임
      setTimeout(() => {
        router.push('/sorry');
      }, 500);
      
    } catch (error) {
      console.error(`${store} 스토어 클릭 기록 중 오류:`, error);
      router.push('/sorry');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-purple-800 flex items-center justify-center gap-2">
            <School className="text-purple-600" size={32} />
            UnivBoard
          </h1>
          
          {/* 시간표 마법사 배너 */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-purple-900 mb-2">
              Create Your Perfect Timetable
            </h2>
            <p className="text-purple-700 text-sm">
              Smart AI-powered timetable wizard helps you build the best schedule
            </p>
          </div>

          {/* 주요 기능 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-purple-50 p-3 rounded-lg">
                <Calendar size={18} className="text-purple-500" />
                <span>AI Timetable Optimization</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-purple-50 p-3 rounded-lg">
                <Users size={18} className="text-purple-500" />
                <span>Connect with Your Classmates</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-purple-50 p-3 rounded-lg">
                <Bell size={18} className="text-purple-500" />
                <span>Real-time Campus Updates</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-purple-50 p-3 rounded-lg">
                <BookOpen size={18} className="text-purple-500" />
                <span>Course Reviews & Materials</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-purple-50 p-3 rounded-lg">
                <Clock size={18} className="text-purple-500" />
                <span>Exam Schedule Tracker</span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="text-center space-y-4">
          {/* 다운로드 문구 */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-purple-800">
              Download UnivBoard Now
            </h3>
            <p className="text-sm text-slate-600">
              Get started with your smart university life
            </p>
          </div>

          {/* 앱 설치 버튼 */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => handleStoreClick('ios')}
              className="h-12 transition-transform hover:scale-105"
            >
              <img 
                src="/app-store-badge.png" 
                alt="Download on App Store" 
                className="h-full"
              />
            </button>
            <button 
              onClick={() => handleStoreClick('android')}
              className="h-12 transition-transform hover:scale-105"
            >
              <img 
                src="/google-play-badge.png" 
                alt="Get it on Google Play" 
                className="h-full"
              />
            </button>
          </div>
          
          {storeClicked && (
            <p className="text-sm text-green-600 animate-fade-in">
              <CheckCircle className="inline-block mr-1" size={16} />
              Thanks for your interest! Downloading will start shortly.
            </p>
          )}

          <div className="mt-4">
            <p className="text-sm text-purple-700 font-medium">
              Join 10,000+ students from top universities in India
            </p>
            <p className="text-xs text-slate-500">
              Currently available in selected universities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnivBoard;