import React from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection} from "@firebase/firestore";
import { dbService, storageService } from "fbase";
import { useRef, useState} from "react";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const fileInput = useRef();

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";

        if(attachment != ""){
            const attachmentRef = ref(storageService,`${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef,attachment,"data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
       
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
        fileInput.current.value = null;
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
        fileInput.current.value = null;
    };

    return (
        <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
                <input type="submit" value="nweet" />
                {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear Image</button>                
            </div>
                )}
        </form>  
    );
}

export default NweetFactory;