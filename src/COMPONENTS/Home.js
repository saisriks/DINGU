import React,{useState,useEffect} from 'react';
import {auth, db, storage} from '../SERVICES/firebasse';
import '../CSS/Home.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Avatar } from '@material-ui/core';
import firebase from 'firebase';
import Navbar from './Navbar'





function Home() {
    let today = new Date().toISOString().slice(0, 10)
    const [placeholder,setplaceholder]=useState('Compose your message')
    const[r,setr]=useState(null);
    const [user]=useAuthState(auth);
    const [pdf,setPdf]=useState([]);
    const[image,setimage]=useState('');
    const[name,setname]=useState('');
    
    useEffect(() => {                  
      const getPostsFromFirebase = [];
      const subscriber =
      db
        .collection("files").orderBy('createdat') 
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            getPostsFromFirebase.push({
              ...doc.data(), //spread operator
              key: doc.id, // `id` given to us by Firebase
            });
          });
          setPdf(getPostsFromFirebase);
          
        });
  
      // return cleanup function
      return () => subscriber();
    }, [r]);
    //useeffect end
    console.log(pdf);

    const upload = async ()=>{
      setr("")

      if(image.size>1999999){
        image.value=""
        alert(`Hey ${user.displayName} We Limit The File Size To 1 MB To Provide More Study Materials Please Reduce The File Size To 1MB`)
      }

      
      else{
        const storageRef = storage.ref();
        const fileRef = storageRef.child(image.name); 
        await fileRef.put(image);
        const downloadurl=(await fileRef.getDownloadURL());
        
        await  db.collection("files").doc().set({
          url:downloadurl,
          uploadedby:user.displayName,
          photourl:user.photoURL,
          name:name,
          uploadedon:today,
          createdat:firebase.firestore.FieldValue.serverTimestamp(),
          
        }).then(()=>{setr(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
      </svg>)});
      }
      };
      const placeholdersetter=()=>{setplaceholder('')}

      {/* MAIN PART */}
    return (
    <div className="main">
      
      {/* NAVBAR */}
      <Navbar/>
      <br/>
      {/* POSTS OF USERS */}
      <div className="posts">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        {pdf.map((post) => <  >
        <div key={post.key} className={"form "+(post.uploadedby===user.displayName?"if true":"if false")}>

          {/* USER-AVATAR */}
          <Avatar key={post.key} className={"avatar ml-2 mt-3 "+(post.uploadedby===user.displayName?"avatar-true mt-4":"avatar-false mt-4")} src={post.photourl} />

          <div key={post.key} className={"nav-tab ml-1"/* +(post.uploadedby===user.displayName?"if true":"if false") */} align="left">
            <span key={post.key} className={"user-info text-monospace"/* +(post.uploadedby===user.displayName?"if true":"if false") */}>{post.uploadedby}</span>

            <div key={post.key} className={"nav-link mb-3 "+(post.uploadedby===user.displayName?"if tru":"if fals")}>
              
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-arrow-down mb-2" viewBox="0 0 16 16">
                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
              </svg>

              <a key={post.key} className={"file-info "/* +(post.uploadedby===user.displayName?"if true":"if false") */} href={post.url} style={{fontSize:"14px"}} >{(post.name).toUpperCase()}</a>

              <br/>

              <span key={post.key} className={"date text-monospace "/* +(post.uploadedby===user.displayName?"if true":"if false") */}>{post.uploadedon}</span>

            </div>
          </div>
        </div>
        </>)}
      </div>

      {/* MESSAGE-TYPING-FIELD */}
      <div className="message-typing-box">

        <nav className="navbar fixed-bottom navbar-expand-lg" id="message-typing-box">
          <h5 className="text mr-1" style={{color:"green"}} >{r}</h5>
          <div className="input-group mb-3">

            {/* TEXT-FIELD */}
            <input type="text" className="form-control mt-3" placeholder={placeholder} onFocus={placeholdersetter} onBlur={()=>{setplaceholder("Compose your message")}} value={name} onChange={(e)=>{setname(e.target.value)}} />

            {/* FILE-IMPORT-BUTTON */}
            <input type="file" id="file" accept="application/pdf"  onChange={(e)=>{setimage(e.target.files[0])}}/>
            <label for="file" className="file-btn-label text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
              </svg>
            </label>

            {/* SEND-BUTTON */}
        <button className="button-send btn-group-sm" onClick={upload}><i className="fa fa-send pt-1"></i></button>
          </div>
        </nav>
      </div>
    </div>
        
    )
}

export default Home;