import React from 'react'
import axios from 'axios'

export const AuthContext = React.createContext();




class AuthProvider extends React.Component {
    state = {
        isAuth: false,
        login: (email, password) => {},
        logout: () => {}
    }

    constructor(){
        super()
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }


    login (email,password) {

            axios.post('http://localhost:8001/auth/login', {email: email, password: password})
                    .then((response)=>{
                        console.log(this.state.isAuth)
                        console.log(response);
                        this.setState({isAuth: true})
                        console.log(this.state.isAuth)
                        //Navigate to login screen
                    })
                    .catch((error) => {
                        console.log(error.response);
                        // Display an Error Message?
                    })
          
    }


    logout () {
        this.setState({isAuth: false})
    }
    render() {
        return (
            <AuthContext.Provider
              value={{
                isAuth: this.state.isAuth,
                login: this.login,
                logout: this.logout
              }}
            >
              {this.props.children}
            </AuthContext.Provider>
          )


    }

}


const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer }
