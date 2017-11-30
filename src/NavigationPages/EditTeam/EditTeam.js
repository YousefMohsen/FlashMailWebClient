import React, { Component } from 'react';
import './EditTeam.css'
import {observer} from "mobx-react";
import  {mobx} from "mobx";
import DataStore from '../../Data/DataStore'

@observer
class EditTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {};
this.handleTeamChange = this.handleTeamChange.bind(this);
this.selectStudent = this.selectStudent.bind(this)
this.renderTeaminfo = this.renderTeaminfo.bind(this);
this.renderStudenList = this.renderStudenList.bind(this)
this.renderTeaminfo = this.renderTeaminfo.bind(this)
      }


 
          handleTeamChange= async(event)=>{

            let selectedTeam = await DataStore.getTeamInfo(event.target.value);
            

            this.setState({selectedTeam: selectedTeam});

          }
    handleSubmit(event) {

      event.preventDefault();
      const formData = this.state.formData;
      
DataStore.sendNewMessage(formData)


      // get our form data out of state


      }
      newSelect(){
        console.log("newSelet")

      }
      renderTeamList(nTeamList){

        if(!this.state.selectedTeam){ DataStore.getTeamInfo(nTeamList[0]).then((selectedTeam)=>this.setState({selectedTeam: selectedTeam}));}

                var result = nTeamList.map((team,index) => {
             return <option value={team}>{team}</option> });
                    
         return <select  onChange={this.handleTeamChange}> {result} </select>;
        
            }



         renderTeaminfo(){
          if(this.state.selectedTeam){
            let team = this.state.selectedTeam;
            
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
          if(this.state.selectedStudent){
            let student = this.state.selectedStudent;
            return(
              
              <div class="studentInfo">
              <h1>Studerende:</h1>
              <h4 class="title">Navn: {student.name}</h4>
              <h4>Mail: {student.mail}</h4>
             
             <button onClick={this.deleteStudent.bind(this,student)} className="btn btn-danger">Slet</button> {/* TODO: */}
            </div>
            )
          }
          else{
            return(<h1>vælg en studerende</h1>)
            
          }

         }

         deleteStudent(student){
          alert(student.name)
         }
         selectStudent(student){
        
          this.setState({selectedStudent: student});
            //e.target.className = 'active';

          console.log("btn clicked",student)
         //  this.state ={data: 'sds'};
        }
  render() {

    const teamList = DataStore.Teams;
    console.log(teamList.slice());
    const resultList = this.renderTeamList(teamList);
    const teamInfo = this.renderTeaminfo();
    return (
      <div>
      <div className="App-header1">
      
      <h1>Rediger hold</h1>
  
  </div>

        {resultList}

<div>

<div>
{teamInfo}
</div>

</div>



      </div>
    );
  }
}

export default EditTeam;
