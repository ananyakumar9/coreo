import React from 'react';
import firebase from '../../Config/firebase'
const SignIn=({onRouteChange, onUserChange})=> {
    var newuser={
        email:'',
        pass:''
    }
  return (
    <article className="br2 ba white b--white-10 mv5 w-100 w-50-m w-25-l mw5 center shadow-5">
        <main className="pa4 black-80" style={{color:'white'}}>
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={(e)=>{newuser.email=e.target.value}}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={(e)=>{newuser.pass=e.target.value}}/>
                </div>
                </fieldset>
                <div className="">
                <input 
                 onClick={()=>{
                    var user
                    firebase.auth().signInWithEmailAndPassword(newuser.email, newuser.pass)
                    .then((userCredential) => {
                    // Signed in 
                     user = userCredential.user;
                    console.log(user)
                    onUserChange(user)
                    // ...
                    })
                    .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error)
                    // ..
                    });
                
                    onRouteChange('Home') }}
                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <p
                onClick={()=>onRouteChange('Register')}
                className="f6 link dim black db white" >Register</p>
                </div>
            </form>
        </main>
    </article>
  );
}

export default SignIn;
