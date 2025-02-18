'use client';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// 환경 변수 확인을 위한 디버깅
console.log('Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});

// Firebase 초기화를 한 번만 수행
let app;
let db;

if (typeof window !== 'undefined') {  // 클라이언트 사이드에서만 실행
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase 초기화 성공');
  } catch (error) {
    console.error('Firebase 초기화 오류:', error);
  }
}

export { db };
