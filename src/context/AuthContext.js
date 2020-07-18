import React from 'react'
import axios from 'axios'

export const AuthContext = React.createContext();




class AuthProvider extends React.Component {
    state = {
        isAuth: false,
        login: (email, password) => {},
        logout: () => {},
        user: {},
        getUser: () => {}
    }

    constructor(){
        super()
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.getUser = this.getUser.bind(this)
    }


    getUser () {
      return this.state.user;
    }

    login (email,password) {

            axios.post('http://localhost:8001/auth/login', {email: email, password: password})
                    .then((response)=>{
                        console.log(response)
                        this.setState({user: response.data.user})
                        this.setState({isAuth: true})
                        localStorage.setItem('token', response.data.token)
                       
                    })
                    .catch((error) => {
                        console.log(error.response);
                        // Display an Error Message?
                    })
          
    }


    logout () {
        this.setState({isAuth: false})
        localStorage.removeItem('token');
        this.setState({user: {}})
    }
    
    render() {
        return (
            <AuthContext.Provider
              value={{
                isAuth: this.state.isAuth,
                login: this.login,
                logout: this.logout,
                user: this.state.user,
                getUser: this.getUser
              }}
            >
              {this.props.children}
            </AuthContext.Provider>
          )


    }

}


const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer }
