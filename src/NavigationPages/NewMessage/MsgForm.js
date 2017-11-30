import React, { Component } from 'react';
import './MsgForm.css'
import axios from 'axios';
import DataStore from '../../Data/DataStore';
import {connect} from "react-redux"
import { INCREMENT, DECREMENT, RESET,UpdateTeamList } from "../../Data/redux/reducer"


class MsgForm extends Component {

    constructor(props) {
        super(props);
        this.state = {formData:{}};
console.log(this.props)

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSenderChange = this.handleSenderChange.bind(this);
        this.handleMsgChange = this.handleMsgChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        
        



        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTeamList = this.renderTeamList.bind(this);
        
        
        
      }


      componentDidMount(){
DataStore.fetchTeamList();
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

      renderTeamList(){
        let optionsToRender = null;
        let teamList = this.props.teamList;
      if(teamList){
console.log("In RENDER TEAN",teamList);
        //if(!this.state.selectedTeam){ DataStore.getTeamInfo(nTeamList[0]).then((selectedTeam)=>this.setState({selectedTeam: selectedTeam}));}
        optionsToRender = teamList.map((team,index) => {
             return <option value={team}>{team}</option> });
                    
        }else{
          <option value="">nope</option>

        }





        return <select  onChange={this.handleTeamChange}> {optionsToRender} </select>;
        
            }

  render() {

    const teamList = this.props.teamList//DataStore.Teams;
    const resultList = this.renderTeamList(teamList);
    
    return (
      <div>
      <div className="App-header1">
      
      <h1>Ny besked {this.props.count}</h1>
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
function mapStateToProps(state) {
  return {
    teamList: state.teamList
  };
}
const mapDispatchToProps = dispatch => {
  return {

    updateTeamList: (val)=> dispatch({ type: UpdateTeamList, val:val }),
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MsgForm)