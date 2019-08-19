export const REQUEST_CALENDAR = 'REQUEST_CALENDAR';
export const RECEIVE_CALENDAR = 'RECEIVE_CALENDAR';
export const TOGGLE_STUDENT_STATUS = 'TOGGLE_STUDENT_STATUS'

export const requestCalendar = () => ({
  type: REQUEST_CALENDAR
})

export const receiveCalendar = (calendar) => ({
  type: RECEIVE_CALENDAR,
  calendar,
  receivedAt: Date.now()
})

export const fetchCalendar = () => dispatch => {
  dispatch(requestCalendar())
  return fetch('/calendar')
    .then(response => response.json())
    .then(calendar => dispatch(receiveCalendar(calendar)))
}

export const toggleStudentStatus = (teacherName, ts, studentName) => ({
  type: TOGGLE_STUDENT_STATUS,
  teacherName,
  ts,
  studentName
})

export const updateStudentStatus = (teacherName, ts, studentName) => dispatch => {
  return fetch('/save', { 
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      teacherName,
      ts,
      studentName
    })
  }).then(() => {
    return dispatch(toggleStudentStatus(teacherName, ts, studentName))
  })
}
