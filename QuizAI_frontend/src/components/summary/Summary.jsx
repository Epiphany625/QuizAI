// Summary.jsx
import React, { useState } from 'react';
import NavigationBar from '../navigationBar/NavigationBar.jsx';
import useTokenValidation from '../../hooks/useTokenValidation';
import './Summary.css';

const Summary = () => {
    useTokenValidation();

    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const summarizeContent = async (text) => {
    //     // Implement the summarization logic here
    //     // For now, let's simulate with a timeout
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             // Simple mock summarization
    //             resolve(text.substring(0, 500) + '...');
    //         }, 1000);
    //     });
    // };

    const handleSummarize = () => {
        // setLoading(true);
        // setError(null);

        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeContent' }, async (response) => {
        //         if (chrome.runtime.lastError || !response) {
        //             setError('Failed to communicate with content script.');
        //             setLoading(false);
        //             return;
        //         }
        //         const pageContent = response.content;
        //         try {
        //             const pageSummary = await summarizeContent(pageContent);
        //             setSummary(pageSummary);
        //         } catch (err) {
        //             setError('Failed to generate summary.');
        //         }
        //         setLoading(false);
        //     });
        // });
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
