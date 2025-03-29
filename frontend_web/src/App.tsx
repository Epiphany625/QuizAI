import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { CourseWorkspace } from './components/CourseWorkspace';
import { CourseSidebar } from './components/CourseSidebar';
import CourseProgress from './components/CourseProgress';
import { MistakeJournal } from './components/MistakeJournal';
import { CourseList } from './components/CourseList';
import { Login } from './pages/Login';
import { DocSearch } from './pages/DocSearch';
import { Achievements } from './pages/Achievements';
import { Subscription } from './pages/Subscription';
import Signup from './pages/Signup';
import axios from 'axios';
import type { Course, MistakeEntry } from './types';

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
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const email = localStorage.getItem('email');
      console.log(`retrieving courses for ${email}`);
      if (email) {
        axios.get(`http://localhost:3000/api/course/getcourses/${email}`).then(response => setCourses(response.data));
      } else {
        console.error('Email not found in localStorage');
      }
    }
  }, [location.pathname]);

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
    navigate('/');
  };

  const handleReviewMistake = (mistakeId: string) => {
    console.log('Reviewing mistake:', mistakeId);
  };

  const handleSelectCourse = (course: Course | null) => {
    setSelectedCourse(course);
    if (course) {
      setShowMaterials(true);
      setShowProgress(false);
      setShowMistakes(false);
    } else {
      setShowMaterials(false);
      setShowProgress(false);
      setShowMistakes(false);
    }
  };

  const renderMainContent = () => {
    if (showMistakes) {
      return <MistakeJournal mistakes={sampleMistakes} onReview={handleReviewMistake} />;
    }

    if (selectedCourse) {
      if (showProgress) {
        return <CourseProgress course={selectedCourse}/>;
        // return <CourseProgress course={selectedCourse} onBack={() => setShowProgress(false)} />;
      }
      if (showMaterials) {
        return <CourseWorkspace key={selectedCourse.id} course={selectedCourse} />;
      }
    }

    return (
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
    );
  };

  return (
    <Routes>
      <Route path="/doc" element={<DocSearch />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/achievements" element={
        <AppLayout onMistakesClick={handleMistakesClick}>
          <div className="flex">
            <CourseSidebar 
              selectedCourse={selectedCourse}
              onSelectCourse={handleSelectCourse}
              onViewProgress={handleViewProgress}
              onViewMaterials={handleViewMaterials}
              courses={courses}
              onAddCourse={handleAddCourse}
            />
            <div className="flex-1">
              <Achievements />
            </div>
          </div>
        </AppLayout>
      } />
      <Route path="/subscription" element={
        <AppLayout onMistakesClick={handleMistakesClick}>
          <div className="flex">
            <CourseSidebar 
              selectedCourse={selectedCourse}
              onSelectCourse={handleSelectCourse}
              onViewProgress={handleViewProgress}
              onViewMaterials={handleViewMaterials}
              courses={courses}
              onAddCourse={handleAddCourse}
            />
            <div className="flex-1">
              <Subscription />
            </div>
          </div>
        </AppLayout>
      } />
      <Route path="/" element={
        <AppLayout onMistakesClick={handleMistakesClick}>
          <div className="flex">
            <CourseSidebar 
              selectedCourse={selectedCourse}
              onSelectCourse={handleSelectCourse}
              onViewProgress={handleViewProgress}
              onViewMaterials={handleViewMaterials}
              courses={courses}
              onAddCourse={handleAddCourse}
            />
            <main className="flex-1">
              {renderMainContent()}
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