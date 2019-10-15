import AUTH_TOKEN from '../authToken';
import socket from '../socket';

export const REQUEST_CALENDAR = 'REQUEST_CALENDAR'
export const RECEIVE_CALENDAR = 'RECEIVE_CALENDAR'
export const TOGGLE_STUDENT_STATUS = 'TOGGLE_STUDENT_STATUS'

export const requestCalendar = () => ({
  type: REQUEST_CALENDAR
})

export const receiveCalendar = (calendar) => ({
  type: RECEIVE_CALENDAR,
  calendar,
  receivedAt: Date.now()
})

/*export const fetchResult = () => {
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
}*/

export const fetchCalendar = () => dispatch => {
  dispatch(requestCalendar())

  
  return fetch('/calendar', {
    headers: {
      'Authorization': 'Bearer ' + AUTH_TOKEN
    }
  }).then(response => response.json())
    .then(calendar => dispatch(receiveCalendar(calendar)))
}

export const toggleStudentStatus = (teacherName, studentId, day, hour, minutes, selected) => ({
  type: TOGGLE_STUDENT_STATUS,
  teacherName,
  studentId,
  day,
  hour,
  minutes,
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
    
    socket.emit(
      'toggleStudentStatus', 
      teacherName, 
      student.id, 
      slot.day, 
      slot.hour, 
      slot.minutes, 
      selected
    );

    return dispatch(toggleStudentStatus(
      teacherName, 
      student.id, 
      slot.day, 
      slot.hour, 
      slot.minutes,
      selected
    ))
  })
}
