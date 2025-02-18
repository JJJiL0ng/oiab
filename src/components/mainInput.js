'use client'
import React, { useState } from 'react';
import { Loader2, MessageSquare, Sparkles, Send, ArrowRight, CheckCircle, Instagram, Camera } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const SocialMediaMatching = () => {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const simulateAnalysis = async () => {
    if (!username || !platform) return;
    
    setIsAnalyzing(true);
    setMatchResult(null);

    try {
      // Firestore에 데이터 저장
      const docRef = await addDoc(collection(db, "social_media_users"), {
        username: username,
        platform: platform,
        timestamp: new Date().toISOString(),
      });

      console.log("Document written with ID: ", docRef.id);

      await new Promise(resolve => setTimeout(resolve, 3000));

      const fakeResult = {
        steps: [
          'Quick questionnaire sent to your DM',
          'AI analyzes your social patterns',
          'Connect with your ideal match'
        ]
      };

      setMatchResult(fakeResult);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("데이터 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <Sparkles className="text-blue-500" size={24} />
            Smart Match
          </h1>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg">
                <MessageSquare size={18} className="text-blue-500" />
                <span>No App Required - Everything in Your DMs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg">
                <Sparkles size={18} className="text-blue-500" />
                <span>Advanced AI Matching Algorithm </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg">
                <CheckCircle size={18} className="text-blue-500" />
                <span>5-Minute Quick Chat Assessment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg">
                <Camera size={18} className="text-blue-500" />
                <span>Profile Verification for Safe Matching</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg">
                <Send size={18} className="text-blue-500" />
                <span>Instant Match Connection via DM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Select your platform</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPlatform('instagram')}
              className={`p-3 rounded-lg border ${
                platform === 'instagram'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              } transition-all flex items-center justify-center gap-2`}
            >
              <Instagram size={20} />
              <span className="font-medium">Instagram</span>
              {platform === 'instagram' && (
                <CheckCircle size={16} className="text-blue-500" />
              )}
            </button>
            
            <button
              onClick={() => setPlatform('tiktok')}
              className={`p-3 rounded-lg border ${
                platform === 'tiktok'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              } transition-all flex items-center justify-center gap-2`}
            >
              <Camera size={20} />
              <span className="font-medium">TikTok</span>
              {platform === 'tiktok' && (
                <CheckCircle size={16} className="text-blue-500" />
              )}
            </button>
          </div>
          {!platform && (
            <p className="text-sm text-slate-500 text-center">
              Please select a platform to continue
            </p>
          )}
        </div>

        {/* Username Input */}
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3.5 rounded-lg border border-slate-200 bg-white text-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Send className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          </div>

          <button
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg
                     flex items-center justify-center gap-2 shadow-sm
                     hover:from-blue-600 hover:to-indigo-600 
                     active:transform active:scale-[0.98] transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-indigo-500"
            onClick={simulateAnalysis}
            disabled={!username || !platform || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span className="font-medium">Processing...</span>
              </>
            ) : (
              <>
                <span className="font-medium">Start Matching</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {matchResult && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg">
              <div className="text-slate-700 text-sm flex items-center gap-2">
                <CheckCircle size={18} className="text-blue-500" />
                Check your DM for the questionnaire
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-lg font-medium text-slate-800">Next Steps</h2>
              <div className="space-y-3">
                {matchResult.steps.map((step, index) => (
                  <div key={index} 
                       className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 
                                text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm text-slate-700">{step}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-sm text-slate-600 text-center">
                  Your perfect match is just a few steps away
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaMatching;