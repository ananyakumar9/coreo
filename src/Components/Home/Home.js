import React from 'react';
import Screen from '../Calendar/Screen';
import ListItem from '../ListItem/ListItem';
import './Home.css';
import firebase from '../../Config/firebase'
import moment from 'moment';
import Modal from '../Modals/Modal';
import Subtask from '../ListItem/Subtask';

 const db=firebase.firestore()
 var pr={
   open:false,
   msg:'null',
   color:'green'
 }
 var reqdate=moment().format("DD-MM-YYYY")
 var x='';
 var y='';
 var z=[""];

class Home extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      user:props.user,
      
        subtasks:[""],
    
      slide:false,
      onRouteChange:props.onRouteChange
     // switch:false
    }
    this.myRef = React.createRef();
    this.myModal = React.createRef();
    this.subtaskref = React.createRef();
    pr={
      open:false,
      msg:'null',
      color:'green'
    }
    x=''; y=''; z=[""];
  }
  updateSlide=(s)=>{this.setState({slide:s})}
  //updateSwitch=(s)=>{this.setState({switch:s})}
  
showsubtask(doc){
  this.subtaskref.current.showsubtask(doc, this.state.user);
}

  render(){
    z=this.state.subtasks
    return (
        <div>
          
          <div className='br2 ba white b--white-10 shadow-5 carousel'>
           
            <Modal content={pr} ref={this.myModal}/>




           
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
            <li className="carousel__slide grid1 yflow" id="carousel__slide1">
              
            <div className='tl pa2 yflow' id="home_1">
              <Screen user={this.state.user} reqdatechange={(newdate)=>{reqdate=newdate; this.myRef.current.datemethod(reqdate)}} showmodal={(p)=>{this.myModal.current.showmodal(p)}}/>
              <div className="bl br bb w-50 center b--white-10">
              <center>
                <p className="b pv2 ph3 input-reset ba b--white bg-transparent grow pointer f6 dib white" 
              onClick={()=>{this.state.onRouteChange('DDay');}}
              >Calendar Events</p>
              </center>
              </div>
            </div>






          <div className="bl yflow" id="home_2" >
            <br/>
            <table className="center">
            <tr><td className="tl">Title: </td><td className="tl"><input id="input-field" onChange={(e)=>{x=e.target.value;}}/></td></tr>
            <tr><td className="tl"> Desc: </td><td className="tl"><input  id="input-field" onChange={(e)=>{y=e.target.value}}/></td></tr>
            <tr><td className="tl">Subtasks:</td></tr><td className="tl">
            {
            this.state.subtasks.map((data, index)=>
            {
              
              return(
                <tr><input value={data}  id="input-field" onChange={(e)=>{
                  z=this.state.subtasks;
                  z[index]=e.target.value;
                  
                  this.setState({subtasks:z}, ()=>{console.log(this.state.subtasks)}) 
                  console.log(this.state.subtasks)}}/>
                    
                    {
                      this.state.subtasks.length>1?
                      <button onClick={()=>{
                        z=this.state.subtasks;
                        z.splice(index, 1);
                      
                      this.setState({subtasks:z}, ()=>{console.log(this.state.subtasks)})
                      }}>x</button>:
                      <button class="disabled">x</button>
                      


                    }
                    </tr>
                  
                  

              )
            }
            )
            }
            <tr><button className="custombutton grow" onClick={()=>{
              z=this.state.subtasks
              z.push("");
              console.log("contents",z)

              this.setState({
                subtasks:z
              }, ()=>{
                console.log(this.state.subtasks)

              })
            }}>add subtask</button></tr></td>
            </table>
            <button className="custombutton grow" onClick={()=>{
              console.log(this.state.subtasks)
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
              
                
            db.collection(this.state.user.uid).add({
                title: x,
                date: reqdate,
                desc: y,
                subtasks:  this.state.subtasks.filter(e =>  e),
                completed: Array(this.state.subtasks.filter(e =>  e).length).fill(0)
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
              x="";y="";z=[""]
              this.setState({
                
                  subtasks:[""]
                
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
              
          }}>New List</button>
            <br />
            <br />
            









            <ListItem user={this.state.user.uid}
            requiredDate={reqdate} ref={this.myRef} 
            showsubtask={(doc)=>{this.showsubtask(doc)}} 
            updateSlide={this.updateSlide} showmodal={(p)=>{this.myModal.current.showmodal(p)}}/>
          
          </div>
          </li>
          <li className="carousel__slide yflow" id="carousel__slide2">
          <div className="ma1">
            <Subtask  ref={this.subtaskref} 
          showmodal={(p)=>{this.myModal.current.showmodal(p)}}
          reqdatechange={()=>{this.myRef.current.datemethod(reqdate);}}
          updateSlide={this.updateSlide}
          />
         </div>
          
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
        
      );
    }
  
    
  }
  



export default Home;
