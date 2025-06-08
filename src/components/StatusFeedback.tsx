
import React from 'react';

interface StatusFeedbackProps {
  type: 'waiting' | 'submitted' | 'error';
  message: string;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({ type, message }) => {
  const getStatusConfig = () => {
    switch (type) {
      case 'waiting':
        return {
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-200',
          textColor: 'text-indigo-700',
          icon: '⏳',
          pulse: true
        };
      case 'submitted':
        return {
          bgColor: 'bg-coral-50',
          borderColor: 'border-coral-200',
          textColor: 'text-coral-700',
          icon: '✅',
          pulse: false
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-700',
          icon: '❌',
          pulse: false
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-700',
          icon: 'ℹ️',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className={`
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border-2 rounded-2xl p-8 text-center max-w-md w-full mx-4
        ${config.pulse ? 'animate-pulse' : 'animate-scale-in'}
      `}>
        <div className="text-6xl mb-4">
          {config.icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {type === 'waiting' && 'Please Wait'}
          {type === 'submitted' && 'Success!'}
          {type === 'error' && 'Error'}
        </h3>
        <p className="text-lg leading-relaxed">
          {message}
        </p>
        
        {type === 'waiting' && (
          <div className="mt-6 flex justify-center">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusFeedback;
