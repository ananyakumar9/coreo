import React from 'react';
import './Navigation.css';
import firebase from '../../Config/firebase'
class Navigation extends React.Component {

  constructor(props)
  {
    super(props)
    console.log(props)
    this.state={
      onRouteChange:props.onRouteChange,
      route:props.route
    }
  }
  updatenavbar(route)
  {
    this.setState({
      route:route
    }, ()=>{

    })
  }

  render()
  {
    
  return (
    <nav className='mb4 main' >
        <div><p className='pa2 f2 ma2 b'>Coreo</p></div>
        {this.state.route==='Home' || this.state.route==='Settings'?
        <div class="dropdown mr2" style={{alignSelf:'center'}}>
          <button className="dropbtn">
            <img className="br-100" src={firebase.auth().currentUser.photoURL} width='70px'/>
          </button>
          <div className="dropdown-content">
              <p  onClick={()=>{
                    firebase.auth().signOut().then(() => {
                      // Sign-out successful.
                      window.location.reload(true);
                      this.state.onRouteChange('SignIn');
                    }).catch((error) => {
                      // An error happened.
                    });}}
                  className='pa2 ma2 f4 link dim underline'>Sign out</p>

              <p  onClick={()=>{
                
                  this.state.onRouteChange('Settings');
                }}
              className='pa2 ma2 f4 link dim underline'>Settings</p>



          </div>
       
          </div>
          
        
        :<div className='links1'>
        <p
        onClick={()=>this.state.onRouteChange('SignIn')}
        className='pa2 ma2 f4 link dim underline'>Sign In</p>
        <p 
        onClick={()=>this.state.onRouteChange('Register')}
        className='pa2 ma2 f4 link dim underline'>Register</p>
        </div>
        }
    </nav>
  );

  }
}

export default Navigation;
