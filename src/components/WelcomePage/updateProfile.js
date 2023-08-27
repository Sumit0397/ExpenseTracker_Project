import React, { useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import classes from "./UpdateProfile.module.css";

const UpdateProfile = (props) => {
    const formRef = useRef();
    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const contactInputRef = useRef();
    const locationInputRef = useRef();
    console.log(props.user);

    useEffect(() => {
        if(props.user){
            emailInputRef.current.value = props.user.email;
            if(props.user.displayName !== undefined){
                nameInputRef.current.value = props.user.displayName;
            }
        }
    },[props.user])

    const updateFormHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredContact = contactInputRef.current.value;
        const enteredLocation = locationInputRef.current.value;

        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBUuvbK1Lq_5vuI32WAxGNgJ_0A9eLau9s", {
                method: "POST",
                body: JSON.stringify({
                    idToken: localStorage["token"],
                    displayName: enteredName,
                    contact: enteredContact,
                    location: enteredLocation,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                alert("Profile Updated")
            } else {
                throw new Error("Upadation failed!. Please try again.");
            }
            formRef.current.reset();
        } catch (error) {
            alert(error);
        }
    }


    return (
        <div className={classes.updateForm}>
            <h1>Update profile</h1>
            <Form ref={formRef} onSubmit={updateFormHandler}>
                <Form.Group className={classes["mb-3"]}>
                    <Form.Label className={classes.label}>Email</Form.Label>
                    <Form.Control placeholder="Email" ref={emailInputRef} />
                </Form.Group>
                <Form.Group className={classes["mb-3"]}>
                    <Form.Label className={classes.label}>Full Name:</Form.Label>
                    <Form.Control placeholder="Full Name" ref={nameInputRef} />
                </Form.Group>
                <Form.Group className={classes["mb-3"]}>
                    <Form.Label className={classes.label}>Contact No.:</Form.Label>
                    <Form.Control placeholder="Contact No." ref={contactInputRef} />
                </Form.Group>
                <Form.Group className={classes["mb-3"]}>
                    <Form.Label className={classes.label}>Location: </Form.Label>
                    <Form.Control placeholder="Location" ref={locationInputRef} />
                </Form.Group>
                <Button type="submit">
                    Update
                </Button>
            </Form>
        </div>
    )
}

export default UpdateProfile;
