import React from 'react'
import { Avatar } from '@material-ui/core';
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '../SERVICES/firebasse';
import "../CSS/Navbar.css"

function Navbar() {
    const [user]=useAuthState(auth)
    const signout=()=>{auth.signOut()}

    return (
        <div className="Navbar">      
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

      <h1 className="heading font-weight-bolder ml-4 mt-1">&gt;&gt;DINGU</h1>
    
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
        <li class="nav-item m-2 d-inline-flex">
            <Avatar className="avatar" src={user.photoURL} style={{height:"1000",width:"100",}} /><span className="user-name mt-2 ml-2">{user.displayName}</span>
        </li>
        <li class="nav-item m-2">
            <button id="signoutbtn" className="btn mr-3" onClick={signout}><b>Sign out</b></button>
        </li>
    </ul>
</div>
</nav>
</div>
    )
}

export default Navbar