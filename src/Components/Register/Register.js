import React from 'react';
import firebase from '../../Config/firebase'
var newuser={
    name:'',
    email:'',
    pass:''
}
async function writeUserData(userId) {
    console.log("in")
    await firebase.firestore().collection(userId).doc("user-data").set({
      username: newuser.name,
      email: newuser.email,
      name: newuser.name
    });
  }
 
const Register=({onRouteChange, onUserChange})=> {
  return (
    <article className="br2 ba white b--white-10 mv5 w-100 w-50-m w-25-l mw5 center shadow-5">
        <main className="pa4 black-80" style={{color:'white'}}>
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0" key="1">
                <legend className="f4 fw6 ph0 mh0" key="2" >Register</legend>
                <div className="mt3" key="3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username" onChange={(e)=>{newuser.name=e.target.value}}/>
                </div>
                <div className="mt3" key="4">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={(e)=>{newuser.email=e.target.value}}/>
                </div>
                <div className="mv3" key="5">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={(e)=>{newuser.pass=e.target.value}}/>
                </div>
                </fieldset>
                <div className="" key="7">
                <input key="8"
                onClick={ ()=>{
                    var user
                     firebase.auth().createUserWithEmailAndPassword(newuser.email, newuser.pass)
                    .then((userCredential) => {
                    // Signed in 
                     user = userCredential.user;
                    console.log(user)
                    console.log(user.uid)
                    onUserChange(user)
                    writeUserData(user.uid)
                        //throw user
                       
                    // ...
                    })
                    
                    .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error)
                    // ..
                    });
                    
                    
                    // 
                    onRouteChange('Home') 
                    
                }}
                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" type="submit" value="Create Account"/>
                </div>
                <div className="lh-copy mt3" key="9">
                </div>
            </form>
        </main>
    </article>
  );
}

export default Register;