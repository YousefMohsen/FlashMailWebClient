import React, { Component } from 'react';
import './SentMessages.css'
import DataStore from '../../Data/DataStore'
import {connect} from "react-redux"
import ActionFactory from '../../Data/redux/actions'
import dispatch from '../../Data/redux/reducer';


class SentMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {};
this.handleTeamChange = this.handleTeamChange.bind(this);
this.selectMsg = this.selectMsg.bind(this)
this.renderMsgList = this.renderMsgList.bind(this)
this.renderTeamInbox = this.renderTeamInbox.bind(this)
console.log(props);     
}

      componentDidMount(){
        DataStore.fetchTeamList();
        
              }

 
          handleTeamChange= async(event)=>{

            DataStore.getMsgTeamInfo(event.target.value);
            this.props.resetInboxState()

          }


      renderTeamList(){
        let optionsToRender = null;
        let teamList = this.props.teamList;
      if(teamList){
        optionsToRender = teamList.map((team,index) => {
             return <option value={team}>{team}</option> });
                    
        }else{
          <option value=""></option>

        }





        return <select  onChange={this.handleTeamChange}> {optionsToRender} </select>;
        
            }



            renderTeamInbox(){
          let team = this.props.selectedMsgTeam;
          if(team){
            
            return(
              <div className="container-fluid  msgBoxContainer">
              <br />
              <div className="row">
              <div className="col-sm-6 messageList">
              
              {this.renderMsgList(team.messages)}
              </div>

              <div className="col-sm-6 messageCard" >
              
           {this.renderMsgText()}
           </div>
           

              </div>
              </div>
              
            )
            
          }
          else{
            return(<h1>Vælg et hold</h1>)
          }
         }   

//              

renderMsgList(msgList){

  
           if(!msgList)return <h1>No messages</h1>
          
          else{
            if(!this.props.selectedMessage){this.selectMsg(msgList[0]) }
            return(
            <div className="studentList">
            <ul className="list-group">
            {msgList.map((msg)=>{
            let isSelected = this.props.selectedMessage === msg;

              return <li className={isSelected? "list-group-item selected":"list-group-item"} onClick={()=>this.selectMsg(msg)} msg="heej" >{msg.title}</li>;

            })}

            </ul>
            </div>
          )}

         }

         renderMsgText(){
          let message = this.props.selectedMessage
          
          if(message){
            console.log(message.dateSent)
            
            return(
              
              <div className="messageCard">

              <h4><strong>Titel: </strong>{message.title}</h4>
              <strong>Besked: </strong>
              <p>{message.msg}</p>
              <p><strong>Afsender:</strong> {message.sender.name}</p>
              <p><strong>Sendt:</strong> {message.dateSent.slice(0,10)+ " "+ message.dateSent.slice(11,16)}</p>
              
             
            </div>
            )
          }
          else{
            return(<h1>vælg en studerende</h1>)
          }

         }

         selectMsg(msg){

            this.props.selectMsg(msg)

        }
  render() {
    const teamSelector = this.renderTeamList();
  const teamInbox = this.renderTeamInbox();
    
    return (
      <div>
      <div className="header">
      
      <h1>Sendte beskeder </h1>
  
  </div>
<div>
        {teamSelector}
        </div>
<div>

<div>
{teamInbox}
</div>

</div>



      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

    selectedMsgTeam: state.selectedMsgTeam,
    teamList: state.teamList,
    selectedMessage: state.selectedMessage

  };
}
const mapDispatchToProps = dispatch => {
  return {

    updateTeamList: (val)=> dispatch(ActionFactory.updateTeamList(val)),
    selectMsg: (val)=> dispatch(ActionFactory.selectMessage(val) ),
    resetInboxState: () => dispatch(ActionFactory.resetInboxState())
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SentMessages)