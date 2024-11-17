import React, { useState } from 'react';
import { BookOpen, GraduationCap, BookMarked, Clock } from 'lucide-react';
import type { Course } from '../types';

const SAMPLE_COURSES: Course[] = [
  {
    id: '1',
    name: 'Introduction to Psychology',
    description: 'Explore the fundamentals of human behavior and mental processes',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
    materials: [],
    quizzes: []
  },
  {
    id: '2',
    name: 'Calculus I',
    description: 'Master derivatives, integrals, and limits',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
    materials: [],
    quizzes: []
  },
  {
    id: '3',
    name: 'World History',
    description: 'Journey through the major events that shaped our world',
    imageUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=400',
    materials: [],
    quizzes: []
  }
];

interface CourseSidebarProps {
  selectedCourse: Course | null;
  onSelectCourse: (course: Course | null) => void;
  onViewProgress: (course: Course) => void;
  onViewMaterials: (course: Course) => void;
}

export function CourseSidebar({ selectedCourse, onSelectCourse, onViewProgress, onViewMaterials }: CourseSidebarProps) {
  const [selectedSection, setSelectedSection] = useState<'materials' | 'quizzes' | null>(null);

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-[#3B82F6]">
          <GraduationCap className="w-5 h-5" />
          <span className="font-semibold">My Courses</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="space-y-1">
            {SAMPLE_COURSES.map((course) => (
              <div key={course.id} className="space-y-1">
                <button
                  onClick={() => {
                    onSelectCourse(course);
                    setSelectedSection(null);
                  }}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors duration-200 ${
                    selectedCourse?.id === course.id
                      ? 'bg-[#DBEAFE] text-[#3B82F6]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium truncate">{course.name}</span>
                </button>
                {selectedCourse?.id === course.id && (
                  <div className="ml-6 space-y-1">
                    <button
                      onClick={() => {
                        onViewMaterials(course);
                        setSelectedSection('materials');
                      }}
                      className={`flex items-center w-full p-2 text-sm ${
                        selectedSection === 'materials'
                          ? 'text-[#3B82F6] bg-[#DBEAFE]'
                          : 'text-gray-600 hover:text-[#3B82F6] hover:bg-gray-50'
                      } rounded-lg`}
                    >
                      <BookMarked className="w-4 h-4 mr-2" />
                      Course Materials
                    </button>
                    <button
                      onClick={() => {
                        onViewProgress(course);
                        setSelectedSection('quizzes');
                      }}
                      className={`flex items-center w-full p-2 text-sm ${
                        selectedSection === 'quizzes'
                          ? 'text-[#3B82F6] bg-[#DBEAFE]'
                          : 'text-gray-600 hover:text-[#3B82F6] hover:bg-gray-50'
                      } rounded-lg`}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Past Quizzes
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}