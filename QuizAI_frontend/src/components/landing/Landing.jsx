import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    // Hooks
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
    // manage react router
    const navigation = useNavigate();

    // track if user entered invalid login credentials, or other error messages
    const [errorMessage, setErrorMessage] = useState(''); // Track login error message

    // functions
    // Display selection handlers
    const chooseSignUp = () => {
        setSignUpDisplay('block');
        setLoginDisplay('none');
        setErrorMessage('');
    };

    const chooseLogin = () => {
        setSignUpDisplay('none');
        setLoginDisplay('block');
        setErrorMessage('');
    };

    // Handle login form submission
    const handleLogin = async (event) => {
        event.preventDefault();
        
        // Form validation
        if (email.length <= 5) {
            setErrorMessage("Email should have at least 6 characters");
            return; 
        }

        if(password.length < 8) {
            setErrorMessage("Password should have at least 8 characters");
            return;            
        }

        const data = { "email": email, "password": password };

        try {
            let response = await fetch("http://localhost:3000/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                response = await response.json();
                console.log(response);
                navigation('/summary');
            } else {
                setErrorMessage('Invalid Email / login credentials');
                console.log(response.statusText);
            }
        } catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong. Please try again later.');
        }
    };

    // Handle signup form submission
    const handleSignUp = async (event) => {
        event.preventDefault();
        
        // Form validation
        if (email.length <= 5) {
            setErrorMessage("Email should be at least 6 characters");
            return; 
        }
        if(password.length < 8) {
            setErrorMessage("Password should be at least 8 characters");
            return;            
        }
        if(password != confirmPassword) {
            setErrorMessage("Passwords do not match");
            console.log("Passwords do not match");
            return;   
        }

        const data = { "email": email, "password": password };

        try {
            let response = await fetch("http://localhost:3000/register", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                response = await response.json();
                console.log(response);
                navigation('/summary');
            } else {
                setErrorMessage("Email already registered. Please sign in. ")
                console.log(response.statusText);
            }
        } catch (err) {
            setErrorMessage('Something went wrong. Please try again later.')
            console.log(err);
        }
    };

    return (
        <div className="landing-container">
            <div className='landing'>
                <div className='title'>
                    <h1>QuizAI</h1>
                    <h4>Empower your learning journey with <i>Gemini AI</i></h4>
                </div>
                
                <div className='forms'>
                    <div className='form-selection'>
                        <button 
                            onClick={chooseSignUp} 
                            className={signupDisplay === "block" ? 'active-button' : ''}
                        >
                            Sign Up
                        </button>
                        <button 
                            onClick={chooseLogin} 
                            className={loginDisplay === "block" ? 'active-button' : ''}
                        >
                            Log In
                        </button>
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

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="error-message">
                                    {errorMessage}
                                </div>
                            )}
                            
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

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="error-message">
                                    {errorMessage}
                                </div>
                            )}
                            
                            <div style={{ paddingTop: "10px" }}>
                                <button ref={loginButton}>Log In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
