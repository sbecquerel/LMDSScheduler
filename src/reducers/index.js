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
          && status.studentId === action.studentId
          && status.day === action.day
          && status.hour === action.hour
          && status.minutes === action.minutes
        )
      )

      if (action.selected === false) {
        if (index !== -1) {
          const studentsStatus = [...state.studentsStatus]
          studentsStatus.splice(index, 1)
    
          return {
            ...state,
            studentsStatus
          }
        }  
      } else {
        if (index === -1) {
          return {
            ...state,
            studentsStatus: [...state.studentsStatus, {
              teacherName: action.teacherName,
              studentId: action.studentId,
              day: action.day,
              hour: action.hour,
              minutes: action.minutes
            }]
          }
        }
      }

    default:
      return state;
  }
}

export default reducer;
