import axios from "axios";
import store from "./redux/store";
import ActionFactory from "./redux/actions";

const api = "http://localhost:4000" //"http://yousefmohsen.dk:4000";
/**
 * All calls to the server is made through DataStore
 */
class DataStore {

    /**
     * fetches a list of all available teams 
     */
  fetchTeamList() {
    axios
      .get(api + "/team/all")
      .then(response => {
        let teamList = response.data;
        store.dispatch(ActionFactory.updateTeamList(teamList));
        this.getTeamInfo(teamList[0]);
        this.getMsgTeamInfo(teamList[0]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
/**
 * Sends a new mesage
 * @param {Message} formData - message object 
 */
  sendNewMessage(formData) {
    console.log("FORMDATA FROM DATASTORE", formData);

    return axios.post(api + "/msg/new", formData).then(
      (result, err) => {
        alert("Beskeden er blevet sendt!");
      },
      err => {
        alert("Fejl fra serveren. Beskeden er ikke sendt.");
        console.log("ERROR :/");
      }
    );
  }
/**
 * Creates a new team
 * @param {Team} newTeam - Team object
 */
  createNewTeam(newTeam) {
    return axios.post(api + "/team/new", {
      newTeam: newTeam
    });
  }

  /**
   * Gets detailed info about a team, and updates redux store with that info
   */
   getTeamInfo= async(teamName) => {
    return axios
      .get(api + "/team/" + teamName)
      .then(response => {
        let team = response.data;
        store.dispatch(ActionFactory.getTeamInfo(team));
        store.dispatch(ActionFactory.selectStudent(team.students[0]));
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  };
/**
 * Gets detailed info about a message, and updates redux store with that info
 */
  getMsgTeamInfo = async(teamName)=> {
    axios
      .get(api + "/team/" + teamName)
      .then(response => {
        let team = response.data;
        console.log("FROM AXIOS ", team);
        store.dispatch(ActionFactory.selectMsgTeam(team));

        //   return response.data
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  /**
   * Deletes a student from a team
   * @param {String} studentID - ID of a student
   */
  deleteStudentByID(studentID) {
    let url = api + "/student/delete/" + studentID;
    return axios
      .delete(url)
      .then(response => {
        let selectedTeam = store.getState().selectedTeam.name;
        this.getTeamInfo(selectedTeam); //update state
      })
      .catch(er => console.log(er));
  }
}

export default new DataStore();
