'use client'
import React, { useState } from 'react';
import { Calendar, Users, Bell, BookOpen, Clock, Sparkles, ArrowRight, CheckCircle, School } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '../config/firebase';

const OneInABillion = () => {
  const router = useRouter();
  const [storeClicked, setStoreClicked] = useState('');

  const handleStoreClick = React.useCallback(async (store) => {
    try {
      if (!db) {
        console.error('Firebase DB가 초기화되지 않았습니다.');
        router.push('/sorry');
        return;
      }

      setStoreClicked(store);
      
      // 즉시 리다이렉션 시작
      router.push('/sorry');
      
      // 백그라운드에서 Firebase에 데이터 저장 (결과를 기다리지 않음)
      addDoc(collection(db, "store_clicks"), {
        storeType: store,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
        userAgent: window.navigator.userAgent,
      }).catch(error => {
        console.error(`${store} 스토어 클릭 기록 중 오류:`, error);
      });
      
    } catch (error) {
      console.error(`${store} 스토어 클릭 기록 중 오류:`, error);
      router.push('/sorry');
    }
  }, [router]);

  const videoElement = React.useMemo(() => (
    <div className="relative w-full max-w-[300px] h-[500px] mx-auto rounded-xl overflow-hidden shadow-md my-4">
      <video 
        className="absolute w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
        loading="lazy"
      >
        <source src="/background_video.webm" type="video/webm" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent flex items-end justify-center pb-6">
        <h3 className="text-white text-xl font-bold text-shadow">find your &quot;the one&quot;</h3>
      </div>
    </div>
  ), []);

  const storeButtons = React.useMemo(() => (
    <div className="flex flex-wrap justify-center gap-3">
      <button 
        onClick={() => handleStoreClick('ios')}
        className="h-10 sm:h-12 transition-transform hover:scale-105"
      >
        <img 
          src="/app-store-badge.png" 
          alt="Download on App Store" 
          className="h-full"
          loading="lazy"
          width="120"
          height="40"
        />
      </button>
      <button 
        onClick={() => handleStoreClick('android')}
        className="h-10 sm:h-12 transition-transform hover:scale-105"
      >
        <img 
          src="/google-play-badge.png" 
          alt="Get it on Google Play" 
          className="h-full"
          loading="lazy"
          width="135"
          height="40"
        />
      </button>
    </div>
  ), [handleStoreClick]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-purple-800 flex items-center justify-center gap-2">
            One In A Billion
          </h1>
        </div>

        {/* 메모이제이션된 비디오 컴포넌트 */}
        {videoElement}

        {/* 하단 정보 */}
        <div className="text-center space-y-3 mt-2">
          {/* 메모이제이션된 앱 스토어 버튼 */}
          {storeButtons}
          
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

export default React.memo(OneInABillion);