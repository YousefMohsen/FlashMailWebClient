import React, { Component } from 'react';
import './NewTeam.css'
import DataStore from '../../Data/DataStore'
import { connect } from "react-redux"
import { UpdateTeamList } from "../../Data/redux/reducer"
/**
 * New team page. 
 * One of four main pages
 */
class NewTeam extends Component {

  constructor(props) {
    super(props);
    this.state = { formData: {} };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseInput = this.parseInput.bind(this);
    this.renderFormatExample = this.renderFormatExample.bind(this);

  }



  /**
   *  Gets formdata from state and creates new team with that data
   * @param {SyntheticEvent} event - SyntheticEvent 
   */
  handleSubmit(event) {
    event.preventDefault();
    let newTeam = this.parseInput(this.state.formData);
    console.log(newTeam);
    if (newTeam === null) {
      alert("Unvalid input!")
    }
    else {
      DataStore.createNewTeam(newTeam)
        .then(() => {
          alert("A new team was created!")
          DataStore.fetchTeamList();
        })
        .catch((er) => {
          console.log(er)
          alert("Something went wrong..\n The team was not created")
        })

      // console.log( event.target.submit())'

    }


  }
  handleNameChange(event) {
    var newData = this.state.formData;
    newData.name = event.target.value;
    this.setState({ formDate: newData });

  }
  handleTeamChange(event) {
    var newData = this.state.formData;
    newData.teamList = event.target.value;
    this.setState({ formDate: newData });
  }
/**
 *  converts inputfields data to server readable format
 * @param {formData} formData - formData object from state
 */
  parseInput(formData) {
    console.log(formData.teamList)

    if (formData.name && formData.teamList) {
      console.log("in if ")
      var result = { teamName: formData.name, teamList: [{}] };

      formData.teamList.split(",").map((student) => {
        var studentName = student.substring(student.indexOf("“") + 1, student.indexOf("\""));
        var studentEmail = student.substring(student.indexOf("<") + 1, student.indexOf(">")).replace(/ /g, '');
        result.teamList.push({ name: studentName, mail: studentEmail, teams: [formData.name] });
        console.log(result);

      });
      return result;


    }

    else {
      console.log("in else ");
      return null
    }


  }



/**
 * Renders example
 */
  renderFormatExample() {
    return (
      <div className="exampleText">
        <h1>Use following format </h1>
        <p> <strong>{textFormat}</strong></p>
        <h6><strong>Example:</strong></h6>
        <textarea type="text" disabled={true} value={exampleText} />
      </div>
    )

  }
  render() {

    let formatExample = this.renderFormatExample();

    return (
      <div>
        <div className="header">
          <h1>Create a new team</h1>
        </div>
        <div className="twoColmContainer">
          <div className="col1">
            <form onSubmit={this.handleSubmit} className="formStyle">
              <input type="text" placeholder="Name.." onChange={this.handleNameChange} />
              <br />
              <textarea type="text" placeholder="Insert a team list.."
                onChange={this.handleTeamChange} />
              <br />
              <input className="submitBtn" type="submit" value="Create team" />
            </form>
          </div>
          <div className="col1">
            {formatExample}

          </div>
        </div>

      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {

    updateTeamList: (val) => dispatch({ type: UpdateTeamList, val: val }),

  }
}
export default connect(mapDispatchToProps)(NewTeam)


const exampleText = '“Søren Kirkegaard" < søren@cphbusiness.dk >, \n “Jørgen Læssøe" < jørgen@cphbusiness.dk >,\n “Jostein Gaarder" < jostein@cphbusiness.dk >,\n “Fernando Savater" < fernando@cphbusiness.dk >,'
const textFormat = ' “Students Full Name" < Students Email >,';
