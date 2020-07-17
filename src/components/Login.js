import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom'    
import { AuthContext, AuthProvider, AuthConsumer } from '../context/AuthContext'
function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const auth = React.useContext(AuthContext)
    var handleSubmit = (event) => {
        event.preventDefault();
        auth.login(email, password)

    };

    return (
        
                <div>
                    <form onSubmit={handleSubmit}>
                        <span className='formTextLogin'>Login</span>
                        <br />
                        <input
                            type='text'
                            placeholder='Enter email'
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }} />
                        <br />
                        <input
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }} />
                        <br />
                        <button>Submit</button>
                    </form>
                </div>
                
            
    )
}


export default Login;