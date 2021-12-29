import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import { useHistory } from "react-router-dom";

import "../styles/Login.css";
import { useStateValue } from "../StateProvider";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(undefined);

    const [dispatch] = useStateValue();

    const history = useHistory();

    const handleLogin = (event) => {
        event.preventDefault();

        const req = {
            email: email,
            password: password,
        };

        axios({
            method: "POST",
            url: `${API_URL}/login`,
            headers: { "Content-Type": "application/json" },
            data: req,
        })
            .then((result) => {
                const { user } = result.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", true);
                setUser(user);
                setIsLoggedIn(true);
                setIsLoggedIn(false);

                dispatch({
                    type: "SET_THE_USER",
                    item: {
                        user,
                        isLoggedIn,
                    },
                });

                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                setIsLoggedIn(false);
                setLoginError("Incorrect username or password");
            });
    };

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo"
                    src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
                    alt="not found"
                />
            </Link>

            <div className="login__container">
                <h1 className="login__title">Sign-in</h1>

                {loginError ? <h5 className="login__alert">{loginError}</h5> : null}

                <form action="">
                    <h5>Email</h5>
                    <input type="text" required value={email} onChange={(event) => setEmail(event.target.value)} />
                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <button className="login__signInButton" onClick={(event) => handleLogin(event)}>
                        Sign in
                    </button>
                </form>

                <p className="login__description">
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy
                    Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <Link to="/signup">
                    <button className="login__createAccountButton">Create new amazon account</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
