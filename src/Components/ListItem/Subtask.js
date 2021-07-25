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
              <button onClick={()=>{this.setState({task:''}, ()=>{})}}>close</button>
              <div className='w-70 bg-black center '>
                    {this.state.task.title}<br />
                    {this.state.task.date}<br />
                    {this.state.task.desc}<br />
                    
                    {
                      this.state.subtasks.map((doc, index)=>{
                        
                        return(
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
                                
                                
                                
                                
                                <button onClick={()=>{
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
                              })}}>delete</button>


                            
                            </div>
                          
                        )
                      }
                      )
                    }

                    Subtasks:<textarea id="input-field" onChange={(e)=>{z=e.target.value}}/><br />
                    <button onClick={()=>{
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
              
          }}>new subtask</button>
            <br />
            <br />
                    <button onClick={()=>{
                              
                              db.collection(this.state.user.uid).doc(this.state.task.id).delete().then(()=>{ this.state.reqdatechange(); this.setState({
                                task:''
                              }, ()=>{
                                
                              })})}
                              }>delete</button>
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
