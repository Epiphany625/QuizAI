import { useState, useRef } from 'react';
import './Landing.css';

const Landing = () => {
    // Manage signup/login display
    const [signupDisplay, setSignUpDisplay] = useState('none');
    const [loginDisplay, setLoginDisplay] = useState('block');
    
    // Manage form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // Manage the styles of signup/login button
    const signUpButton = useRef();
    const loginButton = useRef();

    // Display selection handlers
    const chooseSignUp = () => {
        setSignUpDisplay('block');
        setLoginDisplay('none');
    };

    const chooseLogin = () => {
        setSignUpDisplay('none');
        setLoginDisplay('block');
    };

    // Validation function for email and password length
    const lengthValidation = () => {
        return email.length > 5 && password.length >= 8;
    };

    // Handle login form submission
    const handleLogin = (event) => {
        event.preventDefault();
        if (!lengthValidation()) {
            loginButton.current.style.backgroundColor = "red";
        }
    };

    // Handle signup form submission
    const handleSignUp = (event) => {
        event.preventDefault();
        if (!lengthValidation() || confirmPassword !== password) {
            signUpButton.current.style.backgroundColor = "red";
        }
    };

    return (
        <div className='landing'>
            <div className='title'>
                <h1>QuizAI</h1>
                <h4>Empower your learning journey with <i>Gemini AI</i></h4>
            </div>
            
            <div className='forms'>
                <div className='form-selection'>
                    <button onClick={chooseSignUp}>Sign Up</button>
                    <button onClick={chooseLogin}>Log In</button>
                </div>
                
                <div id="signup-login-form">
                    <form 
                        className="signup-form" 
                        style={{ display: signupDisplay }} 
                        onSubmit={handleSignUp}
                    >
                        <div className="field">
                            <label htmlFor="signup-email">Email: </label>
                            <input 
                                id="signup-email" 
                                className="user-input" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        
                        <div className="field">
                            <label htmlFor="signup-password">Password: </label>
                            <input 
                                id="signup-password" 
                                className="user-input" 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        
                        <div className="field">
                            <label htmlFor="signup-confirmPassword">Confirm Password: </label>
                            <input 
                                id="signup-confirmPassword" 
                                className="user-input" 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                        </div>
                        
                        <div style={{ paddingTop: "10px" }}>
                            <button ref={signUpButton}>Sign Up</button>
                        </div>
                    </form>

                    <form 
                        className="login-form" 
                        style={{ display: loginDisplay }} 
                        onSubmit={handleLogin}
                    >
                        <div className="field">
                            <label htmlFor="login-email">Email: </label>
                            <input 
                                id="login-email" 
                                type="email" 
                                className="user-input" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        
                        <div className="field">
                            <label htmlFor="login-password">Password: </label>
                            <input 
                                id="login-password" 
                                type="password" 
                                className="user-input" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        
                        <div style={{ paddingTop: "10px" }}>
                            <button ref={loginButton}>Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Landing;
