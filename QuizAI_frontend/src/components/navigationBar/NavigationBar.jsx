import React from 'react';
import './NavigationBar.css';
import { useNavigate } from 'react-router-dom';

 

function NavigationBar() {
    const navigate = useNavigate();
    return (
        <nav className="navigation-bar">
        <ul className="nav-list">
            <li className="nav-item" onClick = {()=>navigate('/summary')}>AI Summary</li>
            <li className="nav-item" onClick = {()=>navigate('/quiz')}>AI Quiz</li>            
            <li className="nav-item" onClick = {()=>navigate('/chatbot')}>Chatbot</li>
            <li className="nav-item" onClick = {()=>navigate('/profile')}>Profile</li>
        </ul>
        </nav>
    );

}

export default NavigationBar;
