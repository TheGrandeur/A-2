
import React, { useState, useEffect } from 'react';
import { Question } from '@/pages/Index';
import AnswerOptions from './AnswerOptions';
import OpenEndedInput from './OpenEndedInput';
import SubmitButton from './SubmitButton';
import TimerBar from './TimerBar';

interface LiveQuestionProps {
  question: Question;
  onSubmit: (answer: string | string[]) => void;
}

const LiveQuestion: React.FC<LiveQuestionProps> = ({ question, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
  const [timeRemaining, setTimeRemaining] = useState(question.timeLimit || 30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    setSelectedAnswer('');
    setTimeRemaining(question.timeLimit || 30);
    setIsTimeUp(false);
  }, [question]);

  useEffect(() => {
    if (timeRemaining > 0 && !isTimeUp) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setIsTimeUp(true);
    }
  }, [timeRemaining, isTimeUp]);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onSubmit(selectedAnswer);
    }
  };

  const isAnswerSelected = () => {
    if (Array.isArray(selectedAnswer)) {
      return selectedAnswer.length > 0;
    }
    return selectedAnswer.trim().length > 0;
  };

  return (
    <div className="animate-fade-in">
      {/* Timer Bar */}
      {question.timeLimit && (
        <TimerBar 
          timeLimit={question.timeLimit} 
          timeRemaining={timeRemaining}
          isTimeUp={isTimeUp}
        />
      )}
      
      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">Q</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-900 leading-relaxed">
              {question.question}
            </h2>
            {question.timeLimit && (
              <div className="mt-3 flex items-center gap-2 text-sm text-indigo-600">
                <div className="w-4 h-4 rounded-full border-2 border-coral-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-coral-400 rounded-full"></div>
                </div>
                <span>
                  {isTimeUp ? 'Time\'s up!' : `${timeRemaining}s remaining`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 md:p-8 mb-6">
        {question.type === 'multiple-choice' && question.options ? (
          <AnswerOptions
            options={question.options}
            selectedOption={selectedAnswer as string}
            onOptionSelect={setSelectedAnswer}
            disabled={isTimeUp}
          />
        ) : (
          <OpenEndedInput
            value={selectedAnswer as string}
            onChange={setSelectedAnswer}
            disabled={isTimeUp}
            placeholder="Type your answer here..."
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <SubmitButton
          onClick={handleSubmit}
          disabled={!isAnswerSelected() || isTimeUp}
          isTimeUp={isTimeUp}
        />
      </div>
    </div>
  );
};

export default LiveQuestion;
