import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from "./Profile.module.css";
import UpdateProfile from './updateProfile';
import AuthContext from '../../store/auth-context';
import { Button } from 'react-bootstrap';

const Profile = () => {
    const [update, setUpdate] = useState(false);
    const [userData, setUserData] = useState(null);

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate()

    const logoutHandler = () => {
        authCtx.logout();
        navigate("/", {replace : true})
    }

    const updateHandler = async () => {
        setUpdate(true);

        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBUuvbK1Lq_5vuI32WAxGNgJ_0A9eLau9s", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        idToken: authCtx.token
                    }
                )
            })
            const data = await res.json();
            setUserData(data.users[0]);
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className={classes.proCon}>
            <div className={classes.header}>
                <div className={classes.headerDetail}>
                    <p>Welcome To Expense Tracker</p>
                    <span className={classes.incomplete}>
                        {!update ? "Your Profile is incompelete." : <React.Fragment>Your Profile is <strong>x%</strong>complete</React.Fragment>}
                        <Link onClick={updateHandler}>Complete Now</Link>
                    </span>
                </div>
            </div>
            <Button variant='danger' onClick={logoutHandler}>Log out</Button>
            {update && <UpdateProfile user={userData} />}
        </div>
    )
}

export default Profile
