import React from 'react';
import firebase from '../../Config/firebase'
import Subtask from './Subtask'
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
  changesubtasks(sub){
    console.log(sub)
  }
  changecompleted(sub){
    console.log(sub)
  }
  render()
  {
    if(this.state.loaded)
    {
      return(
        <div>
          <div className='w-70 bg-black center h2 br3 ma2'>
                {this.state.reqdate}<br />
                
                {
                  newlist.map((doc, index)=>{
                    
                    return(
                      <div>
                        
                        <div key={index}>{doc.title}: {doc.desc}</div>
                        
                        <input type="button" value="show subtasks" onClick={(e)=>{e.target.nextSibling.classList.toggle("subtask");e.target.value= e.target.nextSibling.classList.contains("subtask")?"show subtask":"hide subtasks";}} ></input>
                        <Subtask className="subtask" subtasks={doc.subtasks} completed={doc.completed} changesubtasks={(subtasks)=>{db.collection(this.state.user).doc(doc.id).set({
                          ...doc,
                          subtasks: subtasks
                        })}} changecompleted={(completed)=>{db.collection(this.state.user).doc(doc.id).set({
                          ...doc,
                          completed: completed
                        })}}>{doc.subtasks}</Subtask>
                        <button onClick={()=>{db.collection(this.state.user).doc(doc.id).delete().then(()=>{console.log("deleted"); this.datemethod(this.state.reqdate)})}}>delete</button>
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
