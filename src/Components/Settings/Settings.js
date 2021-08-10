import React from 'react';
import Modal from '../Modals/Modal';
import firebase from '../../Config/firebase';
import './settings.css';


var x='', y='', z, newPassword, pr={
  open:false,
  msg:'null',
  color:'red'
};
var file=0;
class Settings extends React.Component{
  constructor(props)
  {
    super(props)
    console.log(props);
    this.state={
        onRouteChange:props.onRouteChange,
        user:firebase.auth().currentUser,
        photo: firebase.auth().currentUser.photoURL,
        updatenavbar: props.updatenavbar
    }
    x=this.state.user.displayName;
    y=this.state.user.photoURL;
    z=this.state.user.email;
    this.modalref=React.createRef()
    pr={
      open:false,
      msg:'null',
      color:'red'
    };
  }
  
  changeprofilesettings()
  {
    this.state.user.updateProfile({
      displayName: x,
      //photoURL: y
    }).then(() => {
      
      if(file!=0)
      {
        
        var storageRef = firebase.storage().ref('profilePictures/' +this.state.user.uid+'/'+file.name)
        
        var uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', 
                  (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    pr={
                      color:'blue',
                      msg:'Upload is ' + progress + '% done',
                      open:true
                    };
                    this.modalref.current.showmodal(pr);
                    switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                      case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                  }, 
                  (error) => {
                    pr={
                      color:'red',
                      msg:error.message,
                      open:true
                    };
                    this.modalref.current.showmodal(pr);
                  }, 
                  () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      console.log('File available at', downloadURL);
                      y=downloadURL
                      console.log(y)
      
                          this.state.user.updateProfile({
                            photoURL:y
                          }).then(()=>
                          {
                            this.setState({
                              photo:y
                            }, ()=>{
                              console.log("saved")
                              pr={
                                color:'green',
                                msg:'changes saved successfully',
                                open:true
                              };
                              this.modalref.current.showmodal(pr);
                              this.state.updatenavbar()
                              file=0;
                              
                            })
                          
                          })
                    });
                  }
                );
            
      }
      else{
        pr={
          color:'green',
          msg:'changes saved',
          open:true
        };
        this.modalref.current.showmodal(pr);
      }
    
  
      
      
    
      
    }).catch((error) => {
      pr={
        color:'red',
        msg:error.message,
        open:true
      };
      this.modalref.current.showmodal(pr);
    });
  }
  changeaccountsettings()
  {
    this.state.user.updateEmail(z).then(() => {
      // Update successful
      // ...
    }).catch((error) => {
      pr={
        color:'red',
        msg:error.message,
        open:true
      };
      this.modalref.current.showmodal(pr);
    });
    this.state.user.updatePassword(newPassword).then(() => {
      // Update successful.
      pr={
        color:'green',
        msg:'account details changed',
        open:true
      };
      this.modalref.current.showmodal(pr);
    }).catch((error) => {
      pr={
        color:'red',
        msg:error.message,
        open:true
      };
      this.modalref.current.showmodal(pr);
    });
  }

  render(){
   
      return (
        <div className="settings tl">
          <div>
          <button className="custombutton" onClick={()=>this.state.onRouteChange('Home')}>Back Home</button><br /><br />
          <img src={this.state.photo} ></img><br />
          <Modal ref={this.modalref} content={pr} />
          </div>
          

        <div>
        <div className="settings-grid tl">          
            Change Name: <input id="input-field" onChange={(e)=>{x=e.target.value}} placeholder={this.state.user.displayName}/>
            Change Photo: <input type="file" id="image" onChange={(e)=>{file=e.target.files[0]}} /><br />
            <button className="custombutton w-30 ml0" onClick={ ()=>{this.changeprofilesettings();}}>save changes</button>
        </div>
          
          
        <div className="settings-grid tl">   
        Change Email: <input id="input-field" onChange={(e)=>{z=e.target.value}} placeholder={this.state.user.email}/><br />
        Change Password: <input id="input-field" type="password" onChange={(e)=>{newPassword=e.target.value}} /><br />
        <button className="custombutton w-30 ml0" onClick={()=>{this.changeaccountsettings();}}>save changes</button>
        </div>


          <center>
          <p onClick={()=>{const user = firebase.auth().currentUser;

            user.delete().then(() => {
              // User deleted.
              window.location.reload(true);
              this.state.onRouteChange('SignIn');
            }).catch((error) => {
              // An error ocurred
              // ...
            })}}
            className='pa2 ma2 f4 link dim underline w-40' style={{cursor:'pointer'}}>Delete Account
              </p>
            </center>
        </div>


          
        </div>
        
      );
    }
    
  }
  



export default Settings;
