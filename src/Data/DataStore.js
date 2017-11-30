
import axios from 'axios';
import {connect} from "react-redux"
import { INCREMENT, DECREMENT, RESET,UpdateTeamList } from "./redux/reducer"
import store from './redux/store'
import ActionFactory from './redux/actions'


const api = 'http://localhost:4000';
class DataStore {
    


    fetchTeamList(){
        var st = this.setTeams;
                axios.get(api+'/team/all')
                .then( (response)=> {

                    store.dispatch(ActionFactory.updateTeamList(response.data))

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

       let team = response.data;
      store.dispatch(ActionFactory.getTeamInfo(team))
      store.dispatch(ActionFactory.selectStudent(team.students[0]))
        
        return response.data
    
    
    })
    .catch(function (error) {
      console.log(error);
    });
 

}

deleteStudentByID(studentID){
    let url = api+'/student/delete/'+studentID;
    console.log(url);
return axios.delete(url)
.then((response)=>{
    let selectedTeam = store.getState().selectedTeam.name;
   this.getTeamInfo(selectedTeam);//update state
    
console.log("from axios",store.getState());

})
.catch((er)=>console.log(er))

}





}

const mapDispatchToProps = dispatch => {
    return {
      increment: ()=> dispatch({type: INCREMENT,val: 5}),
      decrement: ()=> dispatch({type: DECREMENT,val: 5 }),
      reset: ()=> dispatch({ type: RESET }),
      updateTeamList: (val)=> dispatch({ type: UpdateTeamList, val:val }),
      
    }
  }
export default new DataStore()


//  

















