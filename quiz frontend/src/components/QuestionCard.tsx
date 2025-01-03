import React from 'react';
import { Question } from '../data/questions';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmit?: () => void;
  canSubmit: boolean;
}

export default function QuestionCard({
  question,
  currentAnswer,
  onAnswerChange,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  onSubmit,
  canSubmit,
}: QuestionCardProps) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {question.choices?.map((choice, index) => (
              <label
                key={index}
                className="flex items-center p-4 rounded-lg border border-gray-200 
                hover:border-[#508C9B] hover:bg-gray-50 cursor-pointer transition-all duration-200"
              >
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  checked={currentAnswer === choice}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="w-4 h-4 text-[#508C9B] focus:ring-[#508C9B]"
                />
                <span className="ml-3 text-gray-700">{choice}</span>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="flex justify-center gap-4">
            {['True', 'False'].map((choice) => (
              <button
                key={choice}
                onClick={() => onAnswerChange(choice)}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200
                  ${currentAnswer === choice
                    ? 'bg-[#134B70] text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#508C9B] hover:bg-gray-50'
                  }`}
              >
                {choice}
              </button>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Type your answer..."
            className="input-field"
          />
        );

      case 'short-answer':
        return (
          <textarea
            value={currentAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Type your answer..."
            rows={4}
            className="input-field"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-[#201E43] mb-6">
          {question.question}
        </h2>
        <div className="mt-6">{renderQuestionInput()}</div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>

        {isLast ? (
          <div className="relative group">
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              className="btn-primary flex items-center gap-2"
            >
              Submit
              <Check className="w-5 h-5" />
            </button>
            
            {!canSubmit && (
              <div className="absolute bottom-full mb-2 right-0 whitespace-nowrap p-2 
                bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 
                transition-opacity duration-200 pointer-events-none">
                Answer all questions before submitting
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onNext}
            className="btn-primary flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}