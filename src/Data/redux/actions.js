import { GetTeamInfo,UpdateTeamList, SelectStudent } from "./reducer"


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

  



}

  export default new ActionFactory();