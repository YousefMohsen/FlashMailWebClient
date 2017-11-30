
const initialState = {
  teamList:[]
  };
  
  export const INCREMENT = "INCREMENT";
  export const DECREMENT = "DECREMENT";
  export const RESET = "RESET";
  export const UpdateTeamList = "UpdateTeamList"
  export const GetTeamInfo = "GetTeamInfo"
  export const SelectStudent = "SelectStudent"
  


  
  
  export default function count(state = initialState, action) {
    switch (action.type) {
      case GetTeamInfo:
        
        return {
            ...state,
        selectedTeam: action.val
        };
  
      case SelectStudent:
      console.log("FROM REDUCER",action.val)
        return {
            ...state,
        selectedStudent: action.val
        };

        case UpdateTeamList:
        return {
            ...state,
          teamList: action.val
        };
        

      default:
        return state;
    }
  }