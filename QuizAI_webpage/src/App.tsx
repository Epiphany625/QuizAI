import React, { useState } from 'react';
import { Header } from './components/Header';
import { CourseWorkspace } from './components/CourseWorkspace';
import { CourseSidebar } from './components/CourseSidebar';
import { CourseProgress } from './components/CourseProgress';
import { MistakeJournal } from './components/MistakeJournal';
import { CourseList } from './components/CourseList';
import type { Course } from './types';

function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMistakesClick={() => {
          setShowMistakes(true);
          setSelectedCourse(null);
          setShowProgress(false);
          setShowMaterials(false);
        }}
        showBackButton={false}
        onBack={() => {}}
      />
      <div className="flex">
        <CourseSidebar 
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
          onViewProgress={handleViewProgress}
          onViewMaterials={handleViewMaterials}
        />
        <main className="flex-1">
          {showMistakes ? (
            <MistakeJournal onBack={() => setShowMistakes(false)} mistakes={[]} />
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
    </div>
  );
}

export default App;