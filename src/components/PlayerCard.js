import React from 'react';

import { Card, ListGroup } from 'react-bootstrap'

export default function PlayerCard(props) {


    return (
        <Card>
            <Card.Title>
            {props.player.email}
            </Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>{props.player.elo}</ListGroup.Item>
            </ListGroup>
        </Card>
    );


}