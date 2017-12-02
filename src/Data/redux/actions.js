import { GetTeamInfo,UpdateTeamList, SelectMessage,SelectStudent,SelectMsgTeam,ResetInboxStore } from "./reducer"


class ActionFactory {

  updateTeamList(newTeamList) {
    return {
      type: UpdateTeamList,
      val: newTeamList
    }
  }

  getTeamInfo(team) {
    return {
      type: GetTeamInfo,
      val: team
    }
  }


  selectStudent(student) {
    return {
      type: SelectStudent,
      val: student
    }
  }
  selectMsgTeam(student) {
    return {
      type: SelectMsgTeam,
      val: student
    }
  }
  selectMessage(msg) {
    console.log("ACTION select",msg)
    return {
      type: SelectMessage,
      val: msg
    }
  }

  resetInboxState(){

    return {
      type: ResetInboxStore,
    }
  }
  



}

  export default new ActionFactory();