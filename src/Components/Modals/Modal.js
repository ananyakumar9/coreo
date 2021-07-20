import React from 'react';
import './Modal.css'


 
class Modal extends React.Component{
  constructor(props)
  {
    super(props)
    console.log(props)
    this.state={
     p:props.content
      
    }
    
    
  }
  showmodal(req) {
    this.setState({ p:req }, ()=>{
      
      
    });
  }

  
 
  render()
  {
    
        var cname="content "+this.state.p.color
        var mname="modal "+this.state.p.open
      return(
        <div className={mname}>
            <div className={cname}>
               {
              this.state.p.msg
          }
          <button onClick={()=>{var toggle=this.state.p
          toggle={
              ...toggle,
              open: !toggle.open
          }
        this.setState({
            p:toggle
        })}}><span >&times;</span></button>
            </div>
          
        </div>
      )
             
      
    
    
    
  
  
}


}
  
 
 

export default Modal;
