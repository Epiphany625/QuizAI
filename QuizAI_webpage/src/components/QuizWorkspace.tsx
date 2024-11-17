import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import type { Quiz } from '../types';

interface QuizWorkspaceProps {
  quizzes: Quiz[];
}

export function QuizWorkspace({ quizzes }: QuizWorkspaceProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Quizzes</h2>
          <p className="text-gray-600">Generated quizzes from your study materials</p>
        </div>

        <div className="grid gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                {quiz.status === 'generating' ? (
                  <div className="flex items-center text-yellow-600">
                    <Clock className="w-5 h-5 mr-1" />
                    <span className="text-sm">Generating...</span>
                  </div>
                ) : quiz.status === 'ready' ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    <span className="text-sm">Ready</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="w-5 h-5 mr-1" />
                    <span className="text-sm">Failed</span>
                  </div>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{quiz.questions.length} questions</span>
                <span className="mx-2">•</span>
                <span>{quiz.subject}</span>
                {quiz.timeLimit && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{quiz.timeLimit} minutes</span>
                  </>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  disabled={quiz.status !== 'ready'}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                           transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Start Quiz
                </button>
                <button className="px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 
                                 transition-colors duration-300">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}