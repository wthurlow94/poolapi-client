import React from 'react';
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
export default function UnauthenticatedHeader () {


    return (
        // <ul>
        //     <li>
        //         <Link to='/register'>Register</Link>
        //     </li>
        //     <li>
        //         <Link to='/login'>Login</Link>
        //     </li>
        // </ul>


        <Nav>   
            <Nav.Link as={Link} to='/register'>Register</Nav.Link>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>

        </Nav>
    );
}