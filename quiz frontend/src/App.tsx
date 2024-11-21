import React, { useState } from 'react';
import { questions } from './data/questions';
import QuestionCard from './components/QuestionCard'; // use different input from database
import Results from './components/Results';
import { Brain } from 'lucide-react';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRetry = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const isQuizComplete = () => {
    return questions.every((question) => userAnswers[question.id]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#201E43] text-white py-4 px-4 shadow-lg mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#508C9B]" />
            <h1 className="text-xl font-semibold">Interactive Quiz</h1>
          </div>
          {!showResults && (
            <div className="bg-white/10 px-4 py-1.5 rounded-full text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pb-8">
        {!showResults ? (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            currentAnswer={userAnswers[questions[currentQuestionIndex].id] || ''}
            onAnswerChange={handleAnswerChange}
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
  );
}