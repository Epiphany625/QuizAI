import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { CourseWorkspace } from './components/CourseWorkspace';
import { CourseSidebar } from './components/CourseSidebar';
import { CourseProgress } from './components/CourseProgress';
import { MistakeJournal } from './components/MistakeJournal';
import { CourseList } from './components/CourseList';
import { Login } from './pages/Login';
import { Achievements } from './pages/Achievements';
import { Subscription } from './pages/Subscription';
import type { Course, MistakeEntry } from './types';

const defaultCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Psychology',
    description: 'Explore the fundamentals of human behavior and mental processes',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
    materials: [],
    quizzes: []
  },
  {
    id: '2',
    name: 'Calculus I',
    description: 'Master derivatives, integrals, and limits',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
    materials: [],
    quizzes: []
  }
];

// Sample mistake entries for demonstration
const sampleMistakes: MistakeEntry[] = [
  {
    id: '1',
    quizId: 'quiz1',
    courseId: '1',
    questionId: 'q1',
    question: 'What is the primary function of neurotransmitters?',
    correctAnswer: 'To transmit signals between neurons',
    userAnswer: 'To store memories in the brain',
    explanation: 'Neurotransmitters are chemical messengers that transmit signals across synapses between neurons, enabling communication within the nervous system.',
    dateAdded: new Date(),
    reviewed: false
  }
];

interface AppLayoutProps {
  children: React.ReactNode;
  onMistakesClick: () => void;
}

function AppLayout({ children, onMistakesClick }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMistakesClick={onMistakesClick}
        showBackButton={false}
        onBack={() => {}}
      />
      {children}
    </div>
  );
}

function AppContent() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const navigate = useNavigate();

  const handleViewProgress = (course: Course) => {
    setSelectedCourse(course);
    setShowProgress(true);
    setShowMaterials(false);
    setShowMistakes(false);
  };

  const handleViewMaterials = (course: Course) => {
    setSelectedCourse(course);
    setShowMaterials(true);
    setShowProgress(false);
    setShowMistakes(false);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  const handleMyCourses = () => {
    setShowMistakes(false);
    setSelectedCourse(null);
    setShowProgress(false);
    setShowMaterials(false);
  };

  const handleMistakesClick = () => {
    setShowMistakes(true);
    setSelectedCourse(null);
    setShowProgress(false);
    setShowMaterials(false);
  };

  const handleReviewMistake = (mistakeId: string) => {
    // Implement mistake review logic here
    console.log('Reviewing mistake:', mistakeId);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/achievements" element={
        <AppLayout onMistakesClick={handleMistakesClick}>
          <div className="flex">
            <CourseSidebar 
              selectedCourse={selectedCourse}
              onSelectCourse={(course) => {
                if (course === null) {
                  handleMyCourses();
                } else {
                  setSelectedCourse(course);
                  setShowMaterials(true);
                  setShowProgress(false);
                  setShowMistakes(false);
                }
              }}
              onViewProgress={handleViewProgress}
              onViewMaterials={handleViewMaterials}
              courses={courses}
              onAddCourse={handleAddCourse}
            />
            <Achievements />
          </div>
        </AppLayout>
      } />
      <Route path="/subscription" element={
        <AppLayout onMistakesClick={handleMistakesClick}>
          <div className="flex">
            <CourseSidebar 
              selectedCourse={selectedCourse}
              onSelectCourse={(course) => {
                if (course === null) {
                  handleMyCourses();
                } else {
                  setSelectedCourse(course);
                  setShowMaterials(true);
                  setShowProgress(false);
                  setShowMistakes(false);
                }
              }}
              onViewProgress={handleViewProgress}
              onViewMaterials={handleViewMaterials}
              courses={courses}
              onAddCourse={handleAddCourse}
            />
            <Subscription />
          </div>
        </AppLayout>
      } />
      <Route path="/" element={
        <AppLayout onMistakesClick={handleMistakesClick}>
          <div className="flex">
            <CourseSidebar 
              selectedCourse={selectedCourse}
              onSelectCourse={(course) => {
                if (course === null) {
                  handleMyCourses();
                } else {
                  setSelectedCourse(course);
                  setShowMaterials(true);
                  setShowProgress(false);
                  setShowMistakes(false);
                }
              }}
              onViewProgress={handleViewProgress}
              onViewMaterials={handleViewMaterials}
              courses={courses}
              onAddCourse={handleAddCourse}
            />
            <main className="flex-1">
              {showMistakes ? (
                <MistakeJournal mistakes={sampleMistakes} onReview={handleReviewMistake} />
              ) : selectedCourse ? (
                showProgress ? (
                  <CourseProgress 
                    course={selectedCourse}
                    onBack={() => setShowProgress(false)}
                  />
                ) : showMaterials ? (
                  <CourseWorkspace course={selectedCourse} />
                ) : (
                  <CourseWorkspace course={selectedCourse} />
                )
              ) : (
                <div className="p-8">
                  <CourseList 
                    courses={courses}
                    onSelectCourse={(course) => {
                      setSelectedCourse(course);
                      setShowMaterials(true);
                    }} 
                    onViewProgress={handleViewProgress}
                  />
                </div>
              )}
            </main>
          </div>
        </AppLayout>
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;