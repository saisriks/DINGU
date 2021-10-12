import React,{useState,useEffect} from 'react';
import {auth, db, storage} from '../SERVICES/firebasse';
import '../CSS/Home.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Avatar } from '@material-ui/core';


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
     
      if(image.size>199999){
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
<div classNmae="main">
            <h1 className="heading font-weight-bolder mt-3 pr-4 ">&gt;&gt;DINGU</h1>
            <hr/>
            <div className="posts">
    {
        pdf.map((post) => <  ><center><h1 className="LInks" key={post.key} ><Avatar style={{width:60,height:60}} src={post.photourl} /><h2> By {post.uploadedby} at {post.uploadedon}</h2>< a className="nav-link" href={post.url} >{post.name}</a></h1></center></>)
       }
       </div>
       <nav class="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">

       <h4 style={{color:"green"}} >{r}</h4>

        <input className="form-control form-control-lg m-3" type="text" placeholder="Enter File Name" value={name} onChange={(e)=>{
          setname(e.target.value)
        }} />

<div className="input-group mb-2 mx-5   ">
  <div className="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile02" accept="application/pdf"  onChange={(e)=>{setimage(e.target.files[0])}}/>
    <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
  </div>
</div>

        <button className="btn btn-lg btn-block my-1 mx-3" onClick={upload} ><strong>Upload</strong></button>

        <br/>
</nav>
        </div>
    )
}

export default Home;
