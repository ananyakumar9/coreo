import React from 'react';
import './Navigation.css';
import firebase from '../../Config/firebase'
const Navigation=({onRouteChange,route})=> {
  return (
    <nav className='mb4 main' >
        <div><p className='pa2 f1 ma2 b'>Coreo</p></div>
        {route==='Home' || route==='Settings'?
        <div>
          
          
          
          <p  
    onClick={()=>{
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        onRouteChange('SignIn');
      }).catch((error) => {
        // An error happened.
      });}}
    className='pa2 ma2 f4 link dim underline'>Sign out</p>
    <p  
    onClick={()=>{
      
        onRouteChange('Settings');
      }}
    className='pa2 ma2 f4 link dim underline'>Settings</p>
          </div>
          
        
        :<div className='links1'>
        <p
        onClick={()=>onRouteChange('SignIn')}
        className='pa2 ma2 f4 link dim underline'>Sign In</p>
        <p 
        onClick={()=>onRouteChange('Register')}
        className='pa2 ma2 f4 link dim underline'>Register</p>
        </div>
        }
    </nav>
  );
}

export default Navigation;
