import React,{useState,useEffect} from 'react';
import {auth, db, storage} from '../SERVICES/firebasse';
import '../CSS/Home.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Avatar } from '@material-ui/core';
import firebase from 'firebase';
import Navbar from './Navbar'


function Home() {
   let today = new Date().toISOString().slice(0, 10)



    const[r,setr]=useState('');
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
        alert("Hey User We Limit The File Size To 1 MB To Provide More Study Materials Please Reduce The File Size To 1MB")
        
      
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
          
        }).then(()=>{setr('success')});
      }
      };
     const signout=()=>{auth.signOut()}
     
    

      
    
    return (
<div className="main">
  <Navbar/>
            
            <div className="posts">
            <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
              {pdf.map((post) => <  >
                <span className="LInks" key={post.key} ></span>
                <div className={"form-inline "/*space after class name is important*/+(post.uploadedby===user.displayName?"user-forml":"not-user-forml")}>
                <Avatar className={"avatar ml-3 "/*space after class name is important*/+(post.uploadedby===user.displayName?"user-avat":"not-user-avat")} style={{width:55,height:55}} src={post.photourl} />
                  <div className={"nav-tab ml-2 "/*space after class name is important*/+(post.uploadedby===user.displayName?"user-ntab":"not-user-ntab") }align="left">
                  <span className={"user-info text-monospace "/*space after class name is important*/+(post.uploadedby===user.displayName?"user-name":"not-user-name")}> By: {post.uploadedby}</span>
                  <div className={"nav-link mb-3 "/*space after class name is important*/+(post.uploadedby===user.displayName?"user-nlink":"not-user-nlink")}>
                    <a className={"file-info "/*space after class name is important*/+(post.uploadedby===user.displayName?"user-link":"not-user-link")} href={post.url} >{post.name}</a>
                    <br/>
                    <span className={"date text-monospace "/*space after class name is important*/+(post.uploadedby===user.displayName?"user-date":"not-user-date")}>{post.uploadedon}</span>
                    </div>
                    </div>

                  </div>

              </>)}
       
       </div>
       <nav className="navbar fixed-bottom navbar-expand-lg">
       {/* <div className="btn-group" role="group" aria-label="Basic example">
       <input type="text" className="form-control input-group-lg"/>
<input type="file" id="actual-btn" hidden/>
<label for="actual-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
  <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
</svg></label>
  <button type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cursor-fill" viewBox="0 0 16 16">
  <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
</svg></button>
</div> */}

       <h5 style={{color:"green"}} >{r}</h5>

        <input className="form-control m-3" type="text" placeholder="Enter File Name" value={name} onChange={(e)=>{
          setname(e.target.value)
        }} />

<div className="input-group mb-2 mx-5   ">
  <div className="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile02" accept="application/pdf"  onChange={(e)=>{setimage(e.target.files[0])}}/>
    <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
  </div>
</div>

        <button className="btn btn-block my-1 mx-3" onClick={upload} ><strong>Upload</strong></button>

        <br/>
</nav>
        </div>
    )
}

export default Home;
