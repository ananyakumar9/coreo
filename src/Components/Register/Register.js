import React from 'react';
import firebase from '../../Config/firebase'
var newuser={
    name:'',
    email:'',
    pass:''
}
var newday=[{
    title:"demo",
    date:"31-07-2022"
}]
var pr={
    open:false,
    msg:'null',
    color:'red'
}
async function writeUserData(userId, showmodal) {
    const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: newuser.name,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/coreo-49ca8.appspot.com/o/default-profile.jpg?alt=media&token=57cdfc46-a697-4aa1-9a6a-8b565dd87391"
        }).then(() => {
        // Update successful
        // ...
        }).catch((error) => {
        // An error occurred
        // ...
        pr={
            open:true,
            color:'red',
            msg:error.message
        }
        showmodal(pr);
        console.log(error)
        });  
    await firebase.firestore().collection(userId).doc("user-data").set({
      username: newuser.name,
      
    });
    
    await firebase.firestore().collection(userId).doc("d-day").set({
        user: userId,
        dday:newday
      });

      return 0;
  }
 
const Register=({onRouteChange, onUserChange, showmodal})=> {
  return (
    <article className="br2 ba white b--white-10 mv5 w-100 w-50-m w-25-l mw5 center shadow-5">
        <main className="pa4 black-80" style={{color:'white'}}>
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0" key="1">
                <legend className="f4 fw6 ph0 mh0" key="2" >Register</legend>
                <div className="mt3" key="3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white" type="text" name="username"  id="username" onChange={(e)=>{newuser.name=e.target.value}}/>
                </div>
                <div className="mt3" key="4">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white" type="email" name="email-address"  id="email-address" onChange={(e)=>{newuser.email=e.target.value}}/>
                </div>
                <div className="mv3" key="5">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white" type="password" name="password"  id="password" onChange={(e)=>{newuser.pass=e.target.value}}/>
                </div>
                </fieldset>
                <div className="" key="7">
                <input key="8"
                onClick={ ()=>{
                    if(newuser.pass==''|| newuser.email=='')
                    {
                         pr={
                            open:true,
                            color:'red',
                            msg:'email or pw cannot be blank'
                        }
                        showmodal(pr);
                        
                    }
                    else{
                        pr={
                            open:true,
                            color:'blue',
                            msg:'loading'
                        }
                        showmodal(pr);
                    var user
                     firebase.auth().createUserWithEmailAndPassword(newuser.email, newuser.pass)
                    .then((userCredential) => {
                    // Signed in 
                    
                     user = userCredential.user;
                    console.log(user)
                    console.log(user.uid)
                    onUserChange(user)
                    writeUserData(user.uid, showmodal)
                    onRouteChange('Home') 
                    
                    }).catch((error) => {
                        pr={
                            open:true,
                            color:'red',
                            msg:error.message
                        }
                        showmodal(pr);
                        console.log(error)
                    // ..
                    });
                    
                }
                    // 
                    
                    
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