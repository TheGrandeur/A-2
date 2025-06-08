
import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isTimeUp?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  disabled = false,
  isTimeUp = false
}) => {
  const getButtonText = () => {
    if (isTimeUp) return "Time's Up";
    if (disabled) return "Select an Answer";
    return "Submit Answer";
  };

  const getButtonIcon = () => {
    if (isTimeUp) return "⏰";
    if (disabled) return "📝";
    return "🚀";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 
        flex items-center gap-3 min-w-[200px] justify-center
        ${disabled
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : 'bg-coral-500 text-white hover:bg-coral-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }
        focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2
      `}
    >
      <span className="text-xl">{getButtonIcon()}</span>
      {getButtonText()}
    </button>
  );
};

export default SubmitButton;
