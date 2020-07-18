import React from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Logout() {
    const auth = React.useContext(AuthContext)

    var handleSubmit = (event) => {
        event.preventDefault();
        auth.logout();
    }

    return (
        <form onSubmit={handleSubmit}>
            <span className='formTextLogout'>Logout</span>
            <br />
            <button>Logout</button>

        </form>

    )
}