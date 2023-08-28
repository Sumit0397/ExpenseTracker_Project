import React, { useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import classes from "./SignupForm.module.css"

const ForgotPassForm = (props) => {

    const emailInputRef = useRef()

    const submitHandler = async (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;

        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBUuvbK1Lq_5vuI32WAxGNgJ_0A9eLau9s", {
                method : "POST",
                body : JSON.stringify({
                    requestType	:  "PASSWORD_RESET",
                    email : enteredEmail
                }),
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            alert("Reset mail sent.")
            props.onReset()
        } catch (error) {
            alert(error)
        }
    }

  return (
    <div className={classes.signup}>
      <h1>Forgot Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control
                type='email'
                placeholder='Enter Email'
                ref = {emailInputRef}
                required/>
        </Form.Group>
        <Button variant='primary' type='submit' className='mx-2'>
            Reset
        </Button>
        <Button variant='primary' type='submit' onClick={props.onBack}>
            Back
        </Button>
      </Form>
    </div>
  )
}

export default ForgotPassForm
