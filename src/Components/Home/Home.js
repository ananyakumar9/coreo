import React from 'react';
import Screen from '../Calendar/Screen';
import ListItem from '../ListItem/ListItem';
import './Home.css';
import firebase from '../../Config/firebase'
import moment from 'moment';
 const db=firebase.firestore()

 var reqdate=moment().format("DD-MM-YYYY")
class Home extends React.Component{
  constructor(props)
  {
    super(props)
    console.log(props)
    console.log(reqdate)
    this.state={
      user:props.user,
      listdets:{
        title:'',
        date: moment().format("DD-MM-YYYY"),
        desc: ''
      }
    }
    
  }
  componentDidMount(){
    var starCountRef = firebase.database().ref(this.state.user.uid);
    starCountRef.on('value',(snapshot) => {
      const data = snapshot.val();
      console.log(data)
    });
  }
  
  render(){
    
      return (
        <div className='br2 ba white b--white-10 shadow-5 homeclass'>
          <div className='tl pa3'><Screen user={this.state.user} reqdatechange={(newdate)=>{reqdate=newdate; console.log(reqdate)}}/></div>
          <div><button onClick={()=>{
            db.collection(this.state.user.uid).add({
                title: this.state.listdets.title,
                date: this.state.listdets.date,
                desc: this.state.listdets.desc
            }).then(() => {
              console.log("Document successfully written!");
              Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
              );
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
          }}>new item</button>
            <br/>
            <input id="input-field" onChange={(e)=>{this.state.listdets.title=e.target.value}}/>
            <input  id="input-field" onChange={(e)=>{this.state.listdets.desc=e.target.value}}/>
            <ListItem user={this.state.user.uid} requiredDate={reqdate}/>
          </div>
        </div>
      );
    }
    
  }
  



export default Home;
