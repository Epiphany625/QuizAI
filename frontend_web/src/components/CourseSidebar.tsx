import React, { useState } from 'react';
import { BookOpen, GraduationCap, BookMarked, Clock, Plus, Pencil, Trash2 } from 'lucide-react';
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
  }
];

interface CourseSidebarProps {
  selectedCourse: Course | null;
  onSelectCourse: (course: Course | null) => void;
  onViewProgress: (course: Course) => void;
  onViewMaterials: (course: Course) => void;
}

interface CourseFormData {
  name: string;
  description: string;
}

export function CourseSidebar({ selectedCourse, onSelectCourse, onViewProgress, onViewMaterials }: CourseSidebarProps) {
  const [selectedSection, setSelectedSection] = useState<'materials' | 'quizzes' | null>(null);
  const [courses, setCourses] = useState(SAMPLE_COURSES);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState<CourseFormData>({ name: '', description: '' });
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState('');

  const handleMyCourses = () => {
    onSelectCourse(null);
    setSelectedSection(null);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const course: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCourse.name,
      description: newCourse.description,
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
      materials: [],
      quizzes: []
    };
    setCourses([...courses, course]);
    setNewCourse({ name: '', description: '' });
    setShowNewCourseForm(false);
  };

  const handleUpdateCourse = (courseId: string, updatedName: string) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, name: updatedName }
        : course
    ));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirmDelete === courses.find(c => c.id === courseId)?.name) {
      setCourses(courses.filter(course => course.id !== courseId));
      if (selectedCourse?.id === courseId) {
        onSelectCourse(null);
      }
      setDeletingCourse(null);
      setConfirmDelete('');
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button 
          onClick={handleMyCourses}
          className="flex items-center space-x-2 text-[#3B82F6] w-full hover:bg-[#DBEAFE] p-2 rounded-lg transition-colors duration-200"
        >
          <GraduationCap className="w-6 h-6" />
          <span className="font-semibold text-lg">My Courses</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <button
            onClick={() => setShowNewCourseForm(true)}
            className="flex items-center w-full p-3 mb-4 rounded-lg text-[#3B82F6] hover:bg-[#DBEAFE] transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span className="font-medium">Create New Course</span>
          </button>

          {showNewCourseForm && (
            <form onSubmit={handleCreateCourse} className="mb-4 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg text-base"
                required
              />
              <textarea
                placeholder="Course Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg text-base"
                rows={3}
                required
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 p-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB]"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCourseForm(false);
                    setNewCourse({ name: '', description: '' });
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {courses.map((course) => (
              <div key={course.id} className="space-y-1">
                <div className="flex items-center justify-between group">
                  <button
                    onClick={() => {
                      onSelectCourse(course);
                      setSelectedSection(null);
                    }}
                    className={`flex items-center flex-1 p-3 rounded-lg transition-colors duration-200 text-base ${
                      selectedCourse?.id === course.id
                        ? 'bg-[#DBEAFE] text-[#3B82F6]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BookOpen className="w-5 h-5 mr-3" />
                    {editingCourse === course.id ? (
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => handleUpdateCourse(course.id, e.target.value)}
                        onBlur={() => setEditingCourse(null)}
                        autoFocus
                        className="flex-1 bg-transparent border-none focus:ring-0"
                      />
                    ) : (
                      <span className="font-medium truncate">{course.name}</span>
                    )}
                  </button>
                  <div className="hidden group-hover:flex items-center ml-2">
                    <button
                      onClick={() => setEditingCourse(course.id)}
                      className="p-1 text-gray-500 hover:text-[#3B82F6] rounded-lg"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingCourse(course.id)}
                      className="p-1 text-gray-500 hover:text-red-500 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {deletingCourse === course.id && (
                  <div className="ml-6 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 mb-2">
                      Type "{course.name}" to confirm deletion:
                    </p>
                    <input
                      type="text"
                      value={confirmDelete}
                      onChange={(e) => setConfirmDelete(e.target.value)}
                      className="w-full p-2 mb-2 border border-red-300 rounded-lg text-sm"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setDeletingCourse(null);
                          setConfirmDelete('');
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {selectedCourse?.id === course.id && (
                  <div className="ml-6 space-y-2">
                    <button
                      onClick={() => {
                        onViewMaterials(course);
                        setSelectedSection('materials');
                      }}
                      className={`flex items-center w-full p-3 text-base ${
                        selectedSection === 'materials'
                          ? 'text-[#3B82F6] bg-[#DBEAFE]'
                          : 'text-gray-600 hover:text-[#3B82F6] hover:bg-gray-50'
                      } rounded-lg`}
                    >
                      <BookMarked className="w-5 h-5 mr-3" />
                      Course Materials
                    </button>
                    <button
                      onClick={() => {
                        onViewProgress(course);
                        setSelectedSection('quizzes');
                      }}
                      className={`flex items-center w-full p-3 text-base ${
                        selectedSection === 'quizzes'
                          ? 'text-[#3B82F6] bg-[#DBEAFE]'
                          : 'text-gray-600 hover:text-[#3B82F6] hover:bg-gray-50'
                      } rounded-lg`}
                    >
                      <Clock className="w-5 h-5 mr-3" />
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