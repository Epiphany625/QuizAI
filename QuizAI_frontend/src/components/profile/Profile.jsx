import { useState, useEffect } from 'react';
import NavigationBar from '../navigationBar/NavigationBar.jsx';
import useTokenValidation from '../../hooks/useTokenValidation';
import axios from 'axios';
import './profile.css';

const Profile = () => {
    useTokenValidation();
    const email = localStorage.getItem('email');
    const [userStats, setUserStats] = useState({
        quizCount: 0,
        chatbotCount: 0,
        summaryCount: 0,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // count the number of quizzes in all the courses
                let quizCount = 0;
                response.data.courses.forEach(course => {
                    quizCount += course.quizzes.length;
                });
                
                setUserStats({
                    quizCount: quizCount || 0,
                    chatbotCount: response.data.chatbotRequested || 0,
                    summaryCount: response.data.summaryRequested || 0,
                    loading: false,
                    error: null
                });

            } catch (error) {
                setUserStats(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to fetch user statistics'
                }));
                console.error('Error fetching user stats:', error);
            }
        };

        if (email) {
            fetchUserStats();
        }
    }, [email]);

    if (userStats.loading) {
        return (
            <>
                <NavigationBar />
                <div className="profile-container">
                    <div className="loading">Loading...</div>
                </div>
            </>
        );
    }

    if (userStats.error) {
        return (
            <>
                <NavigationBar />
                <div className="profile-container">
                    <div className="error">{userStats.error}</div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavigationBar />
            <div className="profile-container">
                <div className="profile-card">
                    <h1>User Profile</h1>
                    <div className="profile-info">
                        <div className="info-item">
                            <label>Email:</label>
                            <span>{email}</span>
                        </div>
                        <div className="info-item">
                            <label>Quizzes Generated:</label>
                            <span>{userStats.quizCount}</span>
                        </div>
                        <div className="info-item">
                            <label>Chatbots Created:</label>
                            <span>{userStats.chatbotCount}</span>
                        </div>
                        <div className="info-item">
                            <label>Summaries Generated:</label>
                            <span>{userStats.summaryCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile; 