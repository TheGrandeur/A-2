
import React, { useEffect, useState } from 'react';

interface TimerBarProps {
  timeLimit: number;
  timeRemaining: number;
  isTimeUp: boolean;
}

const TimerBar: React.FC<TimerBarProps> = ({
  timeLimit,
  timeRemaining,
  isTimeUp
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const newProgress = (timeRemaining / timeLimit) * 100;
    setProgress(newProgress);
  }, [timeRemaining, timeLimit]);

  const getColorClass = () => {
    if (isTimeUp) return 'bg-red-500';
    if (progress <= 25) return 'bg-red-500';
    if (progress <= 50) return 'bg-yellow-500';
    return 'bg-coral-500';
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-indigo-700">
          Time Remaining
        </span>
        <span className={`text-sm font-bold ${
          isTimeUp || progress <= 25 ? 'text-red-600' : 'text-indigo-700'
        }`}>
          {isTimeUp ? "Time's up!" : `${timeRemaining}s`}
        </span>
      </div>
      
      <div className="w-full bg-indigo-100 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${getColorClass()}`}
          style={{ width: `${Math.max(0, progress)}%` }}
        />
      </div>
    </div>
  );
};

export default TimerBar;
