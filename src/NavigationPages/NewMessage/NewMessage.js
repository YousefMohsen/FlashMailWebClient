import React, { Component } from 'react';
import './NewMessage.css'
import DataStore from '../../Data/DataStore';
import { connect } from "react-redux"
import { UpdateTeamList } from "../../Data/redux/reducer"
/**
 * New message page. 
 * One of four main pages
 */

class NewMessage extends Component {

  constructor(props) {
    super(props);

    this.state = { formData: {} };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSenderChange = this.handleSenderChange.bind(this);
    this.handleMsgChange = this.handleMsgChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTeamList = this.renderTeamList.bind(this);



  }


  componentDidMount() {
    DataStore.fetchTeamList();
  }


  handleTitleChange(event) {
    var newData = this.state.formData;
    newData.title = event.target.value;
    this.setState({ formData: newData });


  }
  handleSenderChange(event) {
    var newData = this.state.formData;
    newData.sender = event.target.value;
    this.setState({ formData: newData });


  }
  handleMsgChange(event) {
    var newData = this.state.formData;
    newData.msg = event.target.value;
    this.setState({ formData: newData });

  }
  handleTeamChange(event) {
    var newData = this.state.formData;
    newData.team = event.target.value;
    this.setState({ formData: newData });
    console.log("HANDLE TEAM CHANGE", newData)


  }
  /**
   * 
   * Handles sumbmit. Sends data to server
   */
  handleSubmit(event) {
    let formData = this.state.formData;
    if (formData.team && formData.msg && formData.title) {
      DataStore.sendNewMessage(formData)
        .then(() => {
          this.setState({ formData: { team: formData.team, msg: "", title: "" } })
          console.log(this.state.formData)
          this.render();
        })
    }
    else {
      alert("Please fill all fields")
    }

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
    return <select className="teamList" onChange={this.handleTeamChange}><option >Choose a team</option> {optionsToRender} </select>;
  }

  render() {

    const teamList = this.props.teamList//DataStore.Teams;
    const teamSelector = this.renderTeamList(teamList);

    return (
      <div>
        <div className="header">
          <h1>Send message</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="formStyle">
          {teamSelector}
          <input type="text" placeholder="Title.." value={this.state.formData.title} onChange={this.handleTitleChange} />
          <br />
          <br />
          <textarea type="text" placeholder="Type your message here.. " value={this.state.formData.msg} onChange={this.handleMsgChange} />
          <br />
          <input className="submitBtn" type="submit" value="Send" />
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

    updateTeamList: (val) => dispatch({ type: UpdateTeamList, val: val }),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)