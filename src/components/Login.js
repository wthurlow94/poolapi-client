import React from 'react';
import { AuthContext } from '../context/AuthContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const auth = React.useContext(AuthContext)
    var handleSubmit = (event) => {
        event.preventDefault();
        auth.login(email, password)

    };


    return (
        <Container>
            
            <Row className="justify-content-md-center">
                <Col>
                    <span>Login</span>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='loginFormEmail'>
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                        </Form.Group>
                        <Form.Group controlId="loginFormPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                         </Button>
                    </Form>
                </Col>
            </Row>
        </Container>


    )


    // return (
        
    //             <div>
    //                 <form onSubmit={handleSubmit}>
    //                     <span className='formTextLogin'>Login</span>
    //                     <br />
    //                     <input
    //                         type='text'
    //                         placeholder='Enter email'
    //                         value={email}
    //                         onChange={(event) => { setEmail(event.target.value) }} />
    //                     <br />
    //                     <input
    //                         type='password'
    //                         placeholder='Enter password'
    //                         value={password}
    //                         onChange={(event) => { setPassword(event.target.value) }} />
    //                     <br />
    //                     <button>Submit</button>
    //                 </form>
    //             </div>
                
            
    // )
}


export default Login;