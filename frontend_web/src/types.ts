export interface Course {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  materials: StudyMaterial[];
  quizzes: Quiz[];
}

export interface QuizPrompt {
  format: 'multiple-choice' | 'true-false' | 'short-answer';
  questionCount: number;
  studyGuide: string;
  selectedMaterials: string[];
  sampleQuestions?: string;
  timeLimit?: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  prompt: QuizPrompt;
  questions: Question[];
  createdAt: Date;
  status: 'generating' | 'ready' | 'failed';
  attempted?: boolean;
  score?: number;
}

export interface Question {
  id: string;
  questions: string;
  choices: string[];
  correctAnswer: string;
  explanation?: string;
  isCorrect?: boolean;
  userAnswer?: number;
}

export interface StudyMaterial {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: 'processing' | 'ready' | 'failed';
}

export interface MistakeEntry {
  id: string;
  quizId: string;
  courseId: string;
  questionId: string;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  explanation: string;
  dateAdded: Date;
  reviewed: boolean;
}