import React from 'react';
import axios from 'axios';

import { Form, Button, Container, Row, Col } from 'react-bootstrap'

function Register() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    var handleSubmit = (event) => {
        event.preventDefault();
        //validate/sanitise input (is email an email. does password meet criteria)

        // If not display an error in the error header

        axios.post('http://localhost:8001/auth/register', { email: email, password: password })
            .then((response) => {
                console.log(response);
                //Navigate to login screen
            })
            .catch((error) => {
                console.log(error.toJSON());
                // Display an Error Message?
            })

    };




    return (
        <Container>
            
            <Row className="justify-content-md-center">
                <Col>
                    <span>Register</span>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='registerFormEmail'>
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                        </Form.Group>
                        <Form.Group controlId="registerFormPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                         </Button>
                    </Form>
                </Col>
            </Row>
        </Container>


    )

    // return (
    //     <div>
    //         <form onSubmit={handleSubmit}>
    //             <span className='formTextRegister'>Register</span>
    //             <br/>
    //             <input 
    //                 type='text' 
    //                 placeholder='Enter email' 
    //                 value={email} 
    //                 onChange={(event) => {setEmail(event.target.value)}}/>
    //             <br/>
    //             <input 
    //                 type='password' 
    //                 placeholder='Enter password' 
    //                 value={password} 
    //                 onChange={(event) => {setPassword(event.target.value)}}/>
    //             <br/>
    //             <button>Submit</button>
    //         </form>
    //     </div>
    // )
}


export default Register;