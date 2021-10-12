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
        await fileRef.put(image).then(()=>{setr('success')});
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
            <div className="navbar navbar-light bg-dark justify-content-center">
              <a className="navbar-brand heading font-weight-bolder mt-3 pr-4 text-success" href="#">&gt;&gt;DINGU</a>
            </div>
      <center>
        <label>
          Enter Your Study Material Name
        <input type="text" accept="application/pdf" value={name} onChange={(e)=>{
          setname(e.target.value)
        }} /></label>
      <input type="file"  className="fike" onChange={(e)=>{
          setimage(e.target.files[0])
      }}/>
      <button onClick={upload} >Upload</button>
      <h4 style={{color:"yellow"}} >{r}</h4>
      </center>
    {
        pdf.map((post) => <div key={post.key} ><center><h1>< a  href={post.url} >{post.name}</a></h1></center></div>)
       }
        </div>
    )
}

export default Home;
