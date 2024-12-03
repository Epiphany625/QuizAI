import React from 'react';
import { Question } from './Question.ts';
// import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { MdArrowForward, MdArrowBack, MdCheck } from 'react-icons/md'; // Material Design icons

import './QuestionCard.css'

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
          <div className="question-mcq">
            {question.choices?.map((choice, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  checked={currentAnswer === choice}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="question-input"
                />
                <span className="question-choice">{choice}</span>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="question-tf">
            {['True', 'False'].map((choice) => (
              <button
                key={choice}
                onClick={() => onAnswerChange(choice)}
                className={"question-input"}
              >
                {choice}
              </button>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <div className="question-fin">
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Type your answer..."
              className="question-input"
            />
          </div>
        );

      case 'short-answer':
        return (
          <div className="question-sa">
            <textarea
              value={currentAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Type your answer..."
              rows={4}
              className="question-input"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="question-container">
        <h2 className="question">
          {question.question}
        </h2>
        <div className="question-input-container">{renderQuestionInput()}</div>

      <div className="question-buttons-container">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="previous-button"
        >
          <MdArrowBack className="next-arrow" />
          Previous
        </button>

        {isLast ? (
          <div className="end-buttons-container">
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              className="submit-button"
            >
              Submit
              <MdCheck className="checkmark" />
            </button>
            
            {!canSubmit && (
              <div className="submit-hover-text-container">
                Answer all questions before submitting
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onNext}
            className="next-button"
          >
            Next
            <MdArrowForward className="previous-arrow" />
          </button>
        )}
      </div>
    </div>
  );
}