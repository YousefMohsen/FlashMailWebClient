import React, { Component } from 'react';
import './EditTeam.css'
import DataStore from '../../Data/DataStore'
import {connect} from "react-redux"
import { SelectStudent ,UpdateTeamList } from "../../Data/redux/reducer"

const photoPlaveholder = "https://image.flaticon.com/icons/svg/149/149071.svg";

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

      componentDidMount(){
        DataStore.fetchTeamList();
        
              }

 
          handleTeamChange= async(event)=>{

            DataStore.getTeamInfo(event.target.value);
            

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



         renderTeaminfo(){
          let team = this.props.selectedTeam;
          console.log("SELECTED TEAM", team);
          if(team){
            
            return(
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
          else{
            return(<h1>Vælg et hold</h1>)
          }
         }   

//              

         renderStudenList(studentList){

          
           console.log("STUDENTS",studentList);
           if(!studentList)return <h1>test</h1>
          
          else{
            
            return(
            <div className="studentList">
            <ul className="list-group">
            
            {studentList.map((student)=>{

              return <li className="list-group-item" onClick={this.selectStudent.bind(this, student)}>{student.name}</li>;

            })}

            </ul>
            </div>
          )}

         }

         renderStudentInfo(){
          let student = this.props.selectedStudent;
          console.log("SELECTEDSTUDENT", student)
          
          if(student){
            return(
              
              <div class="studentInfoContainer">
<div className="studentInfo">
              <h1>Studerende:</h1>

              <h4 class="title">Navn: {student.name}</h4>
              <h4>Mail: {student.mail}</h4>
              <h4>Har mobilapp: {student.pushToken? "Ja":"Nej"}</h4>
</div>
              <img src={student.imgUrl? student.imgUrl:photoPlaveholder} class="studenPhoto" alt="StudentPhoto"/>
             
             <button onClick={this.deleteStudent.bind(this,student)} className="btn btn-danger">Slet</button> {/* TODO: */}
            </div>
            )
          }
          else{
            console.log("ELSE")
            return(<h1>vælg en studerende</h1>)
            
          }

         }

         deleteStudent(student){
         DataStore.deleteStudentByID(student._id);
         
         }
         selectStudent(student){
        
            //e.target.className = 'active';
            this.props.selectStudent(student)
          console.log("btn clicked",student)
         //  this.state ={data: 'sds'};
        }
  render() {
    const test = this.props.count? "true" : "True";

    const teamSelector = this.renderTeamList();
    const teamInfo = this.renderTeaminfo();
    
    return (
      <div>
      <div className="App-header1">
      
      <h1>Rediger hold {test}</h1>
  
  </div>

        {teamSelector}

<div>

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

    updateTeamList: (val)=> dispatch({ type: UpdateTeamList, val:val }),
    selectStudent: (val)=> dispatch({ type: SelectStudent, val:val }),
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditTeam)