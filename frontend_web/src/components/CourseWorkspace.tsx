import React, { useState, useEffect, useRef } from 'react';
import { FolderUp, Brain, Camera, X, Pencil, Check } from 'lucide-react';
import type { Course, StudyMaterial, QuizPrompt } from '../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Quiz from './Quiz/Quiz';

interface CourseWorkspaceProps {
  course: Course;
}

export function CourseWorkspace({ course }: CourseWorkspaceProps) {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    title: course.name,
    description: course.description,
    imageUrl: course.imageUrl,
  });
  const [quiz, setQuiz] = useState([]); // quiz state to store the current quiz


  // navigation
  const navigate = useNavigate();


  useEffect(() => {
    console.log(`Quiz form visibility changed to: ${showQuizForm}`);
  }, [showQuizForm]);

  // State variables for the quiz form
  const [prompt, setPrompt] = useState<QuizPrompt>({
    format: 'multiple-choice',
    questionCount: 10,
    studyGuide: '',
    selectedMaterials: materials.map((m) => m.id),
    timeLimit: 30,
  });
  const [quizTitle, setQuizTitle] = useState('Generate New Quiz');
  const [quizDescription, setQuizDescription] = useState('');
  const [editingQuizTitle, setEditingQuizTitle] = useState(false);
  const [editingQuizDescription, setEditingQuizDescription] = useState(false);

  // State variable for retrieve status
  const [retrieveStatus, setRetrieveStatus] = useState<'idle' | 'success' | 'failed' | 'loading'>('idle');

  // Ref to scroll to bottom when materials change
  const materialsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (materialsEndRef.current) {
      materialsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [materials]);

  const handleFileUpload = async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
  
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login');
      return;
    }

    try {
      // Step 1: Upload to your backend and save locally
      const response = await axios.post(`http://localhost:3000/api/upload/${email}/${course.name}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      console.log('Upload response:', response.data);
  
      // Step 2: Send data to external API for parsing/embedding
      const requestBody = {
        email,
        courseName: course.name,
        fileNames: Array.from(files).map(file => file.name),
      }
      console.log(requestBody);
      const secondaryResponse = await axios.post('http://localhost:8000/api/save', requestBody);
      console.log(secondaryResponse)

      
  
      const newMaterials: StudyMaterial[] = Array.from(files).map((file) => ({
        id: uuidv4(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        status: 'ready',
      }));
  
      setMaterials([...materials, ...newMaterials]);
    } catch (error) {
      console.error('Error uploading files:', error);
  
      const newMaterials: StudyMaterial[] = Array.from(files).map((file) => ({
        id: uuidv4(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        status: 'failed',
      }));
  
      setMaterials([...materials, ...newMaterials]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseDetails((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuizFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setShowQuizForm(false);
      setQuiz([]);
      // update the summary count
      // const userEmail = localStorage.getItem('email');
      // await axios.patch(`http://localhost:3000/api/user/${userEmail}/quiz`);
      
      const files = materials.filter(material => prompt.selectedMaterials.includes(material.id)).map(material => material.name);
      // get the content from the files using backend parser

        const email = localStorage.getItem('email');
        if (!email) {
          navigate('/login');
          return;
        }
        console.log(files);
        const response = await axios.post('http://localhost:3000/api/parse/parseMaterials', {
          email,
          courseName: course.name,
          files: files,
        });
        console.log('Parsed text:', response.data.combinedText);

        // json({
        //   parsedText: fileContents,
        //   combinedText,
        // });

      const quizResponse = await axios.post(`http://localhost:3000/api/quiz`, {
          content: response.data.combinedText,
          numQuestions: prompt.questionCount,
          questionType: prompt.format,
          sampleQuestions: prompt.sampleQuestions,});
      setQuiz(quizResponse.data.quiz);
    console.log(files);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
    setShowQuizForm(false); // Close the form after submission
  };

  // Function for retrieving past files
  const retrievePastFiles = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login');
      return;
    }
    setRetrieveStatus('loading');
    try {
      const response = await axios.get(`http://localhost:3000/api/upload/${email}/${course.name}`);
      console.log(response.data.materials);
      const newMaterials: StudyMaterial[] = [];
      for (const file of response.data.materials) {
        newMaterials.push({
          name: file,
          id: Math.random().toString(36).substr(2, 9),
          type: file.type,
          size: file.size,
          uploadedAt: new Date(),
          status: 'ready',
        });
      }
      setMaterials([...materials, ...newMaterials]);
      setRetrieveStatus('success');
    } catch (error) {
      console.error('Error retrieving past files:', error);
      setRetrieveStatus('failed');
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <input
          type="text"
          value={courseDetails.title}
          onChange={(e) =>
            setCourseDetails((prev) => ({ ...prev, title: e.target.value }))
          }
          className="text-3xl font-bold text-gray-900 mb-2 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-lg px-2"
        />
        <textarea
          value={courseDetails.description}
          onChange={(e) =>
            setCourseDetails((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="text-gray-600 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-lg px-2 resize-none"
          rows={2}
        />
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Course Image
            </h3>
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
            onDragOver={(e) => {e.preventDefault();               if (e.dataTransfer.files) {
              handleFileUpload(e.dataTransfer.files);
            }}}

            className="border-2 border-dashed border-[#3B82F6] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors duration-300"
          >
            <FolderUp className="w-12 h-12 text-[#3B82F6] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Study Materials
            </h3>
            <p className="text-gray-600 mb-4">
              Drag & drop your files here, or click to browse
            </p>
            <input
              type="file"
              multiple
              onChange={(e) =>
                e.target.files && handleFileUpload(e.target.files)
              }
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
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Uploaded Materials
              </h2>
              <button
                onClick={retrievePastFiles}
                disabled={retrieveStatus === 'success' || retrieveStatus === 'loading'}
                className={`ml-4 px-3 py-2 rounded-lg transition-colors duration-300 ${
                  retrieveStatus === 'success'
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : retrieveStatus === 'failed'
                    ? 'bg-red-500 text-white'
                    : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                }`}
              >
                {retrieveStatus === 'success'
                  ? 'Retrieval Success'
                  : retrieveStatus === 'failed'
                  ? 'Retrieval Failed. Click to retrieve again'
                  : retrieveStatus === 'loading'
                  ? 'Retrieving...'
                  : 'Retrieve Past Files'}
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {materials.length} files
            </span>
          </div>
          <div className="space-y-3">
            {materials.map((material) => (
              <div
                key={material.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{material.name}</p>
                  <p
                    className={`text-sm ${
                      material.status === 'failed'
                        ? 'text-red-500'
                        : material.status === 'processing'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  >
                    {material.status === 'failed'
                      ? 'Upload failed'
                      : material.status === 'processing'
                      ? 'Processing...'
                      : 'Ready'}
                  </p>
                </div>
              </div>
            ))}
            <div ref={materialsEndRef}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Generate Quiz
            </h2>
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
            <form onSubmit={handleQuizFormSubmit} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 mr-4">
                  {editingQuizTitle ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="flex-1 text-lg font-semibold text-gray-900 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setEditingQuizTitle(false)}
                        className="ml-2 p-1 text-green-600 hover:text-green-700"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center group">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {quizTitle}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingQuizTitle(true)}
                        className="ml-2 p-1 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600 transition-opacity"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {editingQuizDescription ? (
                    <div className="flex items-center mt-2">
                      <input
                        type="text"
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        placeholder="Add a description..."
                        className="flex-1 text-sm text-gray-600 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setEditingQuizDescription(false)}
                        className="ml-2 p-1 text-green-600 hover:text-green-700"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center group mt-1">
                      <p className="text-sm text-gray-600">
                        {quizDescription || 'Add a description...'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setEditingQuizDescription(true)}
                        className="ml-2 p-1 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600 transition-opacity"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuizForm(false)}
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
                    onChange={(e) =>
                      setPrompt({
                        ...prompt,
                        format: e.target.value as QuizPrompt['format'],
                      })
                    }
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
                    onChange={(e) =>
                      setPrompt({
                        ...prompt,
                        questionCount: parseInt(e.target.value),
                      })
                    }
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
                    onChange={(e) =>
                      setPrompt({
                        ...prompt,
                        timeLimit: parseInt(e.target.value),
                      })
                    }
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
                    onChange={(e) =>
                      setPrompt({ ...prompt, studyGuide: e.target.value })
                    }
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
                    onChange={(e) =>
                      setPrompt({ ...prompt, sampleQuestions: e.target.value })
                    }
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
                          checked={prompt.selectedMaterials.includes(
                            material.id
                          )}
                          onChange={(e) => {
                            const newSelected = e.target.checked
                              ? [...prompt.selectedMaterials, material.id]
                              : prompt.selectedMaterials.filter(
                                  (id) => id !== material.id
                                );
                            setPrompt({
                              ...prompt,
                              selectedMaterials: newSelected,
                            });
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {material.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  onSubmit={handleQuizFormSubmit}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                           transition-colors duration-300 focus:outline-none focus:ring-2 
                           focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Generate Quiz
                </button>
              </div>
            </form>
          </div>
        )}

      {quiz.length > 0 && <Quiz questions={quiz} />}
      </div>
    </div>
  );
}
