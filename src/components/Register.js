import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { ErrorContext } from '../context/ErrorContext'
function Register() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [registrationComplete, setRegistrationComplete] = React.useState(false);

    const [error, setError] = React.useContext(ErrorContext)



    var handleSubmit = (event) => {
        event.preventDefault();
        //validate/sanitise input (is email an email. does password meet criteria)

        // If not display an error in the error header

        axios.post('http://localhost:8001/auth/register', { email: email, password: password })
            .then((response) => {
                console.log(response);
                //Navigate to login screen
                setRegistrationComplete(true);
                setError(null);
            })
            .catch((errorMsg) => {
                // Display an Error Message?
                if (errorMsg.response === undefined) {
                    setError({
                        message: 'Service is currently down',
                        status: 503
                    })
                } else {
                    setError({
                        message: errorMsg.response.data.message,
                        status: errorMsg.response.status
                    })
                }
            })

    };




    return (
        registrationComplete ? (<Redirect to='/login' />) : (
            <Container>

                <Row className="justify-content-md-center">
                    <Col>
                        <span>Register</span>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='registerFormEmail'>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                            </Form.Group>
                            <Form.Group controlId="registerFormPassword">
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                            </Form.Group>
                            <Button disabled={email === '' || password === '' ? true : false} variant="primary" type="submit">
                                Register
                         </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )

    )
}


export default Register;