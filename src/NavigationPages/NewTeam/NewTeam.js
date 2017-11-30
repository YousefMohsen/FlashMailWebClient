import React, { Component } from 'react';
import './NewTeam.css'
import DataStore from '../../Data/DataStore'
import {connect} from "react-redux"
import { SelectStudent ,UpdateTeamList } from "../../Data/redux/reducer"


class NewTeam extends Component {

constructor(props){
super(props);


this.state ={formData:{}};

this.handleNameChange = this.handleNameChange.bind(this);
this.handleTeamChange = this.handleTeamChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.parseInput = this.parseInput.bind(this);


}


    handleSubmit(event) {
       
              event.preventDefault();
              
              // get our form data out of state
              let newTeam = this.parseInput(this.state.formData);

              
              console.log(newTeam);
            if(newTeam===null) {alert("ugyldigt input!")}
            else{
                

              DataStore.createNewTeam(newTeam)
              .then(()=>{alert("Holdet er oprettet!")
              DataStore.fetchTeamList();
            })
              .catch((er)=>{
                console.log(er)
                alert("Fejl fra serveren. Holdet er IKKE oprettet.")
              })

           // console.log( event.target.submit())'
      
          }
       

              }
              handleNameChange(event){

         
                  var newData =  this.state.formData;
                  newData.name =  event.target.value;
                  this.setState({formDate: newData});
        
                  
              }
              handleTeamChange(event){


                var newData =  this.state.formData;
                newData.teamList =  event.target.value;
                this.setState({formDate: newData});
              }

              parseInput(formData){
                console.log(formData.teamList)

                if(formData.name && formData.teamList ){
                  console.log("in if ")
                var result = {teamName: formData.name, teamList:[{}]};   
               
               formData.teamList.split(",").map((student)=>{
               
               
               var studentName =student.substring(student.indexOf("“")+1,student.indexOf("\"")); 
               var studentEmail =  student.substring(student.indexOf("<")+1,student.indexOf(">")).replace(/ /g,''); 
               result.teamList.push({name: studentName, mail: studentEmail, teams:[formData.name]});
               console.log(result);
               
               });
               return result;
              
              
              }   
              
              else {                 
              console.log("in else ");
              return null}
               
               
               }
               
               
               
               

  render() {

    
    return (
      <div>
      
      <div className="App-header1">
      
      <h1>Opret et nyt hold</h1>
  
  </div>


      <form onSubmit={this.handleSubmit} className="formStyle">
   
        <input type="text" placeholder="Navn.." onChange={this.handleNameChange}/>
    
      
      
     
 
    <br/>
    <textarea type="text" placeholder="Indsæt en holdliste.." 
    onChange={this.handleTeamChange}/>
  
    <br/>

      <input type="submit" value="Opret" />
    </form>

      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {

    updateTeamList: (val)=> dispatch({ type: UpdateTeamList, val:val }),
    
  }
}
export default connect(mapDispatchToProps)(NewTeam)