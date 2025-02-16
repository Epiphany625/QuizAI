import React, { useState } from 'react';
import { Question } from '../../types';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface ResultsProps {
  questions: Question[];
  userAnswers: Record<string, string>;
  onRetry: () => void;
}

export default function Results({ questions, userAnswers, onRetry }: ResultsProps) {
  const [overriddenAnswers, setOverriddenAnswers] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(() => 
    questions.reduce((acc, q) => {
      const answerIndex = q.choices.findIndex((a: string) => a === userAnswers[q.id]);
      return acc + (String.fromCharCode(65 + answerIndex).toLowerCase() === q.correctAnswer?.toLowerCase() ? 1 : 0);
    }, 0)
  );

  const percentage = Math.round((score / questions.length) * 100);

  const handleOverride = (questionId: string) => {
    setOverriddenAnswers(prev => {
      const newSet = new Set(prev);
      newSet.add(questionId);
      return newSet;
    });
    setScore(prev => prev + 1);
  };

  const handleUndoOverride = (questionId: string) => {
    setOverriddenAnswers(prev => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
    setScore(prev => prev - 1);
  };

  const canBeOverridden = (type: string) => {
    return type === 'fill-blank' || type === 'short-answer';
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#201E43] mb-4">
          Quiz Results
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-[#201E43]">
            Your Score: {score} / {questions.length}
          </h2>
          <p className="text-xl text-[#508C9B]">
            {percentage}%
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question) => {
          const isOverridden = overriddenAnswers.has(question.id);
          const isCorrect = isOverridden || 
            (String.fromCharCode(65 + question.choices.findIndex((a: string) => a === userAnswers[question.id])).toLowerCase() 
            === question.correctAnswer?.toLowerCase() ? 1 : 0);

          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg bg-gray-50 border relative ${
                isCorrect ? 'border-green-200' : 'border-red-200'
              }`}
            >
              {canBeOverridden(question.type) && (
                isOverridden ? (
                  <button
                    onClick={() => handleUndoOverride(question.id)}
                    className="absolute top-4 right-4 text-sm text-red-500 hover:text-red-700
                      transition-colors duration-200 underline mt-1"
                  >
                    Undo override
                  </button>
                ) : !isCorrect && (
                  <button
                    onClick={() => handleOverride(question.id)}
                    className="absolute top-4 right-4 text-sm text-[#508C9B] hover:text-[#134B70]
                      transition-colors duration-200 underline mt-1"
                  >
                    Override: I was correct
                  </button>
                )
              )}
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                )}
                <div className="flex-grow pr-32">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {question.question}
                  </h3>
                  <div className="space-y-1.5">
                    <p className="text-gray-600">
                      Your answer: {userAnswers[question.id] || 'No answer'}
                      {isOverridden && (
                        <span className="ml-2 text-sm text-[#508C9B]">(Marked as correct)</span>
                      )}
                    </p>
                    <p className="text-gray-900 font-medium">
                      Correct answer: {question.correctAnswer} 
                      {question.type === 'mcq' && (
                      <span className="mcq-correct-answer">
                      &nbsp;({question.choices[question.correctAnswer.charCodeAt(0) - 65]})
                      </span>
                      )}
                    </p>
                    {question.explanation && (
                      <p className="mt-2 text-sm text-[#508C9B]">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}