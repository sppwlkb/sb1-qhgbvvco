import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function PresentationView() {
  const { announcements, loading } = useAnnouncements();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-advance slides every 30 seconds
    const timer = setInterval(() => {
      if (announcements.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [announcements.length]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!announcements.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-2xl text-gray-400">目前沒有公告</p>
      </div>
    );
  }

  const currentAnnouncement = announcements[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      (prev + 1) % announcements.length
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl w-full">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="text-white/60">
            {currentIndex + 1} / {announcements.length}
          </div>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-white">
                {currentAnnouncement.title}
              </h1>
              <span className={`px-4 py-2 rounded-full text-lg ${
                currentAnnouncement.priority === 'high' 
                  ? 'bg-red-500/20 text-red-300' 
                  : currentAnnouncement.priority === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-green-500/20 text-green-300'
              }`}>
                {currentAnnouncement.priority === 'high' ? '重要'
                  : currentAnnouncement.priority === 'medium' ? '一般'
                  : '通知'}
              </span>
            </div>

            <p className="text-2xl leading-relaxed text-gray-300 whitespace-pre-wrap">
              {currentAnnouncement.content}
            </p>

            <div className="flex items-center justify-between text-gray-400 pt-8">
              <div className="text-lg">
                發布者：{currentAnnouncement.author.name}
              </div>
              <div className="text-lg">
                {currentAnnouncement.date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}