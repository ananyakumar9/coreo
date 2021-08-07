import moment from 'moment';
import React from 'react';
import firebase from '../../Config/firebase'


import './Cal.css'
const db=firebase.firestore()
var k, newlist=[], displaydday=0;
//https://momentjs.com/docs/#/get-set/month/
class Screen extends React.Component{
    constructor(props)
    {
        
        super(props)
       
       
        this.state={
            user:props.user,
            username:'user',
            quote:'',
            author:'',
            momentContext: moment(),
            weekdays:moment.weekdays(),
            weekdaysshort:moment.weekdaysShort(),
            months:moment.months(),
            todayDay: moment().get("date"),
            thisMonth: moment().format("MMMM"),
            thisYear: moment().format("Y"),
            reqdate:moment().get("date"),
            time: new Date()
        }
        
        displaydday=0;
        this.getquotes()
        this.getdata()
    }
    getdata(){
        db.collection(this.state.user.uid).doc("d-day")
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
                
                    
                var endDate = moment(moment().format("DD-MM-YYYY"), "DD/MM/YYYY");
                newlist=querySnapshot.data().dday;
                for(var i=0;i<newlist.length;i++)
                {
                    
                    if(moment(newlist[i].date, "DD-MM-YYYY").diff(endDate, "days")<=7  &&moment(newlist[i].date, "DD-MM-YYYY").diff(endDate, "days")>=0)
                    {
                        displaydday=newlist[i].date+': '+newlist[i].title;
                        break;
                    }

                }
                
                if(displaydday==0)
                {
                    displaydday='no recent dday'
                }
            }
                
            
            this.setState({
                loaded: true
            }, ()=>{
               
            })
            
        })
      }
    getquotes=async ()=>{
        await db.collection(this.state.user.uid).doc('user-data').get().then((querySnapshot) => {
            
            this.setState({
                username:querySnapshot.data().name,
            })
        })
        //https://github.com/lukePeavey/quotable#get-random-quote
        await fetch('https://api.quotable.io/random?maxLength=40')
        .then(response => {
            
            return(response.json());
        }).then(data=>{
            
            this.setState({
                quote: data.content,
                author: data.author
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    year=()=>{
        return this.state.momentContext.format("Y");
    }

    month=()=>{
        return this.state.momentContext.format("MMMM");
    }

    daysIMonth=()=>{
        return this.state.momentContext.daysInMonth();
    }

    curdate=()=>{
        return this.state.momentContext.get("date");
    }
    curday=()=>{
        return this.state.momentContext.format("D");
    }

    firstDayOfMonth=()=>{
        return moment(this.state.momentContext).startOf('month').format('d')
    }

    handlechange=(e)=>{
        this.setState({
            momentContext:moment(this.state.momentContext).set('month', this.state.months.indexOf(e.target.value))

        }, ()=>{
            
            
        })
    }
    handlechangeyear=(e)=>{
        
    
        this.setState({
            momentContext:moment(this.state.momentContext).set('year', e.target.value)

        }, ()=>{
            
        })
    }
    componentDidMount() {
        this.update = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1 * 1000); 
      }
      componentWillUnmount() {
      clearInterval(this.update);
      }
    render(){
        let blanks=[]
        
        for(let i=0;i<this.firstDayOfMonth();i++)
        {
            blanks.push(<span className="day" key={(i+1)*40}>{" "}</span>)
        }
        
        let daysM=[]
        for(let i=1;i<=this.daysIMonth();i++)
        {
            let c=(i===this.curdate() && this.month()===this.state.thisMonth && this.year()===this.state.thisYear )?"day cur-date": "day"
            c+=(this.state.reqdate===i+"-"+this.month()?" active":'')
            daysM.push(<span key={i} className={c} onClick={()=>{
                this.props.reqdatechange(moment(i+"."+this.month()+"."+this.year()).format("DD-MM-YYYY"))
                this.setState({
                    reqdate:i+"-"+this.month()
                }, ()=>{
                   
                })
            }}>{i}</span>)
        }

        daysM=[...blanks, ...daysM]
        
        //console.log(daysM)
        return(
            <div>
                <span className="f3">Welcome, {
                    firebase.auth().currentUser.displayName
                }</span>
                <br />
                {
                    this.state.quote
                }
                <br />
                {
                    this.state.author
                }

                <br />
                <br />
                <div>
                    
                
                    <div className="calendar">
                    <div className="months-bar">
                    {//this.month()
                    }
                        <select className="months-popup" onChange={this.handlechange} value={this.month()}>
                            
                            
                        {
                            
                            this.state.months.map((data)=>{
                                return (
                                    <option value={data}>
                                        {data}

                                    </option>
                                )
                            })
                            
                        }
                        </select>


                        {//this.year()
                        }
                        <select className="months-popup" onChange={this.handlechangeyear} value={this.year()}>
                            
                            
                        {
                            
                            this.state.months.map((data, index)=>{
                                k=parseInt(this.state.thisYear)
                                return (
                                    <option value={k+index}>
                                        {k+index}

                                    </option>
                                )
                            })
                            
                        }
                        </select>

                    </div>

                        
                        
                        <div  className="Alldays">
                        {
                            this.state.weekdaysshort.map((days)=>{
                                return (
                                    <span key={days} className="daysOfWeek">{days}</span>

                                )
                                
                            })
                        }
                        </div>
                        <div className="Alldays">
                        {
                            daysM.map((d)=>{
                                return (
                                    d
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="f4 pa3 mt2">{this.state.time.toLocaleTimeString()}</div>
            
                    <center>
                        <div className="bt br bl w-50 pa1 b--white-10">
                            <div className="underline pa1">Upcoming Events</div>
                        {displaydday}
                        </div>
                  
                </center>
                </div>
            </div>
        )
    }
}
export default Screen