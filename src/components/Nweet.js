import { doc, deleteDoc, updateDoc} from "@firebase/firestore";
import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const deleteNweet = async () => {
    const ok =  window.confirm("Are you sure want to delete this nweets?");
    if(ok){
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
      if(nweetObj.attachmentUrl != ""){
        await deleteObject(ref(storageService,nweetObj.attachmentUrl)); 
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService,"nweets",`${nweetObj.id}`),{
      text:newNweet,
    });
    setEditing(false);
  };

  const onchange = (event) => {
    const {
      target : {value}
    } = event;
    setNewNweet(value);
  }
  return (
    <div className="nweet" >
      {editing ? (
        <>
        {isOwner && (
          <>
          <form onSubmit={onsubmit} className="container nweetEdit">
            <input type="text" 
              placeholder="Edit your Nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onchange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" onClick={onSubmit} className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">Calcel</span>
        </> 
      )}
    </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={deleteNweet}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </> 
      )}
      </div>
  );
};

export default Nweet;
