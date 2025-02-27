'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Bell, BookOpen, Clock, Sparkles, ArrowRight, CheckCircle, School } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '../config/firebase';

const OneInABillion = () => {
  const router = useRouter();
  const [storeClicked, setStoreClicked] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  
  // 비디오 로딩 상태 추적
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // 사전 로드된 작은 포스터 이미지 사용
      const posterImg = new Image();
      posterImg.src = '/video_poster.jpg'; // 비디오의 첫 프레임을 저장한 작은 이미지
      
      const handleCanPlay = () => {
        setVideoLoaded(true);
      };
      
      videoElement.addEventListener('canplay', handleCanPlay);
      
      // 브라우저가 사전 로드 힌트를 인식하도록 설정
      const linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.as = 'video';
      linkElement.href = '/background_video_optimized.mp4'; // 최적화된 비디오 파일
      document.head.appendChild(linkElement);
      
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        if (document.head.contains(linkElement)) {
          document.head.removeChild(linkElement);
        }
      };
    }
  }, []);

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
      {!videoLoaded && (
        <div className="absolute inset-0 bg-purple-100 flex items-center justify-center">
          <img 
            src="/video_poster.jpg" 
            alt="Video thumbnail" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <video 
        ref={videoRef}
        className={`absolute w-full h-full object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="metadata"
        poster="/video_poster.png"
      >
        {/* WebM 포맷이 더 효율적이므로 먼저 제공 */}
        <source src="/background_video_optimized.webm" type="video/webm" />
        <source src="/background_video_optimized.mp4" type="video/mp4" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent flex items-end justify-center pb-6">
        <h3 className="text-white text-xl font-bold text-shadow">find your &quot;the one&quot;</h3>
      </div>
    </div>
  ), [videoLoaded]);

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