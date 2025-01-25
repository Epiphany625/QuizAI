import React, { useState } from 'react';
import { Question } from './Question.ts';
// import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { MdCheckCircle, MdCancel, MdRefresh } from 'react-icons/md'; // Material Design icons
import './Results.css'


interface ResultsProps {
  questions: Question[];
  userAnswers: Record<string, string>;
  onRetry: () => void;
}

export default function Results({ questions, userAnswers, onRetry }: ResultsProps) {
  const [overriddenAnswers, setOverriddenAnswers] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(() => 
    questions.reduce((acc, q) => 
      acc + (userAnswers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase() ? 1 : 0), 
    0)
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
    <div className='quiz-results-container'>
      <div className="quiz-results-header-container">
        <h1 className="quiz-results-title">
          Quiz Results
        </h1>
        <div className="quiz-score-container">
          <h2 className="quiz-score">
            Your Score: {score} / {questions.length}
          </h2>
          <p className="quiz-percentage">
            {percentage}%
          </p>
        </div>
      </div>

      <div className="quiz-results-questions-container">
        {questions.map((question) => {
          const isOverridden = overriddenAnswers.has(question.id);
          const isCorrect = isOverridden || 
          (String.fromCharCode(65 + question.choices.findIndex((a: string) => a === userAnswers[question.id])).toLowerCase() 
          === question.correctAnswer?.toLowerCase() ? 1 : 0);

            /**
             * const isCorrect = isOverridden || 
            (String.fromCharCode(65 + question.choices.findIndex((a: string) => a === userAnswers[question.id])).toLowerCase() 
            === question.correctAnswer?.toLowerCase() ? 1 : 0);
             */


          return (
            <div
              key={question.id}
              className="quiz-results-question-card"
            >
              {canBeOverridden(question.type) && (
                isOverridden ? (
                  <button
                    onClick={() => handleUndoOverride(question.id)}
                    className="undo-override-button"
                  >
                    Undo override
                  </button>
                ) : !isCorrect && (
                  <button
                    onClick={() => handleOverride(question.id)}
                    className="override-button"
                  >
                    Override: I was correct
                  </button>
                )
              )}
                {isCorrect ? (
                  <MdCheckCircle className="correct-icon" />
                ) : (
                  <MdCancel className="wrong-icon" />
                )}
                  <h3 className="results-question">
                    {question.question}
                  </h3>
                  <div>
                    <p className="your-answer-container">
                      Your answer: {userAnswers[question.id] || 'No answer'}
                      {isOverridden && (
                        <span className="mark-as-correct">(Marked as correct)</span>
                      )}
                    </p>
                    <p className="correct-answer">
                      Correct answer: {question.correctAnswer}
                    </p>
                    {question.explanation && (
                      <p className="answer-explanation">
                        {question.explanation}
                      </p>
                    )}
                  </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}