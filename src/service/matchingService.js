// services/matchingService.js
'use client'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const saveUserData = async (username, platform) => {
  try {
    return await addDoc(collection(db, "social_media_users"), {
      username,
      platform,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });
  } catch (error) {
    console.error("Firebase write error:", error);
    throw new Error("Failed to save data");
  }
};

export const simulateAnalysis = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        steps: [
          'Quick questionnaire sent to your DM',
          'AI analyzes your social patterns',
          'Connect with your ideal match'
        ]
      });
    }, 3000);
  });
};