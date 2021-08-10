import React from 'react';
import firebase from '../../Config/firebase'


 const db=firebase.firestore()
 var newlist=[]
 
class ListItem extends React.Component{
  constructor(props)
  {
    super(props)
    
    this.state={
      user:props.user,
      reqdate:props.requiredDate,
      loaded: false,
      showsubtask: props.showsubtask
    }
    this.getdata()
    
  }
  datemethod(req) {
    this.setState({ reqdate: req }, ()=>{
      
      this.getdata();
    });
  }

  
  getdata(){
    db.collection(this.state.user).where("date", "==", this.state.reqdate)
    .get().then((querySnapshot) => {
        newlist=[]
        
        querySnapshot.forEach((doc) => {
            var k={
                id: doc.id,
                ...doc.data()
              }
              
              newlist.push(k)
              
            
        })
        this.setState({
          loaded: true
        }, ()=>{
          
        })
        
    }).catch((error)=>
    {
      var pr={
        open:true,
        msg:error.message,
        color:'red'
      }
      this.state.showmodal(pr);
      console.log(error)
      
    })
  }

  render()
  {
    if(this.state.loaded)
    {
      return(
        <div>
          <div className='w-70 bg-black center'>
               <div className="pv2"> {this.state.reqdate}<br /></div>
                
                {
                  newlist.map((doc, index)=>{
                    
                    return(
                      <div>
                        
                        <a href="#carousel__slide2">
                          <button className="custombutton grow" 
                          onClick={()=>{this.state.showsubtask(doc);
                          this.props.updateSlide(true);}} 
                          key={index}>
                          {doc.title}
                          </button>
                        </a>
                        </div>
                      
                    )
                  })
                }
            </div>
        </div>
      )
              }
      else{
        return(
          <div>loading</div>
        )
      }
  }
}



  
 
 

export default ListItem;
