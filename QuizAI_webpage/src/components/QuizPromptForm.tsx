import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { QuizPrompt, StudyMaterial } from '../types';

interface QuizPromptFormProps {
  materials: StudyMaterial[];
  onSubmit: (prompt: QuizPrompt) => void;
  onClose: () => void;
}

export default function QuizPromptForm({ materials, onSubmit, onClose }: QuizPromptFormProps) {
  const [prompt, setPrompt] = useState<QuizPrompt>({
    format: 'multiple-choice',
    questionCount: 10,
    studyGuide: '',
    selectedMaterials: materials.map(m => m.id),
    timeLimit: 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Generate New Quiz</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Type
          </label>
          <select
            value={prompt.format}
            onChange={(e) => setPrompt({ ...prompt, format: e.target.value as QuizPrompt['format'] })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Questions
          </label>
          <input
            type="number"
            value={prompt.questionCount}
            onChange={(e) => setPrompt({ ...prompt, questionCount: parseInt(e.target.value) })}
            min="5"
            max="50"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Limit (minutes)
          </label>
          <input
            type="number"
            value={prompt.timeLimit}
            onChange={(e) => setPrompt({ ...prompt, timeLimit: parseInt(e.target.value) })}
            min="5"
            max="180"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Study Guide
          </label>
          <textarea
            value={prompt.studyGuide}
            onChange={(e) => setPrompt({ ...prompt, studyGuide: e.target.value })}
            placeholder="Copy text of test requirement inside..."
            rows={4}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sample Questions (Optional)
          </label>
          <textarea
            value={prompt.sampleQuestions || ''}
            onChange={(e) => setPrompt({ ...prompt, sampleQuestions: e.target.value })}
            placeholder="Add example questions to guide the AI in generating similar ones..."
            rows={3}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Materials to Include
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
            {materials.map((material) => (
              <label key={material.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={prompt.selectedMaterials.includes(material.id)}
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? [...prompt.selectedMaterials, material.id]
                      : prompt.selectedMaterials.filter(id => id !== material.id);
                    setPrompt({ ...prompt, selectedMaterials: newSelected });
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{material.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                   transition-colors duration-300 focus:outline-none focus:ring-2 
                   focus:ring-indigo-500 focus:ring-offset-2"
        >
          Generate Quiz
        </button>
      </div>
    </form>
  );
}