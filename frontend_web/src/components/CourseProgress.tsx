import React from 'react';
import type { Course } from '../types';

const CourseProgress = ({ course }: { course: Course }) => {
  return (
    <div>
      <h2>Course Progress</h2>
      <pre>{JSON.stringify(course, null, 2)}</pre> {/* Display course object properly */}
    </div>
  );
};

export default CourseProgress;