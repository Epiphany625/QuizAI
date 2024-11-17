import React from 'react';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
import type { MistakeEntry } from '../types';

interface MistakeJournalProps {
  mistakes: MistakeEntry[];
  onReview: (mistakeId: string) => void;
}

export function MistakeJournal({ mistakes, onReview }: MistakeJournalProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mistake Journal</h2>
        <p className="text-gray-600">Review and learn from your previous mistakes</p>
      </div>

      <div className="space-y-4">
        {mistakes.map((mistake) => (
          <div key={mistake.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Question {mistake.questionId}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">{mistake.question}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-gray-700">Your answer: {mistake.userAnswer}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">Correct answer: {mistake.correctAnswer}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">{mistake.explanation}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => onReview(mistake.id)}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  mistake.reviewed
                    ? 'bg-green-50 text-green-600'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {mistake.reviewed ? 'Reviewed' : 'Mark as Reviewed'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}