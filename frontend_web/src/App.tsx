import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { CourseWorkspace } from './components/CourseWorkspace';
import { CourseSidebar } from './components/CourseSidebar';
import { CourseProgress } from './components/CourseProgress';
import { MistakeJournal } from './components/MistakeJournal';
import { CourseList } from './components/CourseList';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import type { Course } from './types';

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
    navigate('/');
  };

  const handleViewMaterials = (course: Course) => {
    setSelectedCourse(course);
    setShowMaterials(true);
    setShowProgress(false);
    setShowMistakes(false);
    navigate('/');
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  const handleMyCourses = () => {
    setShowMistakes(false);
    setSelectedCourse(null);
    setShowProgress(false);
    setShowMaterials(false);
    navigate('/');
  };

  const handleMistakesClick = () => {
    setShowMistakes(true);
    setSelectedCourse(null);
    setShowProgress(false);
    setShowMaterials(false);
    navigate('/');
  };

  const AppLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMistakesClick={handleMistakesClick}
        showBackButton={false}
        onBack={() => {}}
      />
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
              navigate('/');
            }
          }}
          onViewProgress={handleViewProgress}
          onViewMaterials={handleViewMaterials}
          courses={courses}
          onAddCourse={handleAddCourse}
        />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={
        <AppLayout>
          <Profile />
        </AppLayout>
      } />
      <Route path="/" element={
        <AppLayout>
          {showMistakes ? (
            <MistakeJournal mistakes={[]} onReview={() => {}} />
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