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
var completed=[];
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
      slide:false,
      switch:false,
      
    }
    this.myRef = React.createRef();
    this.myModal = React.createRef();
    this.subtaskref = React.createRef();
    
  }
  updateSwitch=(s)=>{this.setState({switch:s})}
  updateSlide=(s)=>{this.setState({slide:s})}

  
showsubtask(doc){
  this.subtaskref.current.showsubtask(doc, this.state.user);
}

  render(){
    return (
        <div>
          <Modal content={pr} ref={this.myModal}/>
          {!this.state.switch?
          <div>
          
          <div className='br2 h-500px ba white b--white-10 shadow-5 carousel'>
          
           {/*this.state.slide?
          <a href="#carousel__slide2" >  
          <img src={"https://image.flaticon.com/icons/svg/130/130884.svg"} alt="hello" id="right"/>
          </a>:
          <a href="#carousel__slide2" className="isDisabled">  
          <img src={"https://image.flaticon.com/icons/svg/130/130884.svg"} alt="hello" id="right"/>
          </a>
           */}
           <a href="#carousel__slide2" className="isDisabled">  
          <img src={"https://image.flaticon.com/icons/svg/130/130884.svg"} alt="hello" id="right"/>
          </a>
          {this.state.slide?
          <a href="#carousel__slide1" onClick={()=>{this.updateSlide(false)}}>
          <img src={"https://image.flaticon.com/icons/svg/130/130882.svg"} alt="hell" id="left"/>
          </a>:
          <a href="#carousel__slide1" className="isDisabled">
          <img src={"https://image.flaticon.com/icons/svg/130/130882.svg"} alt="hell" id="left"/>
          </a>
          }
          <ol className="carousel__viewport ml-0">
            <li className="carousel__slide grid1" id="carousel__slide1">
              
            <div className='tl pa2 yflow ba'>
              <Screen user={this.state.user} reqdatechange={(newdate)=>{reqdate=newdate; this.myRef.current.datemethod(reqdate)}}/>
              
              <center>
               
                
                <p className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" 
              onClick={()=>{this.updateSwitch(true)}}
              >Calendar Event Display</p></center>
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
            
            <ListItem user={this.state.user.uid}
            requiredDate={reqdate} ref={this.myRef} 
            showsubtask={(doc)=>{this.showsubtask(doc)}} 
            updateSlide={this.updateSlide}/>
           
          </div>
          </li>
         <li className="carousel__slide" id="carousel__slide2">
          <div className="yflow ba ma1">
           <Subtask  ref={this.subtaskref} 
          showmodal={(p)=>{this.myModal.current.showmodal(p)}}
          reqdatechange={()=>{this.myRef.current.datemethod(reqdate);}}
          updateSlide={this.updateSlide}
          />
         </div>
         
          {/*<div className="yflow ba ma1"><DDay showmodal={(p)=>{this.myModal.current.showmodal(p)}}  user={this.state.user.uid}/></div>*/}
          
          
          {/*<div className="yflow ba ma1"><DDay showmodal={(p)=>{this.myModal.current.showmodal(p)}}  user={this.state.user.uid}/></div>*/}
          
         </li>
        </ol>
        </div>
        {/*<div>
          <ul>
            <li className="slideitems pa3"><a href="#carousel__slide1" className="slidebutton" onClick={()=>{this.updateSlide(false)}}>slide1</a></li>
            {this.state.slide?
              <li className="slideitems pa3"><a href="#carousel__slide2" className="slidebutton" >slide2</a></li>:
              <li className="slideitems pa3"><a href="#carousel__slide2" className="slidebutton isDisabled" >slide2</a></li>
            }
          </ul>
          </div>*/}
          </div>
          :
          <div className='br2 ba white b--white-10 shadow-5 ma3'>
          <DDay showmodal={(p)=>{this.myModal.current.showmodal(p)}} updateSwitch={this.updateSwitch} user={this.state.user.uid}/>
          </div>
          }
        </div>
        
      );
    }
  
    
  }
  



export default Home;
