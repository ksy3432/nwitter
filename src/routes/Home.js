import { addDoc, collection, query, updateDoc, onSnapshot, where, orderBy, deleteDoc, getFirestore} from "@firebase/firestore";
import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState} from "react";
import { getDownloadURL, ref, uploadBytes, getStorage, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets,setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
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
   
    const onSubmit = async (event) => {
        event.preventDefault();
        //let attachmentUrl = "";

        const attachmentRef = ref(storageService,`${userObj.uid}/${v4()}`);
        const response = await uploadString(attachmentRef,attachment,"data_url");
        const attachmentUrl = await getDownloadURL(response.ref);
        //const img = document.getElementById('myimg');
        //img.setAttribute('src', attachmentUrl);


        const nweetObj = {
            text : nweet,
            createdAt : Date.now(),
            createdid : userObj.uid,
            attachmentUrl,
        };
        
        await addDoc(collection(dbService,"nweets"),nweetObj);
        setNweet("");
        setAttachment("");
        };

        const onChange = (event) => {
            const {
                target : {value},
            } = event;
            setNweet(value);
        };

        const onFileChange = (event) => {
            const {
                target : {files},
            } = event;
            const thefile = files[0];
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget : { result },
                } = finishedEvent;
                setAttachment(result);
                console.log(finishedEvent);
            };
            reader.readAsDataURL(thefile);
        };

    const onClearAttachment = () => {
        setAttachment("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="nweet" />
                {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear Image</button>                </div>
                )}
            </form>  
             <div>
                {nweets.map((nweet) => (
                <Nweet key={nweet.id}
                        nweetObj={nweet} 
                        isOwner={nweet.createdid === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;