import React, { Component } from 'react';
import logo from './logo.svg'
import './App.css';
import axios from 'axios';

class MsgForm extends Component {

    constructor(props) {
        super(props);
        this.state = {formData:{}};
    


        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSenderChange = this.handleSenderChange.bind(this);
        this.handleMsgChange = this.handleMsgChange.bind(this);
        



        this.handleSubmit = this.handleSubmit.bind(this);
      }


      getTeamlist(){

        
      }


      handleTitleChange(event){
      var newData =  this.state.formData;
      newData.title =  event.target.value;
      this.setState({formDate: newData});
        

      }
      handleSenderChange(event){
        var newData =  this.state.formData;
        newData.sender =  event.target.value;
        this.setState({formDate: newData});
          
  
        }
        handleMsgChange(event){
          var newData =  this.state.formData;
          newData.msg =  event.target.value;
          this.setState({formDate: newData});
            
    
          }
    handleSubmit(event) {

      event.preventDefault();
      

      // get our form data out of state
      const formData = this.state.formData;
      console.log('A msg was submitted. Title: ' + formData.title);
      axios.post('http://localhost:5000/msg/new', formData)
        .then((result) => {
          
          //access the results here....
        });
   // console.log( event.target.submit())

      }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LektAPP</h1>
        </header>
       
        <form onSubmit={this.handleSubmit}>
      
          <input type="text" placeholder="Title.." onChange={this.handleTitleChange}/>
      
        <br/>
        <input type="text" placeholder="Sender.." onChange={this.handleSenderChange} />
        
       
   
      <br/>
      <textarea type="text" placeholder="Type your message" onChange={this.handleMsgChange}/>
      
    
      <br/>
        <input type="submit" value="Submit" />
      </form>
        

      </div>
    );
  }
}

export default MsgForm;
