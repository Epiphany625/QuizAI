import {useState} from 'react'
import './Landing.css'

const Landing = () => {

    const [signupDisplay, setSignUpDisplay] = useState('none')
    const [loginDisplay, setLoginDisplay] = useState('block')

    const chooseSignUp = () => {
        setSignUpDisplay('block');
        setLoginDisplay('none');
    }

    const chooseLogin = () => {
        setSignUpDisplay('none');
        setLoginDisplay('block');
    }

    const handleLogin = (event) => {
        event.preventDefault();
    }

    const handleSignUp = (event) => {
        event.preventDefault();
    }

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
                    <form className="signup-form" style={{display: signupDisplay}} onSubmit={handleSignUp}>
                        <div className="field">
                            <label htmlFor="signup-email">Email: </label>
                            <input id="signup-email" className="user-input" type="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="signup-password">Password: </label>
                            <input id="signup-password" className="user-input" type="password" />
                        </div>
                        <div className="field">
                            <label htmlFor="signup-confirmPassword">Confirm Password: </label>
                            <input id="signup-confirmPassword" className="user-input" type="password" />
                        </div>
                        <div style={{paddingTop: "10px"}}>
                            <button>Sign up</button>
                        </div>
                    </form>

                    <form className="login-form" style={{display: loginDisplay}} onSubmit={handleLogin}>
                        <div className="field">
                            <label htmlFor="login-email">Email: </label>
                            <input id="login-email" type="email" className="user-input" />
                        </div>
                        <div className="field">
                            <label htmlFor="login-password">Password: </label>
                            <input id="login-password" type="password" className="user-input" />
                        </div>
                        <div style={{paddingTop: "10px"}}>
                            <button>Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Landing; 