import { addDoc, collection, query, updateDoc, onSnapshot, where, orderBy, deleteDoc, getFirestore} from "@firebase/firestore";
import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState} from "react";
import { getDownloadURL, ref, uploadBytes, getStorage, uploadString } from "firebase/storage";
import NweetFactory from "components/NweetFactory";

export default ({ userObj }) => {
    const [nweets,setNweets] = useState([]);
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((docs) => ({
                id: docs.id,
                ...docs.data()
            }));
            setNweets(nweetArr);
        });
    }, []);

    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                <Nweet key={nweet.id}
                        nweetObj={nweet} 
                        isOwner={nweet.createdid === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
//export default Home;