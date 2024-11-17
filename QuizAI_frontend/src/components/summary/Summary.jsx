// Summary.jsx
import React, { useState, useEffect } from 'react';
import NavigationBar from '../navigationBar/NavigationBar.jsx';
import useTokenValidation from '../../hooks/useTokenValidation';
import axios from 'axios';
import './Summary.css';

const Summary = () => {
    useTokenValidation();

    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const summary = localStorage.getItem('summary');
        if (summary) {
            setSummary(summary);
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

    const handleSummarize = async () => {
        try {
            setLoading(true);
            setError(null);

            const pageContent = await getCurrentPageContent();
            const summaryResponse = await axios.post(`http://localhost:3000/api/summary`, {
                webContent: pageContent
            });
            setSummary(summaryResponse.data.summary);
            localStorage.setItem('summary', summaryResponse.data.summary);
        } catch (err) {
            setError(err.message || 'Failed to generate summary');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavigationBar />
            <div className="summary-container">
                <h1 className="summary-title">Summary</h1>
                <button
                    className="summarize-button"
                    onClick={handleSummarize}
                    disabled={loading}
                >
                    {loading ? 'Summarizing...' : 'Summarize'}
                </button>
                {error && <p className="error-text">{error}</p>}
                {summary && <div className="summary-content">{summary}</div>}
            </div>
        </>
    );
};

export default Summary;
