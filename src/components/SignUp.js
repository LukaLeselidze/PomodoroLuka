import React from 'react'
import './SignUp.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp() {
    const navigate = useNavigate()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('');
    const [errorUp, setErrorUp] = useState('');


    const handleSignUp = () => {
        if (username.trim() === '' || password.trim() === '') {
            setErrorUp(true)
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = { username, password, id: Math.floor(Math.random() * 1000) }

        localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
        navigate('/')
    }

    function navigateHandler() {
        navigate('/')
    }

    return (
        <div className='sign_in_overlay'>
            <div className='main_container'>
                <div className='container'>
                    {errorUp && <h1 className='incorrect'>You have to fill Username and Password</h1>}
                    <div className='sign_up_form'>
                        <h1 className='google_text'>Sign Up on Pomodoro</h1>
                        <div className='or'>
                            <div className='left_or'></div>
                            <div className='or_text'><p>or</p></div>
                            <div className='right_or'></div>
                        </div>
                        <div className='inputs'>
                            <h2>Username</h2>
                            <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} placeholder='Luka123'></input>
                            <h2>Password</h2>
                            <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} placeholder=''></input>
                            <button onClick={handleSignUp} className='log_in'>Sign Up</button>

                        </div>
                    </div>
                    <div className='create_account'>
                        <div>
                            <h1>Already have an account?</h1>
                        </div>
                        <div>
                            <button onClick={navigateHandler}>Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp