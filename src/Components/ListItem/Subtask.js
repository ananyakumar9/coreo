import React from 'react';
import firebase from '../../Config/firebase'

var z=''; var pr;
 const db=firebase.firestore()
class Subtask extends React.Component{
  constructor(props)
  {
    super(props)
    
    this.state={
      user:'',
      task:'',
      subtasks:'',
      completed:'',
      reqdatechange:props.reqdatechange,
      showmodal:props.showmodal
      
    }
    
    
  }
  showsubtask(req, user) {
    this.setState({user:user, task:req, subtasks:req.subtasks, completed:req.completed }, ()=>{
      
    });
  }

  
 
  render()
  {
    if(this.state.task!='')
        {
          return(
        
            <div>
              <div className='center grid2'>
                <div className="yflow ba ma1 bg-black pa2">
                <div className="tl ">
                  <a href="#carousel__slide1">
                    <button className="crossbutton" onClick={()=>{this.setState({task:''}, ()=>{});this.props.updateSlide(false)}}>
                      X
                    </button>
                  </a>
                </div>
                {this.state.task.title}<br />
                    {this.state.task.date}<br />
                    {this.state.task.desc}<br />
                    Subtasks:<textarea id="input-field" className="br2 w-50 mt2" onChange={(e)=>{z=e.target.value}}/><br />
                    <button className="ma2 custombutton grow" onClick={()=>{
              if(z==='')
              {
                pr={
                  color:'red',
                  msg:"Subtask cannot be left blank",
                  open:true,
                }
                this.state.showmodal(pr)
              }
              else{
                var s=this.state.subtasks;
                s.push(z);
                var c=this.state.completed;
                c.push(0);
                db.collection(this.state.user.uid).doc(this.state.task.id).set({
                  ...this.state.task,
                  subtasks: s,
                  completed: c
                })
                .then(() => {
                  Array.from(document.querySelectorAll("textarea"))
                  .forEach(input => (input.value = ""));
                  z='';
                  this.setState({
                  subtasks:s,
                  completed:c
                  }, ()=>{

                    })  
                })
                .catch((error) => {
                    
                    console.log(error);
                });
              }
              
          }}>New Subtask</button>
            <br />
            <br />
            <a href="#carousel__slide1"><button className="ma2 custombutton grow" onClick={()=>{
                              
                              db.collection(this.state.user.uid).doc(this.state.task.id).delete().then(()=>{ this.state.reqdatechange(); this.setState({
                                task:''
                              }, ()=>{
                                
                              })})}
                              }>Delete List</button></a>
                </div>

                    
                    <div  className="yflow ba ma1 bg-black pa3" >
                    <div className="pa2 mv2">PENDING</div>
                    {
                      this.state.subtasks.map((doc, index)=>{
                        var done=this.state.completed[index];
                        
                        return(
                          done===0 || done===false?
                          <div className=" pa1 mh5 tl" style={{display:'flex',justifyContent:'space-between'}}>
                            <div>
                            <input type="checkbox" key={index} checked={this.state.completed[index]}
                              onChange={()=>{
                                var c=this.state.completed
                                c[index]=!c[index]
                                this.setState({
                                completed:c
                              },  ()=>{
                                
                               db.collection(this.state.user.uid).doc(this.state.task.id).set({
                                  ...this.state.task,
                                  
                                  completed:this.state.completed
                                })
                              })
                                }}/>
                                <span className={this.state.completed[index]===true?"strike":""}>{doc}</span>
                              </div>
                                <button className="crossbuttonlist" onClick={()=>{
                                    var c=this.state.subtasks
                                    c.splice(index, 1)
                                    var d=this.state.completed
                                    d.splice(index, 1)
                                    this.setState({
                                    subtasks:c,
                                    completed:d
                              }, ()=>{
                                     db.collection(this.state.user.uid).doc(this.state.task.id).set({
                                        ...this.state.task,
                                        completed: this.state.completed
                                      })
                              })}}>X</button>


                            
                            </div>
                          :''
                        )
                      }
                      )
                    }
                    </div>
                    <div  className="yflow ba ma1 bg-black pa3" >
                     <div className="pa2 mv2">COMPLETED</div>
                      
                    {
                      this.state.subtasks.map((doc, index)=>{
                        var done=this.state.completed[index];
                        return(
                          done===true?
                          <div className=" pa1 mh5 tl" style={{display:'flex',justifyContent:'space-between'}}>
                            <div>
                            <input type="checkbox" key={index} checked={this.state.completed[index]}
                              onChange={()=>{
                                var c=this.state.completed
                                c[index]=!c[index]
                                this.setState({
                                completed:c
                              },  ()=>{
                                
                               db.collection(this.state.user.uid).doc(this.state.task.id).set({
                                  ...this.state.task,
                                  
                                  completed:this.state.completed
                                })
                              })
                                }}/>
                                <span className={this.state.completed[index]===true?"strike":""}>{doc}</span>
                            
                            </div>
                                <button className="crossbuttonlist" onClick={()=>{
                                    var c=this.state.subtasks
                                    c.splice(index, 1)
                                    var d=this.state.completed
                                    d.splice(index, 1)
                                    this.setState({
                                    subtasks:c,
                                    completed:d
                              }, ()=>{
                                     db.collection(this.state.user.uid).doc(this.state.task.id).set({
                                        ...this.state.task,
                                        completed: this.state.completed
                                      })
                              })}}>X</button>


                            
                            </div>
                          :''
                        )
                      }
                      )
                    }
                    </div>
                    
                    

                    
              
                </div>
            </div>
          )
                 
        }
        else{
          return(
            <div className="nonedisplay">

            </div>
          )
        }
      
      
    
    
    
  }
}



  
 
 

export default Subtask;
