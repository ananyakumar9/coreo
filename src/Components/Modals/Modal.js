import React from 'react';
import './Modal.css'


 var t;
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
  componentDidUpdate(){
    let pr={
      open:false,
      msg:'null',
      color:'red'

    }
    
    this.state.p.open?t=setTimeout(() => this.setState({p:pr}, ()=>console.log("dispp")), 5400):console.log("nothing");
  }


 
  render()
  {
    
        var cname="content "+this.state.p.color
        var mname="modal "+this.state.p.open
        console.log(cname, mname)
      return(
        <div className={mname} 
        style={{
         opacity: this.state.p.open ? '1' : '0'
          }}>
            <div className={cname}>
               {
               this.state.p.msg
               }
              <button className="crossbutton bg-black" onClick={()=>{var toggle=this.state.p
                toggle={
                    ...toggle,
                    open: !toggle.open
                }
                this.setState({
                    p:toggle
                }, ()=>{
                  
                })}}>
                  <span >&times;</span>
              </button>
            </div>
        </div>
      ) 
  
}
}
  
 
 

export default Modal;
