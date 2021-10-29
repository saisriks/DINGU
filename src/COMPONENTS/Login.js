import React, { useRef, useState } from 'react';
import{auth,provider}from '../SERVICES/firebasse';
import '../CSS/Login.css';
import hero from '../Assets/teams.png';



function Login() {
    const signinwithgoogle=()=>{
        auth.signInWithPopup(provider).catch(alert)
        
      };




     






      const[periyatholla,setperiyatholla]=useState(false);
      const [email, setemail] = useState('')
      const [password, setpassword] = useState('')
      const [sin, setsin] = useState('')
      const [userpic, setuserpic] = useState('')
      const [Name, setName] = useState('')
       //new animation code
  
      const signin=async()=>{
        await auth.createUserWithEmailAndPassword(email,password).then(user=>{user.user.updateProfile({
          displayName: Name,
          photoURL:userpic,
        })}).catch((err)=>{
          switch(err.code){
            case 'auth/email-already-in-use':
              setsin("E-mail already in use")
              break
              default:
                
              

          }
        })
        
        
      }
      const signup=()=>{
        auth.signInWithEmailAndPassword(email,password)
      }
      
      
    return (
      
      
      
      <div className="main">
        <h1 id="heading" className="heading font-weight-bolder mt-3 pr-4">&gt;&gt;DINGU</h1>
        {/*<div className="row no-gutters">
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
            <form>
            <div class="form-group">
    <input type="text" value={Name} onChange={(e)=>{setName(e.target.value)}} class="form-control" placeholder="Enter Your Name" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
  </div>
  <div class="form-group">
    <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} class="form-control" placeholder="Enter E-mail address" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} class="form-control" placeholder="Enter Password" id="exampleInputPassword1" required/>
  </div>
  <div class="form-group">
    <input type="text" value={userpic} onChange={(e)=>{setuserpic(e.target.value)}} class="form-control" placeholder="Paste Your Profile Pic Url" id="exampleInputPassword1" required/>
  </div>
  <center><button type="button" onClick={signin} class="btn btn-lg"><b>Sign Up <i class="fa fa-long-arrow-right"></i>
</b></button></center>
      <center><h6 style={{color:'red'}} >{sin}</h6></center>
<center><button type="button" onClick={signup} class="btn btn-lg"><b>Sign In <i class="fa fa-long-arrow-right"></i>
</b></button></center>
</form>
          </div>
        </div>*/}
        




        <div class={periyatholla?'container right-panel-active':'container'}  id="container">
        <div class="form-container sign-up-container">
            <form action="#">
                <h1>Create An Account</h1>
            
                <input value={Name} onChange={(e)=>{
                  setName(e.target.value)
                }} type="text" placeholder="Name" required={true}/>
                <input value={email} onChange={(e)=>{
                  setemail(e.target.value)
                }} type="email" placeholder="Email"required={true} />
                <input value={password} onChange={(e)=>{
                  setpassword(e.target.value)
                }} type="password" placeholder="Password"required={true} />
                <input value={userpic} onChange={(e)=>{
                  setuserpic(e.target.value)
                }} type="text" placeholder="Enter Your Profile Pic Url"  />
                <button onClick={signin} >Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <div class="social-container">
                <button type="button" className="btn btn-lg btn-block" onClick={signinwithgoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#3cba54" className="bi bi-google pb-1" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg> <span className="signin-text font-weight-bolder">Sign In</span>
            </button>
                </div>
                <span className='span'>or use your account</span>
                <input type="email" value={email} onChange={(e)=>{
                  setemail(e.target.value)
                }} placeholder="Email"required={true} />
                <input value={password} onChange={(e)=>{
                  setpassword(e.target.value)
                }} type="password" placeholder="Password"required={true} />
                <a href="#">Forgot your password?</a>
                <button  onClick={signup} >Sign In</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button class="ghost" id="signIn" onClick={()=>{setperiyatholla(false)}} >Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button class="ghost" id="signUp" onClick={()=>{setperiyatholla(true)}} >Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </div>)

}
export default Login;