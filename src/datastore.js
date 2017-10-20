
import  {observable, computed, action} from "mobx";
import axios from 'axios';


const URL = 'http://localhost:5000/team/all';
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
                axios.get('http://localhost:5000/team/all')
                .then( (response)=> {
                    //console.log(response.data);
                    
                    this.setTeams(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });
              }


}

export default new DataStore();

      




















