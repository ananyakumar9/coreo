import React from 'react';
import Screen from '../Calendar/Screen';
import ListItem from '../ListItem/ListItem';
import './Home.css';
import firebase from '../../Config/firebase'
import moment from 'moment';
import Modal from '../Modals/Modal'
import Subtask from '../ListItem/Subtask'
import DDay from '../DDay/DDay'
 const db=firebase.firestore()
 var pr={
   open:false,
   msg:'null',
   color:'green'
 }
 var reqdate=moment().format("DD-MM-YYYY")
 var x='';
    var y='';
    var z='';
var completed=[]
class Home extends React.Component{
  constructor(props)
  {
    super(props)
    console.log(props);
    console.log(reqdate);
    this.state={
      user:props.user,
      listdets:{
        title:'',
        date: moment().format("DD-MM-YYYY"),
        desc: '',
        subtasks:'',
        
      },
      time: new Date()
      
    }
    
    this.myRef = React.createRef();
    this.myModal = React.createRef();
    this.subtaskref = React.createRef();
    
  }
  
showsubtask(doc){
  this.subtaskref.current.showsubtask(doc, this.state.user);
}
componentDidMount() {
  this.update = setInterval(() => {
      this.setState({ time: new Date() });
  }, 1 * 1000); 
}
componentWillUnmount() {
clearInterval(this.update);
}
  render(){
    
      return (
        <div>
          <Modal content={pr} ref={this.myModal}/>
          <div className='br2 ba white b--white-10 shadow-5 homeclass'>
          
          <div className='tl pa3'>
            <Screen user={this.state.user} reqdatechange={(newdate)=>{reqdate=newdate; this.myRef.current.datemethod(reqdate)}}/></div>
            <div className="f4 pa3 mt2">{this.state.time.toLocaleTimeString()}</div>
          <div>
            <br/>
            Title: <input id="input-field" onChange={(e)=>{x=e.target.value}}/><br />
            Desc: <input  id="input-field" onChange={(e)=>{y=e.target.value}}/><br />
            Subtasks:<textarea id="input-field" onChange={(e)=>{z=e.target.value}}/><br />
            <button onClick={()=>{
              if(x===''||y==='')
              {
                pr={
                  color:'red',
                  msg:"Title or content cannot be left blank",
                  open:true,
                }
                this.myModal.current.showmodal(pr);
              }
              else{
                completed=z.split('\n')
              completed.fill(0);
            db.collection(this.state.user.uid).add({
                title: x,
                date: reqdate,
                desc: y,
                subtasks:  z.split('\n'),
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
            
            <ListItem user={this.state.user.uid} requiredDate={reqdate} ref={this.myRef} showsubtask={(doc)=>{this.showsubtask(doc)}}/>
           
          </div>
          <Subtask  ref={this.subtaskref} 
          showmodal={(p)=>{this.myModal.current.showmodal(p)}}
          reqdatechange={()=>{this.myRef.current.datemethod(reqdate);}}/>

          <DDay showmodal={(p)=>{this.myModal.current.showmodal(p)}}/>
        </div>
        </div>
        
      );
    }
    
  }
  



export default Home;
