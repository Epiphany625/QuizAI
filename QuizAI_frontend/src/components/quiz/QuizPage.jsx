// QuizPage.jsx
import React, { useState, useEffect } from 'react';
import NavigationBar from '../navigationBar/NavigationBar.jsx';
import useTokenValidation from '../../hooks/useTokenValidation';
import axios from 'axios';
import Quiz from './Quiz.tsx';
import './QuizPage.css';
import './Quiz.css';
import sampleQuestions from './Question.ts'

const QuizPage = () => {
    useTokenValidation();

    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // cached quiz
    // useEffect(() => {
    //     const cachedQuiz = localStorage.getItem('quiz');
    //     if (cachedQuiz) {
    //         setQuiz(JSON.parse(cachedQuiz));
    //     }
    // }, []);


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

    const handleQuiz = async () => {

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
            const quizResponse = await axios.post(`http://localhost:3000/api/quiz`, {
                content: pageContent,
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
                    <button
                        className="generate-quiz-button"
                        onClick={handleQuiz}
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