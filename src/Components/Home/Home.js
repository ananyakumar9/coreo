import React from 'react';
import Screen from '../Calendar/Screen';
import ListItem from '../ListItem/ListItem';
import './Home.css';
const Home=()=> {
  const detts={
    name:'Abc', age:24
  }
  return (
    <div className='pa3 br2 ba white b--white-10 shadow-5 homeclass'>
      <div className='tl pa3'><Screen dets={detts}/></div>
      <div>Hello
        <br/>
        <ListItem/>
      </div>
    </div>
  );
}

export default Home;
