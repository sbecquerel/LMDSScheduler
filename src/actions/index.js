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

export const toggleStudentStatus = (teacherName, slotName, student) => ({
  type: TOGGLE_STUDENT_STATUS,
  teacherName,
  slotName,
  student
})

export const updateStudentStatus = (teacherName, slotName, student) => dispatch => {
  return fetch('/save', { 
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      teacherName,
      slotName,
      studentId: student.id
    })
  }).then(() => {
    return dispatch(toggleStudentStatus(teacherName, slotName, student))
  })
}
