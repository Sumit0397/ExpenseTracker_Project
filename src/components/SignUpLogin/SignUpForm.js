import React, { useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

import classes from "./SignupForm.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const SignupForm = (props) => {

    const authCtx = useContext(AuthContext);

    const formRef = useRef();
    const emailInputRef = useRef();
    const passInputRef = useRef();
    const conPassInputRef = useRef();

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPass = passInputRef.current.value;

        setIsLoading(true);
        let url;
        if (isLogin) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUuvbK1Lq_5vuI32WAxGNgJ_0A9eLau9s"
        } else {
            const enteredConPass = conPassInputRef.current.value;


            if (enteredPass !== enteredConPass) {
                alert("Password not matched with Confirm password.");
                setIsLoading(false);
                return;
            }

            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUuvbK1Lq_5vuI32WAxGNgJ_0A9eLau9s"
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPass,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setIsLoading(false);
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    let errMsg = "Authentication Fail";
                    if (data && data.error && data.error.message) {
                        errMsg = data.error.message;
                    }
                    throw new Error(errMsg);
                })
            }
        }).then((data) => {
            console.log(data)
            authCtx.login(data.idToken,data.email)
            if(isLogin){
                navigate("/profile")
            }
        }).catch((err) => {
            alert(err.message)
        })
        formRef.current.reset()
    };

    return (
        <>
            <div className={classes.signup}>
                <h1>{!isLogin ? "SignUp" : "LogIn"}</h1>
                <Form ref={formRef} onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            ref={emailInputRef}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={passInputRef}
                            required
                        />
                    </Form.Group>
                    {!isLogin && <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            ref={conPassInputRef}
                            required
                        />
                    </Form.Group>}
                    {!isLoading ? <Button variant="primary" type="submit">
                        {isLogin ? "LogIn" : "SignUp"}
                    </Button> : <Button variant="primary">Sending Request...</Button>}
                </Form>
                {!isLogin && <span>Already have an account?<button
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}>LogIn</button></span>}
                {isLogin && <span>Don't have an account?<button
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}>SignUp</button></span>}
            </div>

        </>
    );
};

export default SignupForm;