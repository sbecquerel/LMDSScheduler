export const REQUEST_CALENDAR = 'REQUEST_CALENDAR';
export const RECEIVE_CALENDAR = 'RECEIVE_CALENDAR';
export const TOGGLE_STUDENT_STATUS = 'TOGGLE_STUDENT_STATUS'

const AUTH_TOKEN = '03DCB31856300AB56FB7313AEB664C76';

export const requestCalendar = () => ({
  type: REQUEST_CALENDAR
})

export const receiveCalendar = (calendar) => ({
  type: RECEIVE_CALENDAR,
  calendar,
  receivedAt: Date.now()
})

export const fetchResult = () => {
  fetch('/result', {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + AUTH_TOKEN
    })
  })
  .then(response => response.blob())
  .then(blob => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = "result.xlsx";
      document.body.appendChild(a);
      a.click();    
      a.remove();
  });
}

export const fetchCalendar = () => dispatch => {
  dispatch(requestCalendar())
  return fetch('/calendar', {
    headers: {
      'Authorization': 'Bearer ' + AUTH_TOKEN
    }
  }).then(response => response.json())
    .then(calendar => dispatch(receiveCalendar(calendar)))
}

export const toggleStudentStatus = (teacherName, slot, student, selected) => ({
  type: TOGGLE_STUDENT_STATUS,
  teacherName,
  slot,
  student,
  selected
})

export const updateStudentStatus = (teacherName, slot, student, selected) => dispatch => {
  return fetch('/save', { 
    method: 'POST', 
    headers: {
      'Authorization': 'Bearer ' + AUTH_TOKEN,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      teacherName,
      studentId: student.id,
      day: slot.day,
      hour: slot.hour,
      minutes: slot.minutes,
      selected
    })
  }).then(() => {
    return dispatch(toggleStudentStatus(teacherName, slot, student, selected))
  })
}
