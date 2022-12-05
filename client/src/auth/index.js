import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from './auth-request-api';

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER_ERROR: "LOGIN_USER_ERROR",
    REGISTER_USER_ERROR: "REGISTER_USER_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: 'Something went wrong...',
        modalActive: false,
    });
    const history = useHistory();

    // Initial call to see if the user has remember me checked in log in
    useEffect(() => {
        console.log("Initial page enter")
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGIN_USER_ERROR: {
                console.log("LOGIN_ERROR")
                return setAuth({
                    ...auth,
                    errorMessage: payload.errorMessage,
                    modalActive: true
                })
            }
            case AuthActionType.REGISTER_USER_ERROR: {
                console.log("REGISTER ERROR")
                return setAuth({
                    ...auth,
                    errorMessage: payload.errorMessage,
                    modalActive: true
                })
            }
            case AuthActionType.CLOSE_MODAL: {
                return setAuth({
                    ...auth, 
                    modalActive: false
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        console.log('i am mooki...')
        try {
            const response = await api.getLoggedIn();
            console.log('response from logged in:', response)
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch (error) {
            
        }
        
    }

    auth.registerUser = async function(userName, firstName, lastName, email, password, passwordVerify) {
        try {
            const response = await api.registerUser(userName, firstName, lastName, email, password, passwordVerify);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (err) {
            console.log(err.response.data.errorMessage)
            if (err.response.status === 400 || err.response.status === 401) {
                console.log("Error")
                authReducer({
                    type: AuthActionType.REGISTER_USER_ERROR,
                    payload: {
                        errorMessage: err.response.data.errorMessage
                    }
                })
            }
        }
    }

    auth.loginUser = async function(email, password) {
        console.log(email, password)
        try{
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                console.log("Worked?")
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (err) {
            console.log(err.response.data.errorMessage)
            if (err.response.status === 400 || err.response.status === 401) {
                console.log("Error")
                authReducer({
                    type: AuthActionType.LOGIN_USER_ERROR,
                    payload: {
                        errorMessage: err.response.data.errorMessage
                    }
                })
            }
        }

    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.isModalActive = () => {
        console.log("isModalactive")
        return auth.modalActive;
    }
    auth.hideModal = () => {
        authReducer({
            type: AuthActionType.CLOSE_MODAL
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };
