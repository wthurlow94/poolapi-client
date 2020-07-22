import React from 'react'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import Axios from 'axios';
import {ErrorContext} from '../context/ErrorContext'


export default function Match(props) {
    const [match, setMatch] = React.useState(props.location.state ? props.location.state.match : 
        JSON.parse(localStorage.getItem('match')))
    const [winner, setWinner] = React.useState('')
    const [resulted, setResulted] = React.useState(false)
    const [error,setError] = React.useContext(ErrorContext)




    React.useEffect(() => {
        !props.location.state ? (setMatch(JSON.parse(localStorage.getItem('match')))) : (localStorage.setItem('match',JSON.stringify(props.location.state.match)))    
    
    }, [props.location.state])

    
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
            .catch(errorMsg => {
                setError(errorMsg)
            })
    }

    var handleChange = (event) => {
        event.preventDefault();

        switch(event.target.value) {
            case '-1': setWinner(''); break;
            case '0': setWinner(null);break;
            default: setWinner(event.target.value); break;
        }

      
    }
  
    console.log(match);

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
                            {match.resulted === undefined ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formWinnerSelect">
                                        <Form.Control as='select' onChange={handleChange}>
                                            <option value='-1'>Select Winner...</option>
                                            <option value='void'>Void Match</option>
                                            <option value={match.playerOne._id}>{match.playerOne.email}</option>
                                            <option value={match.playerTwo._id}>{match.playerTwo.email}</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button disabled={winner === '' ? true : false} type='submit'> Result Match</Button>
                                </Form>
                            ) : (
                                    <h1> {match.winner === undefined ? 'Match Voided' : 'The Winner of this match was: '+ match.winner.email}</h1>
                                )
                            }
                        </Col>
                    </Row>

                </Container>
           
        </div>
    );
}