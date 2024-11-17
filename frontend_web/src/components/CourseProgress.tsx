import React, { useState } from 'react';
import { ArrowLeft, Brain, Target, Clock, Award, ChevronDown, ChevronUp } from 'lucide-react';
import type { Course, Quiz, Question } from '../types';

interface CourseProgressProps {
  course: Course;
  onBack: () => void;
}

interface QuizDetailsProps {
  quiz: Quiz;
  isOpen: boolean;
  onToggle: () => void;
}

function QuizDetails({ quiz, isOpen, onToggle }: QuizDetailsProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4"
      >
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-indigo-600 mr-3" />
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
            <p className="text-sm text-gray-500">
              Taken on {quiz.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {quiz.attempted && (
            <span className="mr-4 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
              Score: {quiz.score}%
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {quiz.questions.map((question: Question, index: number) => (
            <div key={question.id} className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-3">
                Question {index + 1}: {question.text}
              </p>
              <div className="space-y-2 ml-4">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-center ${
                      question.attempted
                        ? optionIndex === question.correctAnswer
                          ? 'text-green-600'
                          : optionIndex === question.userAnswer
                          ? 'text-red-600'
                          : 'text-gray-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <span className="mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {question.attempted && question.explanation && (
                <div className="mt-3 text-sm text-gray-600 border-t border-gray-200 pt-3">
                  <span className="font-medium">Explanation:</span> {question.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CourseProgress({ course, onBack }: CourseProgressProps) {
  const [openQuizId, setOpenQuizId] = useState<string | null>(null);
  const completedQuizzes = course.quizzes.filter(q => q.attempted);
  const averageScore = completedQuizzes.length > 0
    ? completedQuizzes.reduce((acc, q) => acc + (q.score || 0), 0) / completedQuizzes.length
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Course
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h1>
        <p className="text-gray-600">Past Quizzes and Performance</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center text-sm font-medium text-gray-600">
            <Brain className="w-4 h-4 mr-2" />
            Total Quizzes
          </div>
          <p className="mt-1 text-xl font-semibold text-gray-900">
            {completedQuizzes.length} / {course.quizzes.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center text-sm font-medium text-gray-600">
            <Target className="w-4 h-4 mr-2" />
            Average Score
          </div>
          <p className="mt-1 text-xl font-semibold text-gray-900">
            {averageScore.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center text-sm font-medium text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            Study Time
          </div>
          <p className="mt-1 text-xl font-semibold text-gray-900">
            {completedQuizzes.reduce((acc, q) => acc + (q.timeLimit || 0), 0)} mins
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quiz History</h2>
          <div className="space-y-4">
            {course.quizzes.map((quiz) => (
              <QuizDetails
                key={quiz.id}
                quiz={quiz}
                isOpen={openQuizId === quiz.id}
                onToggle={() => setOpenQuizId(openQuizId === quiz.id ? null : quiz.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}