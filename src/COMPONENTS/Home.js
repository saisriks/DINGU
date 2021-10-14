import React,{useState,useEffect} from 'react';
import {auth, db, storage} from '../SERVICES/firebasse';
import '../CSS/Home.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Avatar } from '@material-ui/core';
import Navbar from './Navbar';


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
        .collection("files") 
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
     
      if(image.size>1999999){
        image.value=""
        alert("Hey User We Limit The File Size To 1 MB To Provide More Study Materials Please Reduce The File Size To 1MB")
        
      
      }
      
      else{
        const storageRef = storage.ref();
        const fileRef = storageRef.child(image.name); 
        await fileRef.put(image).then(()=>{setr('success')});
        const downloadurl=(await fileRef.getDownloadURL());
        
        await  db.collection("files").doc().set({
          url:downloadurl,
          uploadedby:user.displayName,
          photourl:user.photoURL,
          name:name,
          uploadedon:today,
          
        });
      }
      };
     const signout=()=>{auth.signOut()}
     
      
      
    
    return (
<div className="main">
  <Navbar/>
            
            <div className="posts">
              {pdf.map((post) => <  >
                <span className="links" key={post.key} ></span>
                <div className="form-inline">
                <Avatar className="avatar ml-3" style={{width:55,height:55}} src={post.photourl} />
                  <div className="nav-tab ml-2" align="left">
                  <span className="user-info text-monospace"> By: {post.uploadedby}</span>
                  <div className="nav-link mb-3">
                    <a className="file-info" href={post.url} >{post.name}</a>
                    <br/>
                    <span className="date text-monospace">{post.uploadedon}</span>
                    </div>
                    </div>

                  </div>

              </>)}
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
       </div>
       <nav className="navbar fixed-bottom navbar-expand-lg">
       <h5 className="text mr-1" style={{color:"green"}} >{r}</h5>

        <div className="input-group mb-3">
        
  <input type="text" className="form-control mt-3" placeholder="Enter File Name" value={name} onChange={(e)=>{
          setname(e.target.value)
        }} />


  <input type="file" id="file" accept="application/pdf"  onChange={(e)=>{setimage(e.target.files[0])}}/>
  <label for="file" className="file-label text-dark"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
  <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
</svg></label>

{/*onClick={upload} */}
  
  <input type="btn" id="btn" className="upload-button" onClick={upload}/>
  <label for="btn" className="upload-label text-dark">
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cursor-fill" viewBox="0 0 16 16">
  <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
</svg>
  </label>

</div>
       
</nav>
        </div>
    )
}

export default Home;