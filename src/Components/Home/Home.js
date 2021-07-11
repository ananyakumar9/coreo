import React from 'react';
import Screen from '../Calendar/Screen';
import ListItem from '../ListItem/ListItem';
import './Home.css';
import firebase from '../../Config/firebase'
import moment from 'moment';
 const db=firebase.firestore()

 

const Home=({user})=> {
  var listdets={
    title:'',
    date: moment().format("DD-MM-YYYY"),
    desc: ''
  }
  
  var reqdate=moment().format("DD-MM-YYYY")
  console.log(user.uid)
  console.log(reqdate)
  return (
    <div className='br2 ba white b--white-10 shadow-5 homeclass'>
      <div className='tl pa3'><Screen dets={user} reqdatechange={(newdate)=>{reqdate=newdate; console.log(reqdate)}}/></div>
      <div><button onClick={()=>{
        db.collection(user.uid).add({
            title: listdets.title,
            date: listdets.date,
            desc: listdets.desc
        }).then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
      



      }}>new item</button>
        <br/>
        <input onChange={(e)=>{listdets.title=e.target.value}}/>
        <input onChange={(e)=>{listdets.desc=e.target.value}}/>
        <ListItem user={user.uid} requiredDate={reqdate}/>
      </div>
    </div>
  );
}

export default Home;
