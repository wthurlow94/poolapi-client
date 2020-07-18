import React from 'react'

export const AuthContext = React.createContext({
         isAuth: false,
         login: (email, password) => {},
         logout: () => {},
         user: {},
         getUser: () => {}
});