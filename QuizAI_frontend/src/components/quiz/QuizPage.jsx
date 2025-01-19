// QuizPage.jsx
import React, { useState, useEffect } from 'react';
import NavigationBar from '../navigationBar/NavigationBar.jsx';
import useTokenValidation from '../../hooks/useTokenValidation';
import axios from 'axios';
import Quiz from './Quiz.tsx';
import './Quiz.css';

const QuizPage = () => {
    useTokenValidation();

    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null);
    // cached quiz
    // useEffect(() => {
    //     const cachedQuiz = localStorage.getItem('quiz');
    //     if (cachedQuiz) {
    //         setQuiz(JSON.parse(cachedQuiz));
    //     }
    // }, []);

    // get the courses based on the user
    useEffect(() => {
        const fetchCourses = async () => {
            const email = localStorage.getItem('email');
            console.log(`get courses for ${email}`);
            if (email) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/course/getCourses/${email}`);
                    console.log(response.data);

                    // Assuming `response.data` is an array of course objects
                    const courseNames = response.data.map(course => course.name);
                    console.log(courseNames);

                    setCourses(courseNames);
                } catch (err) {
                    console.error("Error fetching courses:", err);
                }
            }
        };

        fetchCourses();
    }, []); // Empty dependency array ensures the effect runs only once on mount


    // used when the user selects a course
    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    }

    const getCurrentPageContent = async () => {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const activeTab = tabs[0];
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    function: () => {
                        // Get the main content of the page
                        const content = document.body.innerText;
                        return content;
                    }
                }, (results) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(results[0].result);
                    }
                });
            });
        });
    };

    // get the url
    const getCurrentTabUrl = async () => {
        try {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab && tab.url) {
            return tab.url;
          } else {
            return "none"
          }
        } catch (error) {
          console.error("Error fetching URL:", error);
          setCurrentUrl("Error fetching URL.");
        }
      };

    // triggered when the user clicks the generate quiz button
    const handleQuizGeneration = async () => {

        const email = localStorage.getItem('email');
        if(!email){
            setError("Please quit and login again to generate a quiz");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // update the summary count
            // const userEmail = localStorage.getItem('email');
            // await axios.patch(`http://localhost:3000/api/user/${userEmail}/quiz`);
            console.log(quiz);
            console.log("quiz starting to be generated...");
            const pageContent = await getCurrentPageContent();
            console.log(pageContent);

            // get the url
            const url = await getCurrentTabUrl();
            console.log(url);

            // send a post request
            
            const quizResponse = await axios.post(`http://localhost:3000/api/quiz`, {
                content: pageContent,
                course: selectedCourse,
                url: url,
                // numQuestions: 5,
                // questionType: 'short-answer'
            });
            console.log("quiz generated: \n", quizResponse)
            console.log('Quiz data:', quizResponse.data.quiz);
            setQuiz(quizResponse.data.quiz);
            // localStorage.setItem('quiz', JSON.stringify(quizResponse.data.quiz));
        } catch (err) {
            setError(err.message || 'Failed to generate quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        quiz.length > 0 ? (
            <Quiz questions={quiz} />
        ) : (
            <>
                <NavigationBar />
                <div className="quiz-page-container">
                    <h1 className="quiz-title">Quiz</h1>

                    {/* Allow the user to select from a course (selecting a course is optional for the user) */}
                    <form className="course-form">
                        <label htmlFor="course-select"><h2 className="quiz-subtitle">Select a course:</h2></label><br></br>
                        {courses.map((course) => (
                            <div><label><input key={course} type="radio" name="course" value={course} onChange={handleCourseChange}/>{course}</label></div>
                        ))}
                    </form>
                    {selectedCourse && <p className="selected-course-text">Selected course: {selectedCourse}</p>}   

                    <h2 className="quiz-subtitle">Or: Continue to generate quiz without saving to a course</h2>
                    <button
                        className="generate-quiz-button"
                        onClick={handleQuizGeneration}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Quiz'}
                    </button>
                    {error && <p className="error-text">{error}</p >}
                </div>
            </>
        )
    );
};

export default QuizPage;