import React from 'react'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import Axios from 'axios';


export default function Match(props) {
    const [match, setMatch] = React.useState(props.location.state.match)
    const [winner, setWinner] = React.useState('')
    const [resulted, setResulted] = React.useState(false)

    var handleSubmit = (event) => {
        event.preventDefault();

        Axios.patch('http://localhost:8001/matches/' + match._id, { winner: winner }, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response);
                setMatch(response.data.result.match)
                setResulted(true);
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    var handleChange = (event) => {
        event.preventDefault();
        if (event.target.value === '-1') {
            setWinner('')
        } else {
            setWinner(event.target.value);
        }
    }
  
    return (
        <div>
                <Container>
                    <Row>
                        <Col>
                            <h3>Match</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {match.playerOne.email}
                        </Col>
                        <Col>
                            {match.playerTwo.email}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {match.winner === undefined ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formWinnerSelect">
                                        <Form.Control as='select' onChange={handleChange}>
                                            <option value='-1'>Select Winner...</option>
                                            {/* <option value='void'>VOID</option> */}
                                            <option value={match.playerOne._id}>{match.playerOne.email}</option>
                                            <option value={match.playerTwo._id}>{match.playerTwo.email}</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button disabled={winner === '' ? true : false} type='submit'> Result Match</Button>
                                </Form>
                            ) : (
                                    <h1> The Winner of this match was: {match.winner.email}</h1>
                                )
                            }
                        </Col>
                    </Row>

                </Container>
           
        </div>
    );
}