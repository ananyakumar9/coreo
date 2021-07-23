import React from 'react';


import firebase from '../../Config/firebase'



var x='', y='', z, newPassword;
class Settings extends React.Component{
  constructor(props)
  {
    super(props)
    console.log(props);
    this.state={
        onRouteChange:props.onRouteChange,
        user:firebase.auth().currentUser
    }
    x=this.state.user.displayName;
    y=this.state.user.photoURL;
    z=this.state.user.email;
    
  }
  


  render(){
   
      return (
        <div>
          <button onClick={()=>this.state.onRouteChange('Home')}>back</button><br />
          email:{this.state.user.email}<br />
          Change Name: <input id="input-field" onChange={(e)=>{x=e.target.value}} placeholder={this.state.user.displayName}/><br />
          Change PhotoURL: <input id="input-field" onChange={(e)=>{y=e.target.value}} placeholder={this.state.user.photoURL}/><br />
          Change Email: <input id="input-field" onChange={(e)=>{z=e.target.value}} placeholder={this.state.user.email}/><br />
          Change Password: <input id="input-field" type="password" onChange={(e)=>{newPassword=e.target.value}} /><br />
          <button onClick={()=>{
            this.state.user.updateProfile({
              displayName: x,
              photoURL: y
            }).then(() => {
              // Update successful
              // ...
            }).catch((error) => {
              // An error occurred
              // ...
            }); 
            this.state.user.updateEmail(z).then(() => {
              // Update successful
              // ...
            }).catch((error) => {
              // An error occurred
              // ...
            });
            this.state.user.updatePassword(newPassword).then(() => {
              // Update successful.
              console.log("pw")
            }).catch((error) => {
              // An error ocurred
              // ...
            });
          }}>save changes</button>
          
          <br />
          <br />
          <p  onClick={()=>{const user = firebase.auth().currentUser;

            user.delete().then(() => {
              // User deleted.
              window.location.reload(true);
              this.state.onRouteChange('SignIn');
            }).catch((error) => {
              // An error ocurred
              // ...
            })}}
            className='pa2 ma2 f4 link dim underline'>delete acc
              </p>
        </div>
        
      );
    }
    
  }
  



export default Settings;
