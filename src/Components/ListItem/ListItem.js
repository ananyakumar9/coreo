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
        
    })
  }

  render()
  {
    if(this.state.loaded)
    {
      return(
        <div>
          <div className='w-70 bg-black center '>
                {this.state.reqdate}<br />
                
                {
                  newlist.map((doc, index)=>{
                    
                    return(
                      <div>
                        
                        <button onClick={()=>{this.state.showsubtask(doc)}} key={index}>{doc.title}</button>
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
