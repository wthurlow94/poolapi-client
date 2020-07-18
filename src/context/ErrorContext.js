import React from 'react'

//export const ErrorContext = React.createContext();

export const ErrorContext = React.createContext([
    null,
    (message,status) => {}
]
);




// class ErrorProvider extends React.Component {
//     state = {
//         error: null,
//         setError: (message, status) => {},
//         removeError: () => {}
//     }

//     constructor(){
//         super()
//         this.setError = this.setError.bind(this)
//         this.removeError = this.removeError.bind(this)
        
//     }


//     setError (message,status ) {
//       this.setState({error: {message,status}})
//     }

//     removeError () {
//         this.setState({error: null})
//     }
    
//     render() {
//         return (
//             <ErrorContext.Provider
//               value={{
//                 error: this.state.error,
//                 setError: this.setError,
//                 removeError: this.removeError
               
//               }}
//             >
//               {this.props.children}
//             </ErrorContext.Provider>
//           )


//     }

// }


// const ErrorConsumer = ErrorContext.Consumer;

// export { ErrorProvider, ErrorConsumer }
