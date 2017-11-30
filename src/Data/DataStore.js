
import  {observable, computed, action} from "mobx";
import axios from 'axios';


const api = 'http://localhost:4000';
class DataStore {

    @observable Teams = [];
    


    constructor() {
     //  this.testMethod();
        //this.getFlightByDestination("CPH");

        this.fetchTeamList();

    }

    @action
    setTeams(newTeamList){
        this.Teams = newTeamList;
        console.log(this.Teams);
        

    }
    fetchTeamList(){
        var st = this.setTeams;
                axios.get(api+'/team/all')
                .then( (response)=> {
                    //console.log(response.data);
                    
                    this.setTeams(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });
              }




              
sendNewMessage(formData){

      axios.post(api+'/msg/new', formData)
      .then((result,err) => {
          alert("Beskeden er blevet sendt!");

      },(err)=>{
        alert("Fejl fra serveren. Beskeden er ikke sendt.")
        console.log("ERROR :/")
      });

    }



createNewTeam(newTeam){

  return axios.post(api+'/team/new', {
      newTeam:newTeam
    })
     
}  



getTeamInfo= async(teamName)=>{
   
   
    return axios.get(api+'/team/'+teamName)
    .then( (response)=> {
        //console.log(response.data);
        
        return response.data})
    .catch(function (error) {
      console.log(error);
    });
 

}

deleteStudentByID(studentID){
    let url = api+'/student/delete/'+studentID;
    console.log(url);
return axios.delete(url)
.then((response)=>{
console.log("from axios",response);

})
.catch((er)=>console.log(er))

}




}

export default new DataStore();

      




















