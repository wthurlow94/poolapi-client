import  React, { Component, useState } from 'react';
import axios from 'axios';
import 'dotenv/config'

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    var handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8001/auth/register', {email: email, password: password})

        console.log(response);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <span className='formTextRegister'>Form</span>
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


export default Register;