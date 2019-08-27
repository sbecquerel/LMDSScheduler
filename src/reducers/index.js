import { REQUEST_CALENDAR, RECEIVE_CALENDAR, TOGGLE_STUDENT_STATUS } from '../actions';

const reducer = (state = {
  isFetching: false,
  calendar: [],
  studentsStatus: []
}, action) => {
  switch (action.type) {
    case REQUEST_CALENDAR:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_CALENDAR:
      return {
        ...state,
        isFetching: false,
        calendar: action.calendar,
        lastUpdated: action.receivedAt
      };

    case TOGGLE_STUDENT_STATUS:
      const index = state.studentsStatus.findIndex(
        status => (
          status.teacherName === action.teacherName 
          && status.slotName === action.slotName 
          && status.studentId === action.student.id
        )
      )

      if (index === -1) {
        return {
          ...state,
          studentsStatus: [...state.studentsStatus, {
            teacherName: action.teacherName,
            slotName: action.slotName,
            studentId: action.student.id
          }]
        }
      } 
      
      const studentsStatus = [...state.studentsStatus]
      studentsStatus.splice(index, 1)

      return {
        ...state,
        studentsStatus
      }

    default:
      return state;
  }
}

export default reducer;
