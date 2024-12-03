// QuizPage.jsx
import React, { useState, useEffect } from 'react';
import NavigationBar from '../navigationBar/NavigationBar.jsx';
import useTokenValidation from '../../hooks/useTokenValidation';
import axios from 'axios';
import './QuizPage.css';

const QuizPage = () => {
    useTokenValidation();

    const [quiz, setQuiz] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // cached quiz
    useEffect(() => {
        const quiz = localStorage.getItem('quiz');
        if (quiz) {
            setQuiz(quiz);
        }
    }, []);

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

            const pageContent = await getCurrentPageContent();
            const quizResponse = await axios.post(`http://localhost:3000/api/quiz`, {
                webContent: pageContent
            });
            console.log("quiz generated: \n", quizResponse)
            setQuiz(quizResponse.data.quiz);
            localStorage.setItem('quiz', quizResponse.data.quiz);
        } catch (err) {
            setError(err.message || 'Failed to generate quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavigationBar />
            <div className="quiz-container">
                <h1 className="quiz-title">Quiz</h1>
                <button
                    className="quiz-button"
                    onClick={handleQuiz}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Quiz'}
                </button>
                {error && <p className="error-text">{error}</p>}
                {quiz && <div className="Quiz-content"><Quiz questions={quiz}/></div>}
            </div>
        </>
    );
};

export default QuizPage;
