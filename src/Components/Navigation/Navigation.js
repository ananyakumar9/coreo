import React from 'react';
import './Navigation.css';

const Navigation=({onRouteChange,route})=> {
  return (
    <nav className='mb4 main' >
        <div><p className='pa2 f1 ma2 b'>Coreo</p></div>
        {route==='Home'?
        <div>
          <p 
          onClick={()=>onRouteChange('SignIn')}
          className='pa2 ma2 f4 link dim underline'>Sign Out</p>
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
