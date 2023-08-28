import React, { Fragment, useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import classes from "./Profile.module.css";
import UpdateProfile from './updateProfile';
import AuthContext from '../../store/auth-context';
import { Button } from 'react-bootstrap';

const Profile = () => {
    // const [update, setUpdate] = useState(false);
    const [userData, setUserData] = useState(null);

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()

    const isLocation = location.pathname === "/profile";

    const logoutHandler = () => {
        authCtx.logout();
        navigate("/", { replace: true })
    }

    const updateHandler = async () => {
        // setUpdate(true);

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
        navigate("/profile", { replace: true });
    }

    return (
        <Fragment>
            <div className={classes.proCon}>
                <div className={classes.header}>
                    <div className={classes.headerDetail}>
                        <p>Welcome To Expense Tracker</p>
                        <span className={classes.incomplete}>
                            {!isLocation ? "Your Profile is incompelete." : <React.Fragment>Your Profile is <strong>x%</strong>complete</React.Fragment>}
                            <Link onClick={updateHandler}>Complete Now</Link>
                        </span>
                    </div>
                </div>
                <Button variant='danger' onClick={logoutHandler}>Log out</Button>
            </div>
            {isLocation && <UpdateProfile user={userData} />}
        </Fragment>
    )
}

export default Profile
