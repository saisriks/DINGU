import React from 'react';
import Login from './Login';
import {useAuthState, } from 'react-firebase-hooks/auth';
import {auth} from '../SERVICES/firebasse';
import Home from './Home';
import '../CSS/App.css';





function App() {

  const [user, loading] = useAuthState(auth);
auth.onAuthStateChanged((user)=>{console.log(user)})

  if (loading) {
    return (
      <div className="parent container-fluid" >
              <div className='child' class="spinner-border text-light " style={{marginTop:"250px",marginLeft:"700px"}} role="status">
  <span class="sr-only">Loading...</span>
</div>
      </div>

    );
  }

  if (user) {
    return (
      <div>
        
        <Home/>
        
      </div>
    );
  }

  
return  <Login/>
}

export default App;

