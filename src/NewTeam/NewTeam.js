import React, { Component } from 'react';
import './NewTeam.css'
import axios from 'axios';


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
              const newTeam = this.parseInput(this.state.formData);
            if(newTeam===null) {alert("ugyldigt input!")}
            else{
              console.log('A Team was submitted. Title: ' + newTeam);
              axios.post('http://localhost:5000/team/new', {
                newTeam:newTeam
              })
                .then((result,err) => {
                  //  alert("Beskeden er blevet sendt!");
        
                },(err)=>{
                  alert("Fejl fra serveren. Beskeden er ikke sendt.")
                  console.log("ERROR :/")
                });
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

                if(formData.name && formData.teamList ){
                  console.log("in if ")
                var result = {teamName: formData.name, teamList:[{}]};   
               
               formData.teamList.split(",").map((student)=>{
               
               
               var studentName =student.substring(student.indexOf("“")+1,student.indexOf("\"")); 
               var studentEmail =  student.substring(student.indexOf("<")+1,student.indexOf(">")).replace(/ /g,''); 
               result.teamList.push({name: studentName, mail: studentEmail});
               
               
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

export default NewTeam;
