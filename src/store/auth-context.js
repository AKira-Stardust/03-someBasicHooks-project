import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (usrname, pwd)=>{},
    onLogout: ()=>{}
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect( ()=>{
        const loginToken = localStorage.getItem("isLoggedIn");
        if(loginToken === "1"){
            setIsLoggedIn(true);
        }
    },
    []);


    const loginHandler = () => {
        localStorage.setItem("isLoggedIn","1");
        setIsLoggedIn(true);
    }

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    return(
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogin: loginHandler,
                onLogout: logoutHandler 
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
} 

export default AuthContext;