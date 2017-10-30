import React, { Component } from 'react';
import './NewTeam.css'

class NewTeam extends Component {
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
           // console.log( event.target.submit())
        */
              }

  render() {

    
    return (
      <div>
      
      <div className="App-header1">
      
      <h1>Opret et nyt hold</h1>
  
  </div>


      <form onSubmit={this.handleSubmit} className="formStyle">
   
        <input type="text" placeholder="Navn.." onChange={this.handleTitleChange}/>
    
      
      
     
 
    <br/>
    <textarea type="text" placeholder="Indsæt en holdliste.." onChange={this.handleMsgChange}/>
  
    <br/>

      <input type="submit" value="Opret" />
    </form>

      </div>
    );
  }
}

export default NewTeam;
