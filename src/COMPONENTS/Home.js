import React,{useState,useEffect} from 'react';
import {auth, db, storage} from '../SERVICES/firebasse';
import '../CSS/Home.css';

import {useAuthState} from 'react-firebase-hooks/auth';

function Home() {
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
      var fileName = image;
        var extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        console.log(extension)
      if(image.size>1000000){
        image.value=""
        alert("Hey User!, Reduce the file size lesser than 1MB for better performance.")
        
      
      }
      
      else{
        const storageRef = storage.ref();
        const fileRef = storageRef.child(image.name); 
        await fileRef.put(image).then(()=>{setr('Message Posted')});
        const downloadurl=(await fileRef.getDownloadURL());
        
        await  db.collection("files").doc().set({
          url:downloadurl,
          uploadedby:user.displayName,
          photourl:user.photoURL,
          name:name,
          
        });
      }
      };
     
      
      
    
    return (
        <div classNmae="main">
            <h1 className="heading font-weight-bolder mt-3 pr-4">&gt;&gt;DINGU</h1>
            <hr/>
            <div className="posts">
    {
        pdf.map((post) => <div key={post.key} ><center><h1>< a  href={post.url} >{post.name}</a></h1></center></div>)
       }
       </div>
       <nav class="navbar navbar-expand-lg fixed-bottom navbar-light bg-black">

       <h4 style={{color:"green"}} >{r}</h4>

        <input className="form-control form-control-lg m-3" type="text" placeholder="Enter File Name" value={name} onChange={(e)=>{
          setname(e.target.value)
        }} />

<div className="input-group mb-2 mx-5">
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
