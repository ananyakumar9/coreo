
import React from 'react'
import moment from 'moment';
import firebase from '../../Config/firebase'


const db=firebase.firestore()

var x='',y='';
var pr;
var newlist=[]
class DDay extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            showmodal:props.showmodal,
            user: props.user,
            dday:[],
            loaded:false,
        }

        
            this.getdata();
    }
    getdata(){
        db.collection(this.state.user).doc("d-day")
        .get().then((querySnapshot) => {
            
            
            
            if(querySnapshot.data()=='undefined' || querySnapshot.exists==false)
            {
                
                this.setState({
                    loaded:false
                }, ()=>{
                    this.getdata();
                });
            }
            else{
                console.log(querySnapshot.data())
                newlist=querySnapshot.data().dday;
            }
                
            
            this.setState({
                loaded: true
            }, ()=>{
               
            })
            
        })
      }
    
    render(){
       
        return(
            
            <div>
                    dday details<br />
                    Title: <input id="input-field" onChange={(e)=>{x=e.target.value}}/><br />
                    
                    Date: <input  id="input-field" type="date" data-date-format="DD-YYYY-MM" onChange={(e)=>{y=moment(e.target.valueAsDate).format('DD-MM-YYYY'); }}/><br />
                    <button onClick={()=>{
                        if(x===''||y==='')
                        {
                            pr={
                                color:'red',
                                msg:"Title or Date cannot be left blank",
                                open:true,
                            }
                            this.state.showmodal(pr);
                        }
                        else
                        {
                            var newd={

                            title:x,
                            date: y,

                                };
                        newlist.push(newd);
                            db.collection(this.state.user).doc("d-day").set({
                                dday:newlist,
                            }).then(() => {
                            
                            
                            
                            pr={
                                color:'green',
                                msg:"D-Day successfully written!",
                                open:true,
                            }
                            this.state.showmodal(pr)
                            Array.from(document.querySelectorAll("input")).forEach(
                                input => (input.value = "")
                            );
                            Array.from(document.querySelectorAll("date")).forEach(
                                input => (input.value = "")
                            );
                            this.setState({
                                dday:newlist,
                            })
                        })
                        .catch((error) => {
                            
                            pr={
                                color:'red',
                                msg:"Error writing document: "+ error,
                                open:true,
                            }
                            this.state.showmodal(pr)
                        });
                }
            
            }}>new dday
            </button>


            {
                this.state.loaded&&newlist.length>0?
                newlist.map((doc, index)=>{
                    var today=moment().format("DD-MM-YYYY")
                    var startDate = moment(doc.date, "DD-MM-YYYY");
                    var endDate = moment(today, "DD/MM/YYYY");
                    var dateDiff = startDate.diff(endDate, "days");
                    
                    return(
                        <div>
                            {index+1}) {doc.title}:{doc.date}<br/>
                            {
                                dateDiff>=0?
                                <div className="green">
                                    days left:{dateDiff}
                                </div>:
                                <div>
                                days passed:{-dateDiff}
                                </div>
                                
                            }
                            <br />
                            
                            <button onClick={()=>{
                                    newlist.splice(index, 1)
                                    db.collection(this.state.user).doc("d-day").set({
                                        
                                        dday: newlist
                                      })

                                      this.setState({},()=>{})
                            }}>delete</button>
                            <hr />
                            <br />
                        </div>
                    )
                }):
                    <div>
                        no lists
                    </div>
                
            }
            </div>
        )
    }
}
export default DDay;