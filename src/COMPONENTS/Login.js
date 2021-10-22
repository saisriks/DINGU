import React from 'react';
import{auth,provider}from '../SERVICES/firebasse';
import '../CSS/Login.css';
import hero from '../Assets/teams.png';

function Login() {
    const signinwithgoogle=()=>{
        auth.signInWithPopup(provider).catch(alert)
        
      };
    return (
      //<button  className="login-provider-button" onClick={signinwithgoogle} >
      //src={book}
      <div className="main">
        <h1 id="heading" className="heading font-weight-bolder mt-3 pr-4">&gt;&gt;DINGU</h1>
        <div className="row no-gutters">
        <div id="img-grid" className="col-sm-5 col-md-5 mx-3 py-3 my-3" align="center">
              <img className="img-fluid" src={hero} alt=""/>
            </div>
          <div className="col-sm-5 col-md-5 mx-4 py-3 my-3" align="left">
            <br/>
            <button type="button" className="btn btn-lg btn-block" onClick={signinwithgoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-google pb-1" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg> <span className="signin-text font-weight-bolder">Sign In</span>
            </button>
            <br/>
            <center><span className="text-white font-weight-bolder">OR</span></center>
            <br/>
            <form action="Home.js" method="POST">
  <div class="form-group">
    <input type="email" class="form-control" placeholder="Enter E-mail address" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <input type="password" class="form-control" placeholder="Enter Password" id="exampleInputPassword1" required/>
  </div>
  <center><button type="submit" class="btn btn-lg"><b>Sign In <i class="fa fa-long-arrow-right"></i>
</b></button></center>
</form>
          </div>
        </div>
        <footer className="footer mt-auto py-3">
  <div className="container border-0">
    <center><span className="text-muted">&gt;&gt;DINGU © 2021</span></center>
  </div>
</footer>
      </div>
      
    )
}

export default Login;
