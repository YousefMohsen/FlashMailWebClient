import React, { Component } from 'react';
import './SentMessages.css'
import DataStore from '../../Data/DataStore'
import { connect } from "react-redux"
import ActionFactory from '../../Data/redux/actions'
import dispatch from '../../Data/redux/reducer';

/**
 * Sent messages page. 
 * One of four main pages
 */
class SentMessages extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.selectMsg = this.selectMsg.bind(this)
    this.renderMsgList = this.renderMsgList.bind(this)
    this.renderTeamInbox = this.renderTeamInbox.bind(this)
  }
/**
 * fetch teamlist to render in droplist when the component mounts
 */
  componentDidMount() {
    DataStore.fetchTeamList();

  }


  handleTeamChange = async (event) => {
    DataStore.getMsgTeamInfo(event.target.value);
    this.props.resetInboxState()
  }

 /**
   * returns a droplist with team names
   */
  renderTeamList() {
    let optionsToRender = null;
    let teamList = this.props.teamList;
    if (teamList) {
      optionsToRender = teamList.map((team, index) => {
        return <option value={team}>{team}</option>
      });

    } else {
      <option value=""></option>

    }
    return <select onChange={this.handleTeamChange}> {optionsToRender} </select>;
  }


/**
 * renders the selected teams messageinbox
 */
  renderTeamInbox() {
    let team = this.props.selectedMsgTeam;
    if (team) {
      return (
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
    else {
      return (<h1>Choose a team</h1>)
    }
  }

/**
 * renders a clickable list of the selected teams messages
 * @param {[Message]} msgList - List of message objects
 */
  renderMsgList(msgList) {


    if (!msgList) return <h1>No messages</h1>

    else {
      if (!this.props.selectedMessage) { this.selectMsg(msgList[0]) }
      return (
        <div className="studentList">
          <ul className="list-group">
            {msgList.map((msg) => {
              let isSelected = this.props.selectedMessage === msg;
              return <li className={isSelected ? "list-group-item selected" : "list-group-item"} onClick={() => this.selectMsg(msg)} >{msg.title}</li>;
            })}
          </ul>
        </div>
      )
    }

  }
/**
 * Renders message content
 */
  renderMsgText() {
    let message = this.props.selectedMessage
    if (message) {
      return (
        <div className="messageCard">
          <h4><strong>Title: </strong>{message.title}</h4>
          <strong>Message: </strong>
          <p>{message.msg}</p>
          <p><strong>Sender:</strong> {message.sender.name}</p>
          <p><strong>Sent:</strong> {message.dateSent.slice(0, 10) + " " + message.dateSent.slice(11, 16)}</p>
        </div>
      )
    }
    else {
      return (<h1>Choose a student</h1>)
    }

  }
/**
 * updates the selected message in state
 * @param {Message} msg - message object 
 */
  selectMsg(msg) {
    this.props.selectMsg(msg)
  }
  render() {
    const teamSelector = this.renderTeamList();
    const teamInbox = this.renderTeamInbox();

    return (
      <div>
        <div className="header">
          <h1>Sent messages </h1>
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

    updateTeamList: (val) => dispatch(ActionFactory.updateTeamList(val)),
    selectMsg: (val) => dispatch(ActionFactory.selectMessage(val)),
    resetInboxState: () => dispatch(ActionFactory.resetInboxState())

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SentMessages)