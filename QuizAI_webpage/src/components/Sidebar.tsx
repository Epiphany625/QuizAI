import React from 'react';
import { FolderUp, BookOpen, History, Settings, ChevronDown } from 'lucide-react';
import type { StudyMaterial } from '../types';

interface SidebarProps {
  materials: StudyMaterial[];
  onFileUpload: (files: FileList) => void;
}

export function Sidebar({ materials, onFileUpload }: SidebarProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-indigo-300 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors duration-300"
        >
          <FolderUp className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Drag & drop your study materials here</p>
          <input
            type="file"
            multiple
            onChange={(e) => e.target.files && onFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-2 inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm cursor-pointer hover:bg-indigo-100"
          >
            Browse Files
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Recent Materials</h3>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50"
                >
                  <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {material.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {material.status === 'processing' ? 'Processing...' : 'Ready'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 w-full p-2 rounded-lg hover:bg-gray-50">
          <History className="w-5 h-5" />
          <span>History</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 w-full p-2 rounded-lg hover:bg-gray-50">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}