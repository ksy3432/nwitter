import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { where, getDocs, query, collection, orderBy, docs } from "@firebase/firestore";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ({ userObj }) => {
    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async () => {
        const q = query(
            collection(dbService,"nweets"),
            where("createdid","==",`${userObj.uid}`),
            orderBy("createdAt","desc")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id,"=>",doc.data());
        });
        //console.log(nweets.docs((docs) => docs.data()));
    };

    useEffect(() => {
        getMyNweets();
    },[])

    return (
        <>
        <Link to="/">
            <button onClick={onLogoutClick}>Log out</button>
        </Link>
        </>
    )
};
export default Profile;