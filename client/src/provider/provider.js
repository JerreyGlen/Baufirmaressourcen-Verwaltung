import React, { useEffect, useState } from 'react';
import Axios from "axios";

export const Context = React.createContext();

Axios.defaults.withCredentials = true;

const ProcessProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        Axios.get("http://localhost:4000/login", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "x-access-role": localStorage.getItem("role")
            },
        }).then((response) => {
            if (!response.data.auth) {
                setUser(null)
            } else {
                const responseUser = response.data.user;
                setUser(responseUser);
            }
        }).catch(error => {
            console.log(error);
        });

    }, []);

    console.log(user);


    return (
        <Context.Provider value={{
            user: user,
            setUser: setUser
        }}>
            {children}
        </Context.Provider>
    );
};

export default ProcessProvider;