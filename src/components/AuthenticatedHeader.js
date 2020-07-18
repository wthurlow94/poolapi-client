import React from 'react';
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
export default function AuthenticatedHeader () {


    return (
        // <ul>
        //     <li>
        //         <Link to='/matches'>Matches</Link>
        //     </li>
        //     <li>
        //         <Link to='/logout'>Logout</Link>
        //     </li>
        // </ul>


        <Nav>
            <Nav.Link as={Link} to='/matches'>Matches</Nav.Link>
            <Nav.Link as={Link} to='/newmatch'>New Match</Nav.Link>
            <Nav.Link as={Link} to='/logout'>Logout</Nav.Link>
        </Nav>

    );
}