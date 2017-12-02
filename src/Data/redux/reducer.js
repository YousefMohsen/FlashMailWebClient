
const initialState = {
  };
  
  export const INCREMENT = "INCREMENT";
  export const DECREMENT = "DECREMENT";
  export const RESET = "RESET";
  export const UpdateTeamList = "UpdateTeamList"
  export const GetTeamInfo = "GetTeamInfo"
  export const SelectStudent = "SelectStudent"
  export const SelectMsgTeam = "SelectedMsgTeam"
  export const SelectMessage = "SelectMessage"
  export const ResetInboxStore = "ResetInboxStore"


  
  
  export default function dispatch(state = initialState, action) {
    switch (action.type) {
      case GetTeamInfo:
        return {
            ...state,
        selectedTeam: action.val
        };
  
      case SelectStudent:
        return {
            ...state,
        selectedStudent: action.val
        };

        case UpdateTeamList:
        return {
            ...state,
          teamList: action.val
        };
        case SelectMsgTeam:
        return {
            ...state,
            selectedMsgTeam: action.val
        };
        case SelectMessage:
        return {
            ...state,
        selectedMessage: action.val
        };

        case ResetInboxStore:
        return {
            ...state,
        selectedMessage: null
        };

      default:
        return state;
    }
  }