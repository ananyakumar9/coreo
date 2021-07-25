import React from 'react';
import Screen from '../Calendar/Screen';
import ListItem from '../ListItem/ListItem';
import './Home.css';
import firebase from '../../Config/firebase'
import moment from 'moment';
import Modal from '../Modals/Modal';
import Subtask from '../ListItem/Subtask';
import DDay from '../DDay/DDay';
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
    var slide='';
var completed=[]
class Home extends React.Component{
  constructor(props)
  {
    
    super(props)
    this.state={
      user:props.user,
      listdets:{
        title:'',
        date: moment().format("DD-MM-YYYY"),
        desc: '',
        subtasks:''
      },
      time: new Date()
    }
    
    this.myRef = React.createRef();
    this.myModal = React.createRef();
    this.subtaskref = React.createRef();
    
  }
  componentDidMount() {
    this.update = setInterval(() => {
        this.setState({ time: new Date() });
    }, 1 * 1000); 
  }
  componentWillUnmount() {
  clearInterval(this.update);
  }
  
showsubtask(doc){
  this.subtaskref.current.showsubtask(doc, this.state.user);
}
imgclick=()=>{
  if(slide===true)
  {
    slide=false;
  }
  else{
    slide=true;
  }
}
  render(){
    
      return (
        <div>
          
          <Modal content={pr} ref={this.myModal}/>
          <div className='br2 h-500px ba white b--white-10 shadow-5 carousel'>

           
          <a href="#carousel__slide2">  
          <img src={"https://image.flaticon.com/icons/svg/130/130884.svg"} alt="hello" id="right" onClick={this.imgclick}/>
          </a>
          
          <a href="#carousel__slide1">
          <img src={"https://image.flaticon.com/icons/svg/130/130882.svg"} alt="hell" id="left" onClick={this.imgclick}/>
          </a>

          <ol className="carousel__viewport ml-0">
            <li className="carousel__slide grid " id="carousel__slide1">
              
            <div className='tl pa2 yflow ba'>
              <Screen user={this.state.user} reqdatechange={(newdate)=>{reqdate=newdate; this.myRef.current.datemethod(reqdate)}}/>
              <div className="f4 pa3 mt2">{this.state.time.toLocaleTimeString()}</div>
            </div>
          <div className="yflow ba">
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
          </li>
         <li className="carousel__slide grid" id="carousel__slide2">
          <div className="yflow ba ma2">
           <Subtask  ref={this.subtaskref} 
          showmodal={(p)=>{this.myModal.current.showmodal(p)}}
          reqdatechange={()=>{this.myRef.current.datemethod(reqdate);}}/>
         </div>
         <div className="yflow ba ma2">
          <DDay showmodal={(p)=>{this.myModal.current.showmodal(p)}}  user={this.state.user.uid}/>
          </div>
         </li>
        </ol>
        </div>
        <div>
          <ul>
            <li className="slideitems pa3"><a href="#carousel__slide1" className="slidebutton" onClick={this.imgclick}>slide1</a></li>
            <li className="slideitems pa3"><a href="#carousel__slide2" className="slidebutton" onClick={this.imgclick}>slide2</a></li>
          </ul>
          </div>
        </div>
        
      );
    }
    
  }
  



export default Home;
