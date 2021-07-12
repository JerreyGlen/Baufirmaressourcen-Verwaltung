import React, { useContext, useEffect, useState } from 'react';
import Axios from "axios";
import { Button } from "@material-ui/core";

import { Context } from "../../provider/provider";

import FormAuth from "../../reuseable-components/form-auth/form-auth.components";
import "./_login-page.styles.scss";

const LoginPage = () => {

    const { setUser } = useContext(Context);

    const [loginInput, setLoginInput] = useState({
        username: "",
        password: "",
        role: null
    });
    const [roles, setRoles] = useState([])
    const [message, setMessage] = useState("");

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        if (roles.length > 0) {
            setLoginInput(prevValue => ({
                ...prevValue,
                role: roles[0].idPerson_Rolle
            }))
        }
    }, [roles])

    const login = () => {
        Axios.post("http://localhost:4000/login", {
            username: loginInput.username,
            password: loginInput.password,
            role: Number(loginInput.role)
        }).then((response) => {
            if (!response.data.auth) {
                const responseMessage = response.data.message;
                setMessage(responseMessage);
            } else {
                setLoginInput({
                    username: "",
                    password: "",
                    role: null
                });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.idPerson_Rolle)
                const responseUser = response.data.user;
                setUser(responseUser);
            }
        });
    };

    const checkUser = () => {
        Axios.post("http://localhost:4000/checkbeforelogin", {
            username: loginInput.username
        }).then(response => {
            if (response.data.message) {
                const responseMessage = response.data.message;
                setMessage(responseMessage)
            } else {
                const responseRoles = response.data.resultRollen;
                setRoles(responseRoles);
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInput(prevValue => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const getRole = (idRolle) => {
        switch (idRolle) {
            case 1:
                return "Admin"
            case 2:
                return "Chef"
            case 3:
                return "Bauleiter"
            case 4:
                return "Polier"
            case 5:
                return "Bauarbeiter"

            default:
                return ""
        }
    }

    console.log(loginInput);
    console.log(roles);

    return (
        <div className="login-page">
            <h3 className="message">{message}</h3>
            <div className="login-box">
                <h1>Bitte loggen Sie sich zuerst ein</h1>
                {(roles && roles.length > 0) ?
                    <div className="login">
                        <p>Anmelden als:</p>
                        <select className="select-role" name="role" onChange={handleChange}>
                            {roles.map((role, r) => (
                                <option
                                    value={role.idPerson_Rolle}
                                    key={r}
                                >{getRole(role.idRolle)}
                                </option>
                            ))}
                        </select>
                        <FormAuth
                            name="password"
                            type="password"
                            value={loginInput.password}
                            handleChange={handleChange}
                            label="Password"
                            backcolor="#9df3c4"
                        />
                        <Button
                            variant="text"
                            className="login-btn"
                            style={{ textTransform: "none" }}
                            onClick={login}
                        >Login
                        </Button>
                    </div> :
                    <div>
                        <FormAuth
                            name="username"
                            type="text"
                            value={loginInput.username}
                            handleChange={handleChange}
                            label="Username"
                            backcolor="#9df3c4"
                        />
                        <Button
                            variant="text"
                            className="login-btn"
                            style={{ textTransform: "none" }}
                            onClick={checkUser}
                        >Weiter &gt;
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default LoginPage;