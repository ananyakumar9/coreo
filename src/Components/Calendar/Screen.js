import moment from 'moment';
import React from 'react';
import firebase from '../../Config/firebase'


import './Cal.css'
const db=firebase.firestore()
var k;
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
            reqdate:moment().get("date")
        }
        
        
        this.getquotes()
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
        author: data.author,
        

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
                <span>Welcome, </span>
                {
                    this.state.username
                }
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
                <br />
                <br />
                <div>
                    
                
                    <div className="calendar">
                    <div className="months-bar">
                    {this.month()}
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


                        {this.year()}
                        <select className="months-popup" onChange={this.handlechangeyear} value={this.year()}>
                            
                            
                        {
                            
                            this.state.months.map((data, index)=>{
                                k=parseInt(this.year())
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
                </div>
            </div>
        )
    }
}
export default Screen