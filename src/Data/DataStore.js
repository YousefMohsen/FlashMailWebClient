
import axios from 'axios';
import store from './redux/store'
import ActionFactory from './redux/actions'

const api = 'http://localhost:4000';
class DataStore {


    fetchTeamList() {
        axios.get(api + '/team/all')
            .then((response) => {
                let teamList = response.data;
                store.dispatch(ActionFactory.updateTeamList(teamList))
                this.getTeamInfo(teamList[0])
                this.getMsgTeamInfo(teamList[0])

            })
            .catch(function (error) {
                console.log(error);
            });
    }





    sendNewMessage(formData) {
        console.log("FORMDATA FROM DATASTORE", formData)

        return axios.post(api + '/msg/new', formData)
            .then((result, err) => {
                alert("Beskeden er blevet sendt!");

            }, (err) => {
                alert("Fejl fra serveren. Beskeden er ikke sendt.")
                console.log("ERROR :/")
            });

    }



    createNewTeam(newTeam) {

        return axios.post(api + '/team/new', {
            newTeam: newTeam
        })

    }



    getTeamInfo = async (teamName) => {


        return axios.get(api + '/team/' + teamName)
            .then((response) => {

                let team = response.data;
                store.dispatch(ActionFactory.getTeamInfo(team))
                store.dispatch(ActionFactory.selectStudent(team.students[0]))

                return response.data


            })
            .catch(function (error) {
                console.log(error);
            });


    }



    getMsgTeamInfo = async (teamName) => {


        axios.get(api + '/team/' + teamName)
            .then((response) => {

                let team = response.data;
                console.log("FROM AXIOS ", team)
                store.dispatch(ActionFactory.selectMsgTeam(team))

                //   return response.data


            })
            .catch(function (error) {
                console.log(error);
            });


    }

    deleteStudentByID(studentID) {
        let url = api + '/student/delete/' + studentID;

        console.log(url);
        return axios.delete(url)
            .then((response) => {
                let selectedTeam = store.getState().selectedTeam.name;
                this.getTeamInfo(selectedTeam);//update state

                console.log("from axios", store.getState());

            })
            .catch((er) => console.log(er))

    }





}


export default new DataStore()




















