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
      route:'SignIn'
    }
  }

  onRouteChange=(route)=>{
    this.setState({route:route});
  }

  render(){
  return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange} route={this.state.route}/>
      {this.state.route==='SignIn'?
      <SignIn onRouteChange={this.onRouteChange}/>
      :[this.state.route==='Register'?
      <Register onRouteChange={this.onRouteChange}/>:
      <Home/>
      ]}
    </div>
  );
}
}

export default App;
