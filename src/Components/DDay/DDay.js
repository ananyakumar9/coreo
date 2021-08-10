
import React from 'react'
import moment from 'moment';
import firebase from '../../Config/firebase'
import './DDay.css'

const db=firebase.firestore()

var x='',y='';
var pr;
var newlist=[];
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
            
            <div className="br2 h-500px ba white b--white-10 shadow-5 dday">
                <div className="tl">
                    <button className="crossbutton" onClick={()=>{this.props.updateSwitch(false)}}>
                        X
                    </button>
                </div>
                    <div className="pa2 ma2 b f3">EVENT DETAILS</div><br/>
                    <div className="center pa2" style={{display:'flex',justifyContent:'center'}}>
                    <div className="tl mr4">
                        Title: <br/><input id="input-field" onChange={(e)=>{x=e.target.value}}/><br/><br/>
                    
                        Date: <br/><input  id="input-field" type="date" data-date-format="DD-YYYY-MM" onChange={(e)=>{y=moment(e.target.valueAsDate).format('DD-MM-YYYY'); }}/><br />
                    </div>
                    <div style={{alignSelf:'center'}} className="ma3">
                    <button className="custombutton grow pa2 ma2" onClick={()=>{
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
                                x='';
                                y='';
                            newlist.push(newd);
                            var today=moment().format("DD-MM-YYYY")
                    
                            var endDate = moment(today, "DD/MM/YYYY");
                    
                            newlist.sort((a, b) => moment(a.date, "DD-MM-YYYY").diff(endDate, "days")  - moment(b.date, "DD-MM-YYYY").diff(endDate, "days"))
                            console.log(newlist)
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
            
            }}>New DDay
            </button></div>
            </div>
            <br />
            <br />


            {
                this.state.loaded&&newlist.length>0?
                newlist.map((doc, index)=>{
                    var today=moment().format("DD-MM-YYYY")
                    var startDate = moment(doc.date, "DD-MM-YYYY");
                    var endDate = moment(today, "DD/MM/YYYY");
                    var dateDiff = startDate.diff(endDate, "days");
                    
                    return(
                        <div className="actualday mh5" style={{display:'flex',justifyContent:'space-between'}}>
                            <div className="w-33 tl">{index+1+")"} {doc.title}:{doc.date}
                            </div>
                            {
                                dateDiff>=0?
                                <div className="green">
                                    days left:{dateDiff}
                                </div>:
                                <div>
                                days passed:{-dateDiff}
                                </div>
                                
                            }
                            <div style={{alignSelf:'flex-start'}}>
                            <button className="crossbuttonlist" 
                             onClick={()=>{
                                    newlist.splice(index, 1)
                                    db.collection(this.state.user).doc("d-day").set({
                                        
                                        dday: newlist
                                      })

                                      this.setState({},()=>{})
                            }}>X</button>
                            <br />
                            </div>
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