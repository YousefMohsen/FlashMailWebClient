import React, { Component } from 'react';
import './MsgForm.css'
import axios from 'axios';
import {observer} from "mobx-react";
import  {mobx} from "mobx";
import DataStore from '../../Data/DataStore';

@observer
class MsgForm extends Component {

    constructor(props) {
        super(props);
        this.state = {formData:{}};


        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSenderChange = this.handleSenderChange.bind(this);
        this.handleMsgChange = this.handleMsgChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        
        



        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTeamList = this.renderTeamList.bind(this);
        
        
        
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
          handleTeamChange(event){

            var newData =  this.state.formData;
            newData.team =  event.target.value;
            this.setState({formDate: newData});

          }
    handleSubmit(event) {

      event.preventDefault();
      const formData = this.state.formData;
      
DataStore.sendNewMessage(formData)


      // get our form data out of state


      }

      renderTeamList(nTeamList){
        
        console.log(nTeamList);
        
                var result = nTeamList.map((team) => {
             return <option value={team}>{team}</option> });
                    
               
        
         return <select  onChange={this.handleTeamChange}><option value="" disabled="disabled" selected="selected">Vælg modtager</option> {result} </select>;
        
            }
  render() {

    const teamList = DataStore.Teams;
    console.log(teamList.slice());
    const resultList = this.renderTeamList(teamList);
    
    return (
      <div>
      <div className="App-header1">
      
      <h1>Ny besked</h1>
  
  </div>

        <form onSubmit={this.handleSubmit} className="formStyle">
        {resultList}
          <input type="text" placeholder="Titel.." onChange={this.handleTitleChange}/>
      
        <br/>
        
        
       
   
      <br/>
      <textarea type="text" placeholder="Skriv en besked" onChange={this.handleMsgChange}/>
      
    
      <br/>

        <input type="submit" value="Send" />
      </form>
        

      </div>
    );
  }
}

export default MsgForm;
