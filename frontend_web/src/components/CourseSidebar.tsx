import React, { useState } from 'react';
import { BookOpen, GraduationCap, BookMarked, Clock, Plus, Pencil, Camera } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Course } from '../types';
import axios from 'axios';

interface CourseSidebarProps {
  selectedCourse: Course | null;
  onSelectCourse: (course: Course | null) => void;
  onViewProgress: (course: Course) => void;
  onViewMaterials: (course: Course) => void;
  courses: Course[];
  onAddCourse: (course: Course) => void;
}

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 200;
const defaultCourseImage = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400';

export function CourseSidebar({ 
  selectedCourse, 
  onSelectCourse, 
  onViewProgress, 
  onViewMaterials,
  courses,
  onAddCourse 
}: CourseSidebarProps) {
  const [selectedSection, setSelectedSection] = useState<'materials' | 'quizzes' | null>(null);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    imageUrl: defaultCourseImage
  });
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [showFullTitle, setShowFullTitle] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMyCourses = () => {
    onSelectCourse(null);
    setSelectedSection(null);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleCourseSelect = (course: Course) => {
    onSelectCourse(course);
    onViewMaterials(course);
    setSelectedSection('materials');
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.name.length > MAX_TITLE_LENGTH) {
      setTitleError(`Title must be ${MAX_TITLE_LENGTH} characters or less`);
      return;
    }
    if (newCourse.description.length > MAX_DESCRIPTION_LENGTH) {
      setDescriptionError(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
      return;
    }

    // get the email from the local storage
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('Email not found in localStorage');
      navigate('/login');
      return;
    }

    // add the course to the user's courses
    try {
      const response = await axios.post(`http://localhost:3000/api/course/addcourse/${email}`, newCourse);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      return; 
    }


    const course: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCourse.name,
      description: newCourse.description,
      imageUrl: newCourse.imageUrl,
      materials: [],
      quizzes: []
    };
    onAddCourse(course);
    handleCourseSelect(course);
    setNewCourse({ name: '', description: '', imageUrl: defaultCourseImage });
    setShowNewCourseForm(false);
    setTitleError('');
    setDescriptionError('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewCourse(prev => ({ ...prev, name: value }));
    if (value.length > MAX_TITLE_LENGTH) {
      setTitleError(`Title must be ${MAX_TITLE_LENGTH} characters or less`);
    } else {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewCourse(prev => ({ ...prev, description: value }));
    if (value.length > MAX_DESCRIPTION_LENGTH) {
      setDescriptionError(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
    } else {
      setDescriptionError('');
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] flex flex-col relative z-40">
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
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Image</h3>
                <div className="relative">
                  <img
                    src={newCourse.imageUrl}
                    alt="Course cover"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <label className="absolute bottom-2 right-2 bg-[#3B82F6] text-white rounded-lg px-3 py-1 cursor-pointer hover:bg-[#2563EB] transition-colors duration-300 text-sm">
                    <Camera className="w-4 h-4 inline-block mr-1" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder={`Course Name (max ${MAX_TITLE_LENGTH} characters)`}
                  value={newCourse.name}
                  onChange={handleTitleChange}
                  className={`w-full p-2 border border-gray-300 rounded-lg text-sm ${
                    titleError ? 'border-red-500' : ''
                  }`}
                  required
                />
                {titleError && (
                  <p className="text-red-500 text-xs mt-1">{titleError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {newCourse.name.length}/{MAX_TITLE_LENGTH} characters
                </p>
              </div>
              <div className="mb-2">
                <textarea
                  placeholder={`Course Description (max ${MAX_DESCRIPTION_LENGTH} characters)`}
                  value={newCourse.description}
                  onChange={handleDescriptionChange}
                  className={`w-full p-2 border border-gray-300 rounded-lg text-sm ${
                    descriptionError ? 'border-red-500' : ''
                  }`}
                  rows={3}
                  required
                />
                {descriptionError && (
                  <p className="text-red-500 text-xs mt-1">{descriptionError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {newCourse.description.length}/{MAX_DESCRIPTION_LENGTH} characters
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 p-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] text-sm"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCourseForm(false);
                    setNewCourse({ name: '', description: '', imageUrl: defaultCourseImage });
                    setTitleError('');
                    setDescriptionError('');
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {courses.map((course) => (
              <div key={course.id} className="space-y-1">
                <div className="flex items-center justify-between group relative">
                  <button
                    onClick={() => {
                      handleCourseSelect(course);
                      setSelectedSection('materials');
                    }}
                    onMouseEnter={() => setShowFullTitle(course.id)}
                    onMouseLeave={() => setShowFullTitle(null)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 text-base ${
                      selectedCourse?.id === course.id
                        ? 'bg-[#DBEAFE] text-[#3B82F6]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BookOpen className="flex-shrink-0 w-5 h-5 mr-3" />
                    <span className="font-medium truncate">
                      {course.name.length > MAX_TITLE_LENGTH 
                        ? `${course.name.substring(0, MAX_TITLE_LENGTH)}...` 
                        : course.name}
                    </span>
                  </button>
                  {showFullTitle === course.id && course.name.length > MAX_TITLE_LENGTH && (
                    <div className="absolute left-0 top-full mt-1 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-sm">
                      {course.name}
                    </div>
                  )}
                </div>

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