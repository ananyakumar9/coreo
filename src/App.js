import React, { Component } from 'react';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register'; 
import Home from './Components/Home/Home';
import Navigation from './Components/Navigation/Navigation';
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state={
      route:'SignIn',
      user:0
    }
  }

  onRouteChange=(route)=>{
    this.setState({route:route});
  }
onUserChange=(user)=>{
  console.log(user)
  this.setState({user:user})
}
  render(){
  return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange} route={this.state.route} />
      {this.state.route==='SignIn'?
      <SignIn onRouteChange={this.onRouteChange} onUserChange={this.onUserChange}/>
      :this.state.route==='Register'?
      <Register onRouteChange={this.onRouteChange} onUserChange={this.onUserChange}/>:
      
        !this.state.user==0?
      
      <Home user={this.state.user}/>:' Loading '
      }
    </div>
  );
}
}

export default App;
