import React, { Component } from 'react';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register'; 
import Home from './Components/Home/Home';
import Navigation from './Components/Navigation/Navigation';
import Settings from './Components/Settings/Settings'
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state={
      route:'SignIn',
      user:0
    }
    this.navref=React.createRef();
  }

  onRouteChange=(route)=>{
    this.setState({route:route});
  }
onUserChange=(user)=>{
  console.log(user)
  this.setState({user:user}, ()=>
  {
    
    this.navref.current.updatenavbar('Home');
  })
}
  render(){
  return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange} route={this.state.route} ref={this.navref}/>
      {this.state.route==='SignIn'?
      <SignIn onRouteChange={this.onRouteChange} onUserChange={this.onUserChange}/>
      :this.state.route==='Register'?
      <Register onRouteChange={this.onRouteChange} onUserChange={this.onUserChange}/>:
      this.state.route==='Settings'?
      <Settings onRouteChange={this.onRouteChange} user={this.state.user} updatenavbar={()=>this.navref.current.updatenavbar('Settings')}/>:
      
        !this.state.user==0?
      
      <Home user={this.state.user}/>:' Loading '
      }
    </div>
  );
}
}

export default App;
