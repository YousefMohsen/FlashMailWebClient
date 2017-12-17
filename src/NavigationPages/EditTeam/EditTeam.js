import React, { Component } from 'react';
import './EditTeam.css'
import DataStore from '../../Data/DataStore'
import { connect } from "react-redux"
import ActionFactory from '../../Data/redux/actions'

const photoPlaveholder = "https://s3.eu-central-1.amazonaws.com/elillatestbucket/user+(1).png";
/**
 * Edit team page. 
 * One of four main pages
 */

class EditTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.selectStudent = this.selectStudent.bind(this)
    this.renderTeaminfo = this.renderTeaminfo.bind(this);
    this.renderStudenList = this.renderStudenList.bind(this)
    this.renderTeaminfo = this.renderTeaminfo.bind(this)
    console.log(props);
  }

  componentDidMount() {
    DataStore.fetchTeamList();

  }


  handleTeamChange = async (event) => {

    DataStore.getTeamInfo(event.target.value);


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
      <option value="">nope</option>

    }





    return <select className="teamList" onChange={this.handleTeamChange}> {optionsToRender} </select>;

  }



  renderTeaminfo() {
    let team = this.props.selectedTeam;
    if (team) {

      return (
        <div className="container-fluid">
          <br />
          <div className="row">
            <div className="col-sm-6">

              {this.renderStudenList(team.students)}
            </div>

            <div className="col-sm-6" >

              {this.renderStudentInfo()}
            </div>


          </div>
        </div>

      )

    }
    else {
      return (<h1>Choose a team</h1>)
    }
  }

  //              

  renderStudenList(studentList) {

    if (!studentList) return <h1>No students found</h1>

    else {

      return (
        <div className="studentList">
          <ul className="list-group">

            {studentList.map((student) => {
              let isSelected = this.props.selectedStudent === student;

              return <li className={isSelected ? "list-group-item selected" : "list-group-item"} onClick={this.selectStudent.bind(this, student)}>{student.name}</li>;

            })}

          </ul>
        </div>
      )
    }

  }

  renderStudentInfo() {
    let student = this.props.selectedStudent;
    console.log("SELECTEDSTUDENT", student)

    if (student) {
      return (

        <div class="studentInfoContainer">
          <div className="studentInfo">
            <h4 class="title">Name: {student.name}</h4>
            <h4>Email: {student.mail}</h4>
            <h4>Have pohne app: {student.pushToken ? "Yes" : "No"}</h4>
          </div>
          <img src={student.imgUrl ? student.imgUrl : photoPlaveholder} class="studenPhoto" alt="StudentPhoto" />

          <button onClick={this.deleteStudent.bind(this, student)} className="btn btn-danger">Delete student</button> {/* TODO: */}
        </div>
      )
    }
    else {
      console.log("ELSE")
      return (<h1>Holdet har ingen studerende</h1>)

    }

  }

  deleteStudent(student) {
    DataStore.deleteStudentByID(student._id);

  }
  selectStudent(student) {

    //e.target.className = 'active';
    this.props.selectStudent(student)
    console.log("btn clicked", student)
    //  this.state ={data: 'sds'};
  }
  render() {
    const teamSelector = this.renderTeamList();
    const teamInfo = this.renderTeaminfo();

    return (
      <div>
        <div className="header">

          <h1 >Edit teams </h1>

        </div>

        <div className="editTeamContainer">
          {teamSelector}


          <div>
            {teamInfo}
          </div>

        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    teamList: state.teamList,
    selectedTeam: state.selectedTeam,
    selectedStudent: state.selectedStudent
  };
}
const mapDispatchToProps = dispatch => {
  return {

    updateTeamList: (val) => dispatch(ActionFactory.updateTeamList(val)),
    selectStudent: (val) => dispatch(ActionFactory.selectStudent(val)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTeam)