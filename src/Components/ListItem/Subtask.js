import React from 'react';

class Subtask extends React.Component{
  constructor(props)
  {
    super(props)
    console.log(props)
    this.state={
      subtasks:props.subtasks,
      completed:props.completed,
      changecompleted: props.changecompleted,
      changesubtasks: props.changesubtasks
      
    }
    
    
  }
  subtaskmethod(req) {
    this.setState({ subtasks: req.subtasks, completed:req.completed }, ()=>{
      
      
    });
  }

  
 
  render()
  {
    
      return(
        <div>
          <div className='w-70 bg-black center '>
                
                
                {
                  this.state.subtasks.map((doc, index)=>{
                    
                    return(
                      <div>
                        
                        <input type="checkbox" key={index} checked={this.state.completed[index]}
            onChange={()=>{var c=this.state.completed
              c[index]=!c[index]
              this.setState({
              completed:c
            }, ()=>{
              
              this.state.changecompleted(this.state.completed)
            })
              }}/><span className={this.state.completed[index]===true?"strike":""}>{doc}</span>
                        <button onClick={()=>{var c=this.state.subtasks
              c.splice(index, 1)
              var d=this.state.completed
              d.splice(index, 1)
              this.setState({
              subtasks:c,
              completed:d
            }, ()=>{
              this.state.changecompleted(this.state.completed)
              this.state.changesubtasks(this.state.subtasks)
            })}}>delete</button>
                        
                      </div>
                      
                    )
                  })
                }
            </div>
        </div>
      )
             
      
    
    
    
  }
}



  
 
 

export default Subtask;
