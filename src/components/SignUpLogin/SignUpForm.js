import React, { useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./SignupForm.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ForgotPassForm from "./ForgotPassForm";

const SignupForm = (props) => {

    const authCtx = useContext(AuthContext);

    const formRef = useRef();
    const emailInputRef = useRef();
    const passInputRef = useRef();
    const conPassInputRef = useRef();

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [varifyMail, setVarifyMail] = useState(false);
    const [forgetVisisble , setForgetVisible] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };


    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPass = passInputRef.current.value;

        setIsLoading(true);

        try {
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

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPass,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });



            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if(!isLogin){try {
                    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBUuvbK1Lq_5vuI32WAxGNgJ_0A9eLau9s", {
                        method: "POST",
                        body: JSON.stringify({
                            requestType: "VERIFY_EMAIL",
                            idToken: data.idToken,
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    if (response.ok) {
                        setIsLoading(false);
                        alert("Varification email sent.");
                        setVarifyMail(true);
                        setTimeout(() => {
                            setVarifyMail(false)
                        }, 5000)
                    } else {
                        throw new Error('Sign Up failed. Try again.')
                    }
                } catch (error) {
                    alert(error)
                }}
                authCtx.login(data.idToken, data.email);

                if (isLogin) {
                    navigate("/profile/expense-tracker");
                }
            } else {
                const data = await response.json();
                let errMsg = "Authentication Fail";

                if (data && data.error && data.error.message) {
                    errMsg = data.error.message;
                }

                throw new Error(errMsg);
            }

            formRef.current.reset();
        } catch (error) {
            alert(error.message);
        }
    };

    const linkClickHandler = () => {
        setForgetVisible(true);
    }

    const onBack = () => {
        setForgetVisible(false);
    }

    return (
        <>
            {forgetVisisble ? <ForgotPassForm onReset={() => setForgetVisible(false)} onBack={onBack}/> : (<div className={classes.signup}>
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
                    {isLogin && <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Link onClick={linkClickHandler}>Forgot Password?</Link>
                    </Form.Group>}
                    {!isLoading ? <Button variant="primary" type="submit">
                        {isLogin ? "LogIn" : "SignUp"}
                    </Button> : <Button variant="primary">Sending Request...</Button>}
                    {varifyMail && (
                        <p style={{ margin: "1rem", color: "green" }}>
                            Please varify email. Verfication mail already sent.
                        </p>
                    )}
                </Form>
                {!isLogin && <span>Already have an account?<button
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}>LogIn</button></span>}
                {isLogin && <span>Don't have an account?<button
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}>SignUp</button></span>}
            </div>)}

        </>
    );
};

export default SignupForm;