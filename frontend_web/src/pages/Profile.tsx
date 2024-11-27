import React, { useState } from 'react';
import useTokenValidation from '../hooks/useTokenValidation';
import { Camera, Mail, Calendar, BookOpen, Star, Target, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileData {
  name: string;
  email: string;
  role: string;
}

export function Profile() {
  useTokenValidation();
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Student'
  });
  const [editForm, setEditForm] = useState<ProfileData>(profileData);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData(editForm);
    setShowEditModal(false);
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-400 to-sky-300 rounded-b-[64px]">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <label className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-md cursor-pointer hover:bg-gray-50 transition-all duration-200">
                  <Camera className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{profileData.name}</h1>
                <p className="text-gray-500 text-lg">{profileData.role}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-full shadow-sm border border-green-200">
                  <Star className="w-4 h-4 inline-block mr-2 text-green-600" />
                  Premium Subscriber
                </div>
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-all duration-300 shadow-sm hover:shadow"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-4 py-3">
                  <Mail className="w-5 h-5 mr-4 text-gray-500" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-4 py-3">
                  <Calendar className="w-5 h-5 mr-4 text-gray-500" />
                  <span>Joined January 2024</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-blue-500" />
                  Statistics
                </h2>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
                      <span>Quizzes Taken</span>
                    </div>
                    <span className="font-semibold text-gray-900">48</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Target className="w-5 h-5 mr-3 text-blue-500" />
                      <span>Mistakes Resolved</span>
                    </div>
                    <span className="font-semibold text-gray-900">32</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}