
import React from 'react';

interface AnswerOptionsProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  disabled?: boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  disabled = false
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-indigo-900 mb-4">
        Select your answer:
      </h3>
      
      {options.map((option, index) => {
        const letters = ['A', 'B', 'C', 'D'];
        const isSelected = selectedOption === option;
        
        return (
          <button
            key={index}
            onClick={() => !disabled && onOptionSelect(option)}
            disabled={disabled}
            className={`
              w-full p-4 rounded-xl border-2 text-left transition-all duration-200
              ${isSelected 
                ? 'border-coral-400 bg-coral-50 shadow-md scale-[1.02]' 
                : 'border-indigo-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
              }
              ${disabled 
                ? 'opacity-60 cursor-not-allowed' 
                : 'cursor-pointer hover:shadow-md'
              }
              focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm
                ${isSelected 
                  ? 'border-coral-400 bg-coral-400 text-white' 
                  : 'border-indigo-300 text-indigo-600'
                }
              `}>
                {letters[index]}
              </div>
              <span className={`
                text-base font-medium
                ${isSelected ? 'text-coral-700' : 'text-indigo-900'}
              `}>
                {option}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
