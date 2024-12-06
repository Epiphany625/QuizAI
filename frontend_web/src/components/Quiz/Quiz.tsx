import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import Results from './Results';
// import { Brain } from 'lucide-react';
// import { Brain } from 'lucide-react';
import { Question } from './Question';
import useTokenValidation from '../../hooks/useTokenValidation';
import './Quiz.css';

interface QuizProps {
  questions: Question[];
  onComplete?: (results: Record<string, string>) => void;
}

const defaultOnComplete = (results: Record<string, string>) => {
  console.log('Quiz completed:', results);
};

export default function Quiz({ 
  questions, 
  onComplete = defaultOnComplete 
}: QuizProps) {
  useTokenValidation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const newScore = questions.reduce((acc, q) => 
      acc + (userAnswers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase() ? 1 : 0), 
    0);
    setScore(newScore);
    setShowResults(true);
    
    onComplete(userAnswers);
  };

  const handleRetry = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
  };

  const isQuizComplete = () => {
    return questions.every(q => userAnswers[q.id]);
  };

  return (
    <>
    <div className="quiz-container">
      <nav className="quiz-nav">
            <h1 className="quiz-title">Interactive Quiz</h1>
          {!showResults && (
            <div className="quiz-question-number">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          )}
        
      </nav>

      <main className="quiz-body">
        {!showResults ? (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            currentAnswer={userAnswers[questions[currentQuestionIndex].id] || ''}
            onAnswerChange={handleAnswerSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === questions.length - 1}
            onSubmit={handleSubmit}
            canSubmit={isQuizComplete()}
          />
        ) : (
          <Results
            questions={questions}
            userAnswers={userAnswers}
            onRetry={handleRetry}
          />
        )}
      </main>
    </div>
    </>
  );
}