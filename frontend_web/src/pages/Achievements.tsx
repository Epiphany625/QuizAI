import React from 'react';
import useTokenValidation from '../hooks/useTokenValidation';
import { Trophy, Star, Target, Award, FileText, Brain } from 'lucide-react';

interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  progress: number;
  total: number;
  unlockedAt?: Date;
}

export function Achievements() {
  useTokenValidation();

  const achievements: Achievement[] = [
    {
      id: '1',
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      title: 'Quiz Master',
      description: 'Complete 50 quizzes with a score of 90% or higher',
      progress: 12,
      total: 50,
    },
    {
      id: '2',
      icon: <Star className="w-6 h-6 text-blue-500" />,
      title: 'Perfect Score',
      description: 'Achieve 100% on any quiz',
      progress: 1,
      total: 1,
      unlockedAt: new Date('2024-01-15'),
    },
    {
      id: '3',
      icon: <Brain className="w-6 h-6 text-indigo-500" />,
      title: 'Quiz Creator',
      description: 'Generate quizzes using AI',
      progress: 8,
      total: 50,
    },
    {
      id: '4',
      icon: <FileText className="w-6 h-6 text-emerald-500" />,
      title: 'Resource Collector',
      description: 'Upload study materials',
      progress: 15,
      total: 100,
    },
    {
      id: '5',
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: 'Knowledge Explorer',
      description: 'Complete quizzes in 5 different subjects',
      progress: 2,
      total: 5,
    },
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-1">Track your learning milestones</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white rounded-xl p-6 shadow-sm border ${
                achievement.unlockedAt ? 'border-green-200' : 'border-gray-200'
              } hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-gray-50">
                    {achievement.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {achievement.description}
                    </p>
                  </div>
                </div>
                {achievement.unlockedAt && (
                  <span className="text-sm text-green-600 font-medium">
                    Unlocked {achievement.unlockedAt.toLocaleDateString()}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.total}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      achievement.unlockedAt ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{
                      width: `${(achievement.progress / achievement.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}