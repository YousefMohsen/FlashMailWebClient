import React, { Component } from 'react';
import './NewTeam.css'

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
        /*
              event.preventDefault();
              
        
              // get our form data out of state
              const formData = this.state.formData;
              console.log('A msg was submitted. Title: ' + formData.title);
              axios.post('http://localhost:5000/msg/new', formData)
                .then((result,err) => {
                    alert("Beskeden er blevet sendt!");
        
                },(err)=>{
                  alert("Fejl fra serveren. Beskeden er ikke sendt.")
                  console.log("ERROR :/")
                });
           // console.log( event.target.submit())'
        */

console.log(this.parseInput(this.state.formData));        
       

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
                var result = {teamName: formData.name, teamList:[{}]};   
               
               formData.teamList.split(",").map((student)=>{
               
               
               var studentName =student.substring(student.indexOf("“")+1,student.indexOf("\"")); 
               var studentEmail =  student.substring(student.indexOf("<")+1,student.indexOf(">")).replace(/ /g,''); 
               result.teamList.push({studentName: studentName, studentEmail: studentEmail});
               
               
               });
               
               return result;
               
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
