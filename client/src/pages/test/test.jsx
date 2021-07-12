import React, { useEffect, useState } from 'react';
import Axios from "axios";

import "./_test.styles.scss";

const Test = () => {

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [rolleReg, setRolleReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [resetUsername, setResetUsername] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("https://api.developmore.net/register", {
      username: usernameReg,
      password: passwordReg,
      rolle: rolleReg
    }).then((response) => {
      console.log(response);
      setUsernameReg("");
      setPasswordReg("");
      setRolleReg("");
    });
  };

  const login = () => {
    Axios.post("https://api.developmore.net/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      setUsername("");
      setPassword("");
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
      }
    });
  };

  const checkAuth = () => {
    Axios.get("https://api.developmore.net/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const logout = () => {
    Axios.post("https://api.developmore.net/logout")
      .then(response => {
        console.log(response);
        localStorage.removeItem("token");
        document.cookie = "username=express cookie; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          setLoginStatus(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const reset = () => {
    Axios.post("https://api.developmore.net/reset", {
      username: resetUsername,
      password: resetPassword
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });

    setResetUsername("");
    setResetPassword("");
  }

  console.log(loginStatus);

  useEffect(() => {
    Axios.get("https://api.developmore.net/login", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
      if (!response.data.auth) {
        setLoginStatus(false)
      } else {
        setLoginStatus(true);
      }
    });
  }, []);

  return (
    <div className="test">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <label>Rolle</label>
        <input
          type="text"
          onChange={(e) => {
            setRolleReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
      </div>

      <div className="reset">
        <h1>Reset Password</h1>
        <input
          type="text"
          placeholder="Username..."
          value={resetUsername}
          onChange={(e) => {
            setResetUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          value={resetPassword}
          onChange={(e) => {
            setResetPassword(e.target.value);
          }}
        />
        <button
          onClick={reset}
        >
          Reset
        </button>
      </div>

      {
        loginStatus &&
        <div>
          <button onClick={checkAuth}> Check if authenticated</button>
          <br />
          <button onClick={logout}> Logout </button>
        </div>
      }
    </div>
  );
};

export default Test;