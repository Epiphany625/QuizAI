import React from 'react';
import { BookOpen, Clock, GraduationCap } from 'lucide-react';
import type { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quizId: string) => void;
}

export function QuizCard({ quiz, onStart }: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
          <GraduationCap className="text-indigo-600 w-6 h-6" />
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <BookOpen className="w-4 h-4 mr-2" />
          <span>{quiz.subject}</span>
          {quiz.timeLimit && (
            <>
              <Clock className="w-4 h-4 ml-4 mr-2" />
              <span>{quiz.timeLimit} mins</span>
            </>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">{quiz.questions.length} questions</span>
          <button
            onClick={() => onStart(quiz.id)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}