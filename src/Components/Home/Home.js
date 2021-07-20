import React from 'react';
import Screen from '../Calendar/Screen';
import ListItem from '../ListItem/ListItem';
import './Home.css';
import firebase from '../../Config/firebase'
import moment from 'moment';
import Modal from '../Modals/Modal'
 const db=firebase.firestore()
 var pr={
   open:false,
   msg:'null',
   color:'green'
 }
 var reqdate=moment().format("DD-MM-YYYY")
var completed=[]
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
        desc: '',
        subtasks:''
      }
      
      
    }
    
    this.myRef = React.createRef()
    this.myModal = React.createRef()
    
  }
  

  render(){
    
      return (
        <div>
          <Modal content={pr} ref={this.myModal}/>
          <div className='br2 ba white b--white-10 shadow-5 homeclass'>
          
          <div className='tl pa3'><Screen user={this.state.user} reqdatechange={(newdate)=>{reqdate=newdate; this.myRef.current.datemethod(reqdate)}}/></div>
          <div>
            <br/>
            Title: <input id="input-field" onChange={(e)=>{this.state.listdets.title=e.target.value}}/><br />
            Desc: <input  id="input-field" onChange={(e)=>{this.state.listdets.desc=e.target.value}}/><br />
            Subtasks:<textarea id="input-field" onChange={(e)=>{this.state.listdets.subtasks=e.target.value}}/><br />
            <button onClick={()=>{
              if(this.state.listdets.title===''||this.state.listdets.desc==='')
              {
                pr={
                  color:'red',
                  msg:"Title or content cannot be left blank",
                  open:true,
                }
                this.myModal.current.showmodal(pr)
              }
              else{
                completed=this.state.listdets.subtasks.split('\n')
              completed.fill(0);
            db.collection(this.state.user.uid).add({
                title: this.state.listdets.title,
                date: reqdate,
                desc: this.state.listdets.desc,
                subtasks:  this.state.listdets.subtasks.split('\n'),
                completed: completed
            }).then(() => {
              
               
              this.myRef.current.datemethod(reqdate)
              pr={
                color:'green',
                msg:"Document successfully written!",
                open:true,
              }
              this.myModal.current.showmodal(pr)
              Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
              );
              Array.from(document.querySelectorAll("textarea")).forEach(
                input => (input.value = "")
              );
              this.setState({
                listdets:{
                  title:'',
                  date: '',
                  desc: '',
                  subtasks:''
                }
              })
              
          })
          .catch((error) => {
              
              pr={
                color:'red',
                msg:"Error writing document: "+ error,
                open:true,
              }
              this.myModal.current.showmodal(pr)
          });
              }
              
          }}>new item</button>
            <br />
            <br />
            
            <ListItem user={this.state.user.uid} requiredDate={reqdate} ref={this.myRef}/>
          </div>
        </div>
        </div>
        
      );
    }
    
  }
  



export default Home;
