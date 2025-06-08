
import React, { useState, useEffect } from 'react';
import LiveQuestion from '@/components/LiveQuestion';
import StatusFeedback from '@/components/StatusFeedback';

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'open-ended';
  options?: string[];
  timeLimit?: number;
}

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);

  // Demo questions for demonstration
  const demoQuestions: Question[] = [
    {
      id: '1',
      question: 'What is the capital of France?',
      type: 'multiple-choice',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      timeLimit: 30
    },
    {
      id: '2',
      question: 'Explain the concept of photosynthesis in your own words.',
      type: 'open-ended',
      timeLimit: 60
    },
    {
      id: '3',
      question: 'Which programming language is primarily used for web development?',
      type: 'multiple-choice',
      options: ['Python', 'JavaScript', 'C++', 'Java'],
      timeLimit: 20
    }
  ];

  // Simulate receiving questions
  useEffect(() => {
    let questionIndex = 0;
    
    const showNextQuestion = () => {
      if (questionIndex < demoQuestions.length) {
        setCurrentQuestion(demoQuestions[questionIndex]);
        setIsSubmitted(false);
        setIsWaiting(false);
        questionIndex++;
        
        // Auto-advance to next question after some time
        setTimeout(() => {
          setIsSubmitted(false);
          setIsWaiting(true);
          setCurrentQuestion(null);
          
          setTimeout(showNextQuestion, 3000); // Wait 3 seconds before next question
        }, (demoQuestions[questionIndex - 1]?.timeLimit || 30) * 1000 + 5000);
      } else {
        // Reset to beginning for demo
        questionIndex = 0;
        setTimeout(showNextQuestion, 5000);
      }
    };

    const timer = setTimeout(showNextQuestion, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (answer: string | string[]) => {
    console.log('Answer submitted:', answer);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-coral-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">
            Live Classroom
          </h1>
          <p className="text-indigo-600 text-lg">
            Answer questions in real-time
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {isWaiting && !currentQuestion && (
            <StatusFeedback 
              type="waiting" 
              message="Waiting for the next question..."
            />
          )}
          
          {currentQuestion && !isSubmitted && (
            <LiveQuestion 
              question={currentQuestion}
              onSubmit={handleSubmit}
            />
          )}
          
          {isSubmitted && currentQuestion && (
            <StatusFeedback 
              type="submitted" 
              message="Answer submitted successfully! Waiting for next question..."
            />
          )}
        </div>

        {/* Demo Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm">
            🎯 Demo Mode - Questions will cycle automatically
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
