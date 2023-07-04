import { addDoc, collection, query, getDocs, onSnapshot, where, orderBy } from "@firebase/firestore";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets,setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService,"nweets"));
        dbNweets.forEach((document) => {
          const nweetObject = {
            ...document.data(),
            id: document.id,
          };
          setNweets((prev) => [nweetObject, ...prev]);
        });
      };
    useEffect(() => {
        const q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc")
        );
    onSnapshot(q, (snapshot) => {
        const nweetArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
            setNweets(nweetArr);
        });
    }, []);
   
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
            text :nweet,
            createdAt: Date.now(),
            createdid : userObj.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
        
        setNweet("");
        };
        const onChange = (event) => {
            const {
                target : {value},
            } = event;
            setNweet(value);
        };
        console.log(nweets);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                <div key={nweet.id}>
                    <h4>{nweet.nweet}</h4>
                </div>
                ))}
            </div>
        </div>
    )
};
export default Home;