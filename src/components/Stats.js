import React, { useEffect } from 'react'
import { Jumbotron, Badge, Container, Col, Row, Table } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
 

export default function Stats() {
    const [users,setUsers] = React.useState([]);
    const [matches,setMatches] = React.useState([]);
    const auth = React.useContext(AuthContext);
    var user = auth.getUser();

    // Which stats do we want? Number of Matches, Number of Wins, Score, Ranking
    
    useEffect(() => {
        const getUsers = async () => {
            const result = await axios.get('http://localhost:8001/users', {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            setUsers(result.data.users);

        }
        getUsers();

        const getMatches = async () => {
            const result = await axios.get('http://localhost:8001/matches', {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            setMatches(result.data.matches)

        }

        getMatches()


    }, [user._id]);


   
    var numberOfMatches = matches.filter((match) => match.playerOne._id === user._id || match.playerTwo._id === user._id).length;
    console.log(matches.filter((match) => match.winner._id == user._id))
    var numberOfWins = matches.filter((match) => match.winner._id == user._id).length;
    
    var rankings = users.sort((a,b)=> {return b.elo - a.elo}).map((user, idx) => {
       return <tr key={user._id}>
            <td>{idx + 1}</td>
            <td>{user.email}</td>
            <td>{user.elo}</td>
            <td>To Do</td>
        </tr>
    })
    return (
        <Container>

            <Row>
                <Col>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>{user.email}</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>
                                        Number of Matches <Badge variant="primary">{numberOfMatches}</Badge>
                                    </span>
                                </Col>

                                <Col>
                                    <span>
                                        Number of Wins <Badge variant="primary">{numberOfWins}</Badge>
                                    </span>
                                </Col>
                                <Col>
                                    <span>
                                        ELO <Badge variant="primary">{user.elo}</Badge>
                                    </span>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Leaderboard</h2>
                    <Table striped bordered hover responsive='sm'>
                    <thead>
                    <tr>
                        <th>
                            Rank
                    </th>
                        <th>
                            Player
                    </th>
                        <th>
                            Score
                    </th>
                        <th>
                            Matches Played
                    </th>
                    </tr>
                </thead>
                <tbody>
                    { rankings }
                </tbody>
                    </Table>
                </Col>


            </Row>


        </Container>


    )
}