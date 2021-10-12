import React, { useState } from 'react'
import {auth, db} from '../SERVICES/firebasse'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react';
function Chat() {
    const[lo,setlo]=useState('');
    const[messages,setmessages]=useState([])
    useEffect(() => {                  
        const getPostsFromFirebase = [];
        const subscriber =
        db
          .collection("users") 
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              getPostsFromFirebase.push({
                ...doc.data(), //spread operator
                key: doc.id, // `id` given to us by Firebase
              });
            });
            setmessages(getPostsFromFirebase);
            
          });
    
        // return cleanup function
        return () => subscriber();
      }, []);
      console.log(messages)

    const [user]=useAuthState(auth)
    const name= user.displayName
    const photoURL = user.photoURL
     const[message, setMessage]=useState("")
     const handlesubmit=async ()=>{
        await  db.collection("users").doc().set({
            
            uploadedby:name,
            photourl:photoURL,
            name:name,
            message:message,
            
            
          }).then(setlo("finished"))

     }
    return (
        <body>
            {messages.map((message)=>{
                return(
                    <>
                    <img src={message.photourl} alt={message.uploadedby} />
                    <h3 style={{color:"white"}} >{message.message}</h3>
                    </>
                )
            })}
            <input type='text' value={message} onChange={(e)=>{
                setMessage(e.target.value)
            }} />
            <h3>{message}</h3>
            <button onClick={handlesubmit} >submit</button>
            <h1>{lo}</h1>
        </body>
    )
}

export default Chat
