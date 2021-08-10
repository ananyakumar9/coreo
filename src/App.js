import React, { Component } from 'react';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register'; 
import Home from './Components/Home/Home';
import Navigation from './Components/Navigation/Navigation';
import Settings from './Components/Settings/Settings';
import DDay from './Components/DDay/DDay';
import Modal from './Components/Modals/Modal';
import './App.css';

var pr;
class App extends Component{
  constructor(){
    super();
    this.state={
      route:'SignIn',
      user:0
    }
    this.navref=React.createRef();
    this.myModal=React.createRef();
    pr={
      open:false,
      color:'red',
      msg:'null'
    }
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
      <Modal content={pr} ref={this.myModal}/>
      <Navigation onRouteChange={this.onRouteChange} route={this.state.route} ref={this.navref}/>
      {this.state.route==='SignIn'?
      <SignIn onRouteChange={this.onRouteChange} onUserChange={this.onUserChange} showmodal={(p)=>{this.myModal.current.showmodal(p)}}/>
      :this.state.route==='Register'?
      <Register onRouteChange={this.onRouteChange} onUserChange={this.onUserChange} showmodal={(p)=>{this.myModal.current.showmodal(p)}}/>
      :this.state.route==='Settings'?
      <Settings onRouteChange={this.onRouteChange} user={this.state.user} updatenavbar={()=>this.navref.current.updatenavbar('Settings')} showmodal={(p)=>{this.myModal.current.showmodal(p)}}/>
      :this.state.route==='Home'?
      <Home user={this.state.user} onRouteChange={this.onRouteChange}/>
      :this.state.route==='DDay'?
      <DDay onRouteChange={this.onRouteChange} user={this.state.user.uid}/>
      :' Loading '
      }
    </div>
  );
}
}

export default App;
