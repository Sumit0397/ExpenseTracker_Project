import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import classes from "./Profile.module.css";
import UpdateProfile from './updateProfile';

const Profile = () => {
    const [update , setUpdate] = useState(false);

    const updateHandler = () => {
        setUpdate(true);
    }

    return (
        <div className={classes.proCon}> 
            <div className={classes.header}>
                <p>Welcome To Expense Tracker</p>
                <span className={classes.incomplete}>
                    {!update ? "Your Profile is incompelete." : <React.Fragment>Your Profile is <strong>x%</strong>complete</React.Fragment>}
                    <Link onClick={updateHandler}>Complete Now</Link>
                </span>
            </div>
            {update && <UpdateProfile/>}
        </div>
    )
}

export default Profile
