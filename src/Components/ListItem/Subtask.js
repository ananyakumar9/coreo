import React from 'react';
import firebase from '../../Config/firebase'

var z='', temp; var pr;
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
      showmodal:props.showmodal,
      openmodal:false,
      editIndex:-1,
    }
    pr={
      open:false,
      color:'red',
      msg:'null'
    }
    temp='';

    
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
              {
                this.state.openmodal?
                <div className="modal  true">
                  <div className="content red">
                  do you want to delete?<br />
                  <button onClick={()=>{
                      
                      this.setState({
                        openmodal:false
                      }, ()=>{})}}>no</button>
                  <a href="#carousel__slide1">
                  <button onClick={()=>{
                      this.props.updateSlide(false);
                      db.collection(this.state.user.uid).doc(this.state.task.id)
                      .delete()
                      .then(()=>{ this.state.reqdatechange(); this.setState({
                             task:'',
                             openmodal:false,
                              }, ()=>{}
                              )
                            })
                            
                      }}>yes</button>
                    </a>  

                  </div>
                  
                </div>:''
              }
                <div className="yflow ba ma1 bg-black pa2">
                <div className="tl">
                  <a href="#carousel__slide1">
                    <button className="crossbutton" onClick={()=>{this.setState({task:''}, ()=>{});this.props.updateSlide(false);}}>
                      X
                    </button>
                  </a>
                </div>
                <div className="ma2">
                {this.state.task.title}<br />
                    {this.state.task.date}<br /><br/>
                    {this.state.task.desc}<br />
                    Item:<textarea id="input-field" className="br2 w-50 mt2" onChange={(e)=>{z=e.target.value}}/><br />
                </div><br/>
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
              
          }}>New Item</button>
            <br />
            <br />
            
            
              <button className="mt4 custombutton grow" onClick={()=>{
                      
                      this.setState({
                        openmodal:true
                      }, ()=>{})}}>Delete Entire List</button>
            
          
                </div>

                    
                    <div  className="yflow ba ma1 bg-black pa3" >
                    <div className="pa2 mv2">PENDING</div>
                    
                    {
                      
                      this.state.subtasks.map((doc, index)=>{
                        var done=this.state.completed[index];
                        
                        return(
                          done===0 || done===false?
                          <div className=" pa1 mh3 tl" style={{display:'flex',justifyContent:'space-between'}}>
                            <div className="w-80">
                              {
                              this.state.editIndex==index?
                              
                              <input placeholder={doc} onChange={(e)=>temp=e.target.value}></input>
                              
                              :
                              <div>
                                <input type="checkbox" key={index+1000} checked={this.state.completed[index]}
                                  onChange={()=>{
                                    var c=this.state.completed
                                    c[index]=!c[index]
                                    this.setState({
                                    completed:c
                                  },  ()=>{
                                    var flag=1;
                                    for(var i=0;i<c.length;i++)
                                      {
                                        if(c[i]===false || c[i]===0)
                                        {
                                          flag=0;
                                          break;
                                        }

                                      }
                                      if(flag===1)
                                      {
                                        pr={
                                          open: true,
                                          msg:'congrats, no pending ',
                                          color:'green'

                                        }
                                        this.state.showmodal(pr);
                                      }
                                  db.collection(this.state.user.uid).doc(this.state.task.id).set({
                                      ...this.state.task,
                                      
                                      completed:this.state.completed

                                      
                                    })
                                  })
                                    }}/>&nbsp;
                                    <span className={this.state.completed[index]===true?"strike":""}>{doc}</span>
                              </div>
                            
                                
                            
                            }
                            </div>
                            {
                              this.state.editIndex===index?
                              <button className="crossbuttonlist" onClick={
                                ()=>{
                                  var c=this.state.subtasks
                                  c[index]=temp===""?doc:temp;
                                  this.setState({
                                    subtasks:c,
                                    editIndex:-1
                                  }, ()=>{
                                    temp=""
                                    db.collection(this.state.user.uid).doc(this.state.task.id).set({
                                      ...this.state.task,
                                      completed: this.state.completed
                                    })
                                  })
                                }
                              }>c</button>:
                              <button className="crossbuttonlist" onClick={
                                ()=>{
                                  this.setState({
                                    editIndex:index
                                  }, ()=>{})
                                }
                              }>e</button>
                            }
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
                          <div className=" pa1 mh3 tl" style={{display:'flex',justifyContent:'space-between'}}>
                            <div className="w-80">
                            <input type="checkbox" key={index+2000} checked={this.state.completed[index]}
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
                                }}/>&nbsp;
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
