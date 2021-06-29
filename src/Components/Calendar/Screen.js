import moment from 'moment';
import React from 'react';
import './Cal.css';
//https://momentjs.com/docs/#/get-set/month/
class Screen extends React.Component{
    constructor(props)
    {
        super(props)
        
        this.state={
            name:props.dets.name,
            quote:'',
            author:'',
            momentContext: moment(),
            showMonthPopup:false,
            showYearPopup:false,
            weekdays:moment.weekdays(),
            weekdaysshort:moment.weekdaysShort(),
            months:moment.months(),
            todayDay: moment().get("date"),
            thisMonth: moment().format("MMMM"),
            thisYear: moment().format("Y")
        }
        
        this.getquotes()
    }
    getquotes=async ()=>{
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
        console.log(e.target.value)
        var index=this.state.months.indexOf(e.target.value);
        let con=moment(this.state.momentContext).set('month', index);
        this.setState({
            momentContext:con

        }, ()=>{
            
            console.log(this.daysIMonth())
        })
    }
    
    render(){
        let blanks=[]
        
        for(let i=0;i<this.firstDayOfMonth();i++)
        {
            blanks.push(<span className="day">{" "}</span>)
        }
        
        let daysM=[]
        for(let i=1;i<=this.daysIMonth();i++)
        {
            let c=(i===this.curdate() && this.month()===this.state.thisMonth && this.year()===this.state.thisYear)?"day cur-date": "day"
            daysM.push(<span key={i} className={c} onClick={()=>console.log(i+" "+this.month())}>{i}</span>)
        }

        daysM=[...blanks, ...daysM]
        
        //console.log(daysM)
        return(
            <div>
                {
                    this.state.name
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
                <div>
                    
                
                    <div className="calendar">
                    <div className="months-bar">
                    {this.month()}
                        <select className="months-popup" onChange={this.handlechange}>
                            
                        {
                            !this.state.showMonthPopup?
                            this.state.months.map((data)=>{
                                return (
                                    <option value={data}>
                                        {data}

                                    </option>
                                )
                            }):
                            ''
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