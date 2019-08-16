import schema from '../Schema'

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
  dispatch(requestCalendar());
  /*return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))*/
  dispatch(receiveCalendar(schema));
}

export const toggleStudentStatus = (teacherName, ts, studentName) => ({
  type: TOGGLE_STUDENT_STATUS,
  teacherName,
  ts,
  studentName
})