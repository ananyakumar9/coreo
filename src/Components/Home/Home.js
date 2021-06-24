import React from 'react';
import Screen from '../Calendar/Screen'
const Home=()=> {
  const detts={
    name:'abc', age:24
  }
  return (
    <div className='pa3 br2 ba w-90-l white b--white-10 center shadow-5 h5-l'>
      Home
      <Screen dets={detts}/>
    </div>
  );
}

export default Home;
