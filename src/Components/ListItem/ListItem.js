import React from 'react';
import firebase from '../../Config/firebase'
 const db=firebase.firestore()
 var newlist=[]
class ListItem extends React.Component{
  constructor(props)
  {
    super(props)
    console.log(props)
    this.state={
      user:props.user,
      reqdate:props.requiredDate,
      loaded: false
    }
    
  }
  componentDidMount(){
    db.collection(this.state.user).where("date", "==", this.state.reqdate)
    .onSnapshot((querySnapshot) => {
        newlist=[]
        querySnapshot.forEach((doc) => {
            var k={
                id: doc.id,
                ...doc.data()
              }
              
              newlist.push(k)
              this.setState({
                loaded: true
              }, ()=>{
        
              })
            
        })
        
    })
  }
  render()
  {
    if(this.state.loaded)
    {
      return(
        <div>
          <div className='w-70 bg-black center h2 br3 ma2'>
                list items<br />
                
                {
                  newlist.map((doc, index)=>{
                    
                    return(
                      <div>
                        
                        <div key={index}>{doc.title}: {doc.desc}</div>
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
