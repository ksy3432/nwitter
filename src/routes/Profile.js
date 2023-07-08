import { authService, dbService } from "fbase";
//import React, { useEffect } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { where, getDocs, query, collection, orderBy, docs } from "@firebase/firestore";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default ({ refreshUser ,userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/"); 
    };

    /*const getMyNweets = async () => {
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
    };*/

    /*useEffect(() => {
        getMyNweets();
    },[])*/
    
    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser,{displayName:newDisplayName});
            refreshUser();
        }
    };

    return (
        <>
        <form onSubmit={onSubmit}>
             <input onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                     />
            <input type="submit" value="Update Profile" />
        </form>
        <Link to="/">
            <button onClick={onLogoutClick}>Log out</button>
        </Link>
        </>
    )
};
//export default Profile;