import { authService } from "fbase";
import React from "react";
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
        <button onClick={onLogoutClick} Link to="/">Log out</button>
        </>
    )
};
export default Profile;