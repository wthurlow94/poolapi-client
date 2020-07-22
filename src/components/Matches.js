import React, { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { ErrorContext } from '../context/ErrorContext';


export default function Matches() {
    const [matches, setMatches] = React.useState([]);
    const [error,setError] = React.useContext(ErrorContext)
    const auth = React.useContext(AuthContext);
    var user = auth.getUser();

    useEffect(() => {
        const getMatches = async () => {
            const result = await axios.get('http://localhost:8001/matches?playerOne=' + user._id + '&playerTwo=' + user._id, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .catch((errorMsg) => {
                console.log(errorMsg);
                //setError({message: errorMsg.response.data.message, 
                 //   status: errorMsg.response.status})

                   // if(errorMsg.response.status === 401){
                        
                   //         auth.logout();
                    //}
                
            })

            setMatches(result.data.matches);

        }
        getMatches();
    }, [user._id, auth, setError]);

    const rows = matches.map(match => {

        var started = new Date(match.started).toUTCString();
        var resulted = '';
        var opponent = '';
        var winner = ''
        if (match.playerOne._id === user._id) {
            opponent = match.playerTwo.email
        } else {
            opponent = match.playerOne.email
        }

        console.log(match.winner);
        if (match.winner !== undefined) {
           
            winner = match.winner.email
        } else {
            winner = 'Match Voided'
        }
        


        if (match.resulted) {
            resulted = new Date(match.resulted).toUTCString();
        }

        return (
            <tr key={match._id}>
                <td>
                   <Link to={{pathname: '/matches/'+match._id,state: {match:match}}}> {started} </Link>
                    </td>
                <td>{opponent}</td>
                <td>{resulted}</td>
                <td>{winner}</td>
            </tr>
        )
    })



    return (

        <div>
            <h3>Matches for {user.email}</h3>
            <Table striped bordered hover responsive='sm'>
                <thead>
                    <tr>
                        <th>
                            Date Started
                    </th>
                        <th>
                            Opponent
                    </th>
                        <th>
                            Date Resulted
                    </th>
                        <th>
                            Winner
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>

    );
}