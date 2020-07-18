import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { Button, Container, Col, Form, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

export default function CreateMatch() {
    const [opponents, setOpponents] = React.useState([])
    const [selectedOpponent, setSelectedOpponent] = React.useState('{}');
    const [match, setMatch] = React.useState('{}')

    const auth = React.useContext(AuthContext);
    var user = auth.getUser();

     React.useEffect(() => {
        const getOpponents = async () => {
            const result = await Axios.get('http://localhost:8001/users', {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const users = result.data.users.filter(element => element._id !==  user._id)
            setOpponents(users);    
        }
        getOpponents();
     }, [user._id])



     var handleStartMatchClick = (event) => {
         event.preventDefault();
         let data = {
            playerOne: user._id,
            playerTwo: selectedOpponent._id 
         }
         console.log(data);
        Axios.post('http://localhost:8001/matches',data,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }},)
         .then(response => {
            console.log(response);
            setMatch(response.data.match)
         })
         .catch( error => {
            console.log(error.response)
         }
         )



     }


    var handleChange = (event) => {
        event.preventDefault();
        if(event.target.value === 0){
            setSelectedOpponent('{}')
        }else {
        setSelectedOpponent(opponents.filter(opponent => 
            opponent._id === event.target.value
        )[0])
        }
    };
    const opponentsOptions = opponents.map(opponent => {
        return(
            <option key={opponent._id} value={opponent._id}>{opponent.email}</option>
        )
    });



    return (
            <div>
            {match === '{}' || match === undefined ? (
            <Container>

            <Row>
                <Col>
                    <h3>New Match</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form >
                        <Form.Group controlId="formOpponentSelect">
                            <Form.Control as="select" onChange={handleChange}>
                            <option value="0">Select Opponent...</option>
                                {opponentsOptions}
                            </Form.Control>
                        </Form.Group>
                    </Form>

                </Col>
            </Row>
            <Row>


                <Col>
                    {user.email}

                </Col>
                <Col>

                    {selectedOpponent === '{}' || selectedOpponent === undefined ? (
                        <p>No opponent Selected</p>

                    ) : (
                            <p>{selectedOpponent.email}</p>
                        )}



                </Col>



            </Row>
            <Row>
                <Col>
                    <Button disabled={selectedOpponent === '{}' || selectedOpponent === undefined ? true : false } onClick={handleStartMatchClick}>Start Match</Button>
                </Col>
            </Row>
            
        </Container>
        ) : (<Redirect to={{pathname: '/matches/'+match._id,
                            state: {match: match}}} />)}
        </div>
        
    )

}