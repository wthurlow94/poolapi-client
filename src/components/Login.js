import  React, { Component, useState } from 'react';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    var handleSubmit = (event) => {
        event.preventDefault();

        //validate/sanitise input (is email an email. does password meet criteria)

        // If not display an error in the error header

        axios.post('http://localhost:8001/auth/login', {email: email, password: password})
            .then((response)=>{
                console.log(response);
                //Navigate to login screen
            })
            .catch((error) => {
                console.log(error.toJSON());
                // Display an Error Message?
            })
        
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <span className='formTextLogin'>Login</span>
                <br/>
                <input 
                    type='text' 
                    placeholder='Enter email' 
                    value={email} 
                    onChange={(event) => {setEmail(event.target.value)}}/>
                <br/>
                <input 
                    type='password' 
                    placeholder='Enter password' 
                    value={password} 
                    onChange={(event) => {setPassword(event.target.value)}}/>
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
    }


export default Login;