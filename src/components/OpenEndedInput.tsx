
import React from 'react';

interface OpenEndedInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const OpenEndedInput: React.FC<OpenEndedInputProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Type your answer here..."
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-indigo-900">
        Your answer:
      </h3>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          rows={6}
          className={`
            w-full p-4 border-2 rounded-xl text-base resize-none transition-all duration-200
            ${disabled 
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
              : 'border-indigo-200 bg-white focus:border-coral-400 focus:bg-coral-50'
            }
            focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2
            placeholder:text-indigo-400
          `}
        />
        
        {/* Character count */}
        <div className="absolute bottom-3 right-3 text-xs text-indigo-500">
          {value.length} characters
        </div>
      </div>
      
      {/* Helper text */}
      <p className="text-sm text-indigo-600">
        💡 Tip: Be clear and concise in your response
      </p>
    </div>
  );
};

export default OpenEndedInput;
