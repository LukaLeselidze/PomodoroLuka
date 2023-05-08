import React from 'react'
import './SignIn.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignIn() {
    const navigate = useNavigate()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorNotif, setErrorNotif] = useState(false);

    const handleLogin = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
        const matchingUser = storedUsers.find((user) => user.username === username && user.password === password)



        if (matchingUser) {
            navigate('/home')
        } else {
            setErrorNotif(true)
        }
    }

    const navigateHandler = () => {
        navigate('/signup')
    }

    return (
        <div className='sign_in_overlay'>
            <h1 className='text'>Sign In Page</h1>
            <div className='main_container'>
                <div className='container'>
                    {errorNotif && <h1 className='incorrect'>Username or Password is not correct</h1>}
                    <div className='sign_in_form'>
                        <h1 className='google_text'>Login with Google</h1>
                        <div className='or'>
                            <div className='left_or'></div>
                            <div className='or_text'><p>or</p></div>
                            <div className='right_or'></div>
                        </div>
                        <div className='inputs'>
                            <h2>UserName</h2>
                            <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} placeholder=''></input>
                            <h2>Password</h2>
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder=''></input>
                            <button onClick={handleLogin} className='log_in'>Log in with Username</button>
                            <button className='forgot_password'>Forgot Password</button>
                        </div>
                    </div>
                    <div className='create_account'>
                        <div>
                            <h1>do not you have an account?</h1>
                        </div>
                        <div>
                            <button onClick={navigateHandler}>Create account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn