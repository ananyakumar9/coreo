import React from 'react';


import firebase from '../../Config/firebase'




class Settings extends React.Component{
  constructor(props)
  {
    super(props)
    console.log(props);
    this.state={
        onRouteChange:props.onRouteChange
    }
    
    
  }
  


  render(){
   
      return (
        <div>
          settings<br />
          <p  
    onClick={()=>{const user = firebase.auth().currentUser;

    user.delete().then(() => {
      // User deleted.
      this.state.onRouteChange('SignIn');
    }).catch((error) => {
      // An error ocurred
      // ...
    })}}
    className='pa2 ma2 f4 link dim underline'>delete acc</p>
        </div>
        
      );
    }
    
  }
  



export default Settings;
