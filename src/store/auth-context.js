import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    userEmail: "",
    login: (token) => { },
    logout: () => { }
})

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem("token");
    const initialEmail = localStorage.getItem("email");

    const [token, setToken] = useState(initialToken);
    const [userEmail, setUserEmail] = useState(initialEmail);

    const userLogIn = !!token;

    const loginHandler = (tokenId, email) => {
        setToken(tokenId);
        setUserEmail(email);
        localStorage.setItem("token", tokenId);
        localStorage.setItem("email", email);
    }

    const logoutHandler = () => {
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }

    const contextValue = {
        token: token,
        isLoggedIn: userLogIn,
        userEmail: userEmail,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;