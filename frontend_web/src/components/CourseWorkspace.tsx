import React, { useState } from 'react';
import { FolderUp, Brain, Camera } from 'lucide-react';
import QuizPromptForm from './QuizPromptForm';
import { QuizList } from './QuizList';
import type { Course, StudyMaterial } from '../types';

interface CourseWorkspaceProps {
  course: Course;
}

export function CourseWorkspace({ course }: CourseWorkspaceProps) {
  const [materials, setMaterials] = useState<StudyMaterial[]>(course.materials);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    title: course.name,
    description: course.description,
    imageUrl: course.imageUrl
  });

  const handleFileUpload = (files: FileList) => {
    const newMaterials: StudyMaterial[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
      status: 'processing'
    }));

    setMaterials([...materials, ...newMaterials]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseDetails(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <input
          type="text"
          value={courseDetails.title}
          onChange={(e) => setCourseDetails(prev => ({ ...prev, title: e.target.value }))}
          className="text-3xl font-bold text-gray-900 mb-2 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-lg px-2"
        />
        <textarea
          value={courseDetails.description}
          onChange={(e) => setCourseDetails(prev => ({ ...prev, description: e.target.value }))}
          className="text-gray-600 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-lg px-2 resize-none"
          rows={2}
        />
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Image</h3>
            <div className="relative">
              <img
                src={courseDetails.imageUrl}
                alt="Course cover"
                className="w-full h-48 object-cover rounded-lg"
              />
              <label className="absolute bottom-4 right-4 bg-[#3B82F6] text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-[#2563EB] transition-colors duration-300">
                <Camera className="w-5 h-5 inline-block mr-2" />
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files) {
                handleFileUpload(e.dataTransfer.files);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-[#3B82F6] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors duration-300"
          >
            <FolderUp className="w-12 h-12 text-[#3B82F6] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Study Materials</h3>
            <p className="text-gray-600 mb-4">Drag & drop your files here, or click to browse</p>
            <input
              type="file"
              multiple
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-[#3B82F6] text-white rounded-lg cursor-pointer hover:bg-[#2563EB] transition-colors duration-300"
            >
              Select Files
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Course Materials</h2>
            <span className="text-sm text-gray-500">{materials.length} files</span>
          </div>
          <div className="space-y-3">
            {materials.map((material) => (
              <div
                key={material.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{material.name}</p>
                  <p className="text-sm text-gray-500">
                    {material.status === 'processing' ? 'Processing...' : 'Ready'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Generate Quiz</h2>
            <Brain className="w-6 h-6 text-[#3B82F6]" />
          </div>
          {materials.length > 0 ? (
            <button
              onClick={() => setShowQuizForm(true)}
              className="w-full px-4 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors duration-300"
            >
              Create New Quiz
            </button>
          ) : (
            <p className="text-gray-600 text-center">
              Upload study materials to generate quizzes
            </p>
          )}
        </div>

        {showQuizForm && (
          <div className="bg-white rounded-xl shadow-sm">
            <QuizPromptForm 
              materials={materials}
              onSubmit={() => {}}
              onClose={() => setShowQuizForm(false)}
            />
          </div>
        )}

        <div className="mt-8">
          <QuizList quizzes={course.quizzes} />
        </div>
      </div>
    </div>
  );
}