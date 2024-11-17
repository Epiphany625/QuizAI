import React from 'react';
import { GraduationCap, User, ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMistakesClick: () => void;
  showBackButton: boolean;
  onBack: () => void;
}

export function Header({ onMistakesClick, showBackButton, onBack }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm h-16">
      <div className="h-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-8">
            {showBackButton ? (
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-[#3B82F6] text-lg"
              >
                <ArrowLeft className="h-6 w-6 mr-2" />
                <span className="font-medium">Back</span>
              </button>
            ) : (
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-[#3B82F6]" />
                <span className="ml-2 text-2xl font-bold text-gray-900">StudyPrep</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={onMistakesClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-[#3B82F6] px-4 py-2 rounded-lg hover:bg-gray-50 text-lg"
            >
              <BookOpen className="h-6 w-6" />
              <span className="hidden sm:inline-block font-medium">Mistake Journal</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-700 hover:text-[#3B82F6] px-4 py-2 rounded-lg hover:bg-gray-50 text-lg">
              <User className="h-6 w-6" />
              <span className="hidden sm:inline-block font-medium">Profile</span>
            </button>
            <Link
              to="/login"
              className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors duration-300 text-lg font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}