import React from 'react';
import Login from './Login';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../SERVICES/firebasse';
import Home from './Home';
import '../CSS/App.css';





function App() {
 
const [user]=useAuthState(auth);
   
 
  return (
    
    <>
    
    {user ? <div> <Home/></div> :<div><Login/></div>}
    </>
  )
}

export default App;




