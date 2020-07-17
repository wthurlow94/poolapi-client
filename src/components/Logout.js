import React from 'react'
import { AuthContext, AuthConsumer } from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

export default function Logout() {
    const auth = React.useContext(AuthContext)

    var handleSubmit = (event) => {
        event.preventDefault();
        auth.logout();
    }

    return (
        
                        <form onSubmit={handleSubmit}>
                            <span className='formTextLogout'>Logout</span>
                            <button>Logout</button>

                        </form>
                    

           
    )
}