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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange}
                        type="text"
                        autoFocus
                        placeholder="Display name"
                        value={newDisplayName}
                        className="formBtn"
                        style={{
                            marginTop: 10,
                        }}
                    />
                </form>
            <Link to="/">
                <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
                    Log out
                </span>
            </Link>
        </div>
    )
};
//export default Profile;