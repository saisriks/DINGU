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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <h1 className="heading font-weight-bolder ml-4 mt-1">&gt;&gt;DINGU</h1>
    
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
        <li className="nav-item m-2 d-inline-flex">
            <Avatar className="avatar" src={user.photoURL} style={{height:"100",width:"100",} } />
            <span className="user-name mt-2 ml-2">{user.displayName}</span>
        </li>
        <li className="nav-item m-2">
            <button id="signoutbtn" className="btn mr-3" onClick={signout}>
                <b>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-box-arrow-in-right mr-2" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                    Sign out
                </b>
            </button>
        </li>
    </ul>
</div>
</nav>
</div>
    )
}

export default Navbar
