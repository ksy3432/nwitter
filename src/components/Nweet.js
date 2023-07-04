import { doc, deleteDoc, updateDoc } from "@firebase/firestore";
import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const deleteNweet = async () => {
    const ok =  window.confirm("Are you sure want to delete this nweets?");
    if(ok){
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
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
    <div>
      {editing ? (
        <>
        {isOwner && (
          <>
          <form onSubmit={onsubmit}>
          <input type="text" 
            placeholder="Edit your Nweet"
            value={newNweet}
            required
            onChange={onchange}
          />
          <input type="submit" value="Update Nweet" onClick={onSubmit} />
          </form>
          <button onClick={toggleEditing}>Calcel</button>
        </> 
      )}
    </>
        
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={deleteNweet}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </> 
      )}
      </div>
  );
};

export default Nweet;
