import React from 'react';
import { Alert } from 'react-bootstrap'
import { ErrorContext } from '../context/ErrorContext'

export default function ErrorNotification(props) {
    const [error,setError] = React.useContext(ErrorContext)

    return (
       
                <Alert variant='danger'  onClose={() => {setError(null)}} dismissible='true'>
                    <Alert.Heading>{error.status}</Alert.Heading>
                    {error.message}
                    </Alert>
    )


}