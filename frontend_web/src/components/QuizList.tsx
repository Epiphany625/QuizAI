import React from 'react';
import { Brain, Clock, CheckCircle } from 'lucide-react';
import type { Quiz } from '../types';

interface QuizListProps {
  quizzes: Quiz[];
}

export function QuizList({ quizzes }: QuizListProps) {
  if (quizzes.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Brain className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                </div>
                {quiz.status === 'ready' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                <span>{quiz.timeLimit} minutes</span>
                <span className="mx-2">•</span>
                <span>{quiz.questions.length} questions</span>
              </div>

              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}