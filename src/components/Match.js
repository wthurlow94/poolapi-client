import React from 'react'


export default function Match (props) {

    return (
        <div>
        <p>{props.location.state.match.playerOne.email}</p>
        <p>{props.location.state.match.playerTwo.email}</p>
        </div>
    );
}