export interface Question {
  id: string;
  type: 'mcq' | 'true-false' | 'fill-blank' | 'short-answer';
  question: string;
  choices?: string[];
  correctAnswer: string;
  explanation?: string;
}

// export const sampleQuestions: Question[] = [
//   {
//     id: '1',
//     type: 'mcq',
//     question: 'What is the primary function of the Hypertext Transfer Protocol (HTTP)?',
//     choices: [
//       'To manage email communication',
//       'To transfer information between networked devices',
//       'To control hardware resources',
//       'To encrypt data for secure transmission'
//     ],
//     correctAnswer: 'To transfer information between networked devices',
//     explanation: 'HTTP is a protocol designed to enable communications between clients and servers, primarily used for transferring information across the web.'
//   },
//   {
//     id: '2',
//     type: 'true-false',
//     question: 'HTTP is a protocol used to load webpages using hypertext links.',
//     choices: ['True', 'False'],
//     correctAnswer: 'True',
//     explanation: ''
//   },
//   {
//     id: '3',
//     type: 'fill-blank',
//     question: 'An HTTP request contains a URL and an _____.',
//     correctAnswer: 'HTTP method',
//     explanation: 'Every HTTP request must contain both a URL (indicating the resource location) and an HTTP method (GET, POST, etc.) specifying the desired action.'
//   },
//   {
//     id: '4',
//     type: 'short-answer',
//     question: 'What are the five categories of HTTP status codes, and what do they generally indicate?',
//     correctAnswer: '1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error',
//     explanation: 'HTTP status codes are grouped into five categories, each serving a specific purpose in indicating the outcome of HTTP requests.'
//   }
// ];

// export default sampleQuestions;