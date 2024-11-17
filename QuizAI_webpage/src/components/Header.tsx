import React from 'react';
import { GraduationCap, User, ArrowLeft, BookOpen } from 'lucide-react';

interface HeaderProps {
  onMistakesClick: () => void;
  showBackButton: boolean;
  onBack: () => void;
}

export function Header({ onMistakesClick, showBackButton, onBack }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm h-16">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8">
            {showBackButton ? (
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-[#3B82F6]"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Back</span>
              </button>
            ) : (
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-[#3B82F6]" />
                <span className="ml-2 text-xl font-bold text-gray-900">StudyPrep</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onMistakesClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-[#3B82F6] px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <BookOpen className="h-5 w-5" />
              <span className="hidden sm:inline-block text-sm font-medium">Mistake Journal</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-700 hover:text-[#3B82F6] px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline-block text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}