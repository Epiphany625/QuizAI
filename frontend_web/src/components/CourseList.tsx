import React from 'react';
import { Search, BookOpen, Brain } from 'lucide-react';
import type { Course } from '../types';

interface CourseListProps {
  onSelectCourse: (course: Course) => void;
  onViewProgress: (course: Course) => void;
  courses: Course[];
}

export function CourseList({ onSelectCourse, onViewProgress, courses }: CourseListProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-[#1E3A8A]">My Courses</h2>
        <div className="relative max-w-xs">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-duration-300">
            <img src={course.imageUrl} alt={course.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-[#3B82F6] mr-2" />
                <h3 className="text-xl font-semibold text-[#1E3A8A]">{course.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-1" />
                  <span>{course.quizzes.length} Quizzes</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="flex-1 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors duration-300"
                >
                  Open Course
                </button>
                <button
                  onClick={() => onViewProgress(course)}
                  className="px-4 py-2 text-[#3B82F6] bg-[#DBEAFE] rounded-lg hover:bg-[#DBEAFE]/70 transition-colors duration-300"
                >
                  Past Quizzes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}