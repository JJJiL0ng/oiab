'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const ClientSideActions = () => {
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
      
      // 스토어 타입에 따라 다른 URL로 리다이렉션
      const storeUrl = store === 'android' 
        ? 'https://play.google.com/store/apps/details?id=com.hwsoft.oiab'
        : '/sorry'; // iOS는 아직 /sorry로 리다이렉션
      
      // 리다이렉션 시작
      router.push(storeUrl);
      
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

  return (
    <div className="relative w-full max-w-[300px] h-[400px] mx-auto rounded-xl overflow-hidden shadow-md my-4 bg-purple-100 p-4 flex flex-col">
      <div className="text-center mb-3">
        <h3 className="text-purple-800 text-xl font-bold">💖 One in a Billion 💖</h3>
        <p className="text-purple-700 text-sm mt-1">Find your true connection through AI conversations</p>
      </div>
      
      <div className="flex-grow text-sm space-y-3 px-1">
        <div className="bg-white/70 p-2 rounded-lg text-center">
          <p className="font-semibold text-purple-900">🌟 Now Available!</p>
          <p className="text-xs text-gray-700">First 10,000 users get unlimited VIP access</p>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-purple-800 font-medium mb-2">Download now:</p>
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => handleStoreClick('ios')}
              className="h-12 transition-transform hover:scale-105"
            >
              <img 
                src="/app-store-badge.png" 
                alt="Download on App Store" 
                className="h-full"
                loading="lazy"
                width="300"
                height="90"
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
                loading="lazy"
                width="300"
                height="90"
              />
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-900/60 to-transparent flex items-end justify-center pb-4">
        <h3 className="text-white text-lg font-bold text-shadow">Find your &quot;One in a Billion&quot;</h3>
      </div>
    </div>
  );
};

export default ClientSideActions;