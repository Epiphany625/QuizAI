import React from 'react';
import { BookOpen, FileText, Brain } from 'lucide-react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onSelect: (courseId: string) => void;
}

export function CourseCard({ course, onSelect }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-duration-300">
      <img src={course.imageUrl} alt={course.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center mb-2">
          <BookOpen className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            <span>{course.materials.length} Materials</span>
          </div>
          <div className="flex items-center">
            <Brain className="w-4 h-4 mr-1" />
            <span>{course.quizzes.length} Quizzes</span>
          </div>
        </div>
        
        <button 
          onClick={() => onSelect(course.id)}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                   transition-colors duration-300 focus:outline-none focus:ring-2 
                   focus:ring-indigo-500 focus:ring-offset-2"
        >
          Open Course
        </button>
      </div>
    </div>
  );
}