import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, ArrowLeft, BookOpen, Mail, Star, LogOut, Trophy, CreditCard, Crown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useTokenValidation from '../hooks/useTokenValidation';

interface HeaderProps {
  onMistakesClick: () => void;
  showBackButton: boolean;
  onBack: () => void;
}

export function Header({ onMistakesClick, showBackButton, onBack }: HeaderProps) {

  useTokenValidation(); // make sure the user is logged in


  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !profileButtonRef.current?.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  

  const handleNavigate = (path: string) => {
    setShowProfileDropdown(false);
    navigate(path);
  };

  return (
    <header className="bg-white shadow-sm h-16 relative z-50">
      <div className="h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Left section */}
          <div className="flex items-center">
            {showBackButton ? (
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-[#3B82F6] text-lg"
              >
                <ArrowLeft className="h-6 w-6 mr-2" />
                <span className="font-medium">Back</span>
              </button>
            ) : (
              <Link to="/" className="flex items-center">
                <GraduationCap className="h-8 w-8 text-[#3B82F6]" />
                <span className="ml-2 text-2xl font-bold text-gray-900">StudyPrep</span>
              </Link>
            )}
          </div>

          {/* Center section */}
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={onMistakesClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-[#3B82F6] px-4 py-2 rounded-lg hover:bg-gray-50 text-lg mx-4"
            >
              <BookOpen className="h-6 w-6" />
              <span className="font-medium">Mistake Journal</span>
            </button>
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavigate('/subscription')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-sm hover:shadow"
            >
              <Crown className="h-5 w-5" />
              <span className="font-medium">Go Premium</span>
            </button>

            {/* Mobile mistake journal button */}
            <button
              onClick={onMistakesClick}
              className="md:hidden flex items-center space-x-2 text-gray-700 hover:text-[#3B82F6] px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <BookOpen className="h-6 w-6" />
            </button>

            <div className="relative">
              <button 
                ref={profileButtonRef}
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-full animate-pulse"></div>
                  <div className="relative w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">?</span>
                  </div>
                </div>
              </button>

              {showProfileDropdown && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-full animate-pulse"></div>
                        <div className="relative w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600">?</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-600">Premium</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center text-gray-600 py-2">
                      <Mail className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-sm">{localStorage.getItem('email')}</span>
                    </div>
                  </div>

                  <div className="px-4 py-2 border-b border-gray-100">
                    <button
                      onClick={() => handleNavigate('/achievements')}
                      className="flex items-center w-full py-2 text-gray-600 hover:text-[#3B82F6] group"
                    >
                      <Trophy className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#3B82F6]" />
                      <span className="text-sm">Achievements</span>
                    </button>
                  </div>

                  <div className="px-4 py-2 border-b border-gray-100">
                    <button
                      onClick={() => handleNavigate('/subscription')}
                      className="flex items-center w-full py-2 text-gray-600 hover:text-[#3B82F6] group"
                    >
                      <CreditCard className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#3B82F6]" />
                      <span className="text-sm">Manage Subscription</span>
                    </button>
                  </div>

                  <div className="px-4 py-2">
                    <button
                      onClick={() => handleNavigate('/login')}
                      className="flex items-center text-gray-600 hover:text-red-600 py-2 w-full"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigate('/login')}
              className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors duration-300 text-lg font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}