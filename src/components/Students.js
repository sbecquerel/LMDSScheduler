import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { updateStudentStatus } from '../actions'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Students = ({match, calendar, studentsStatus, dispatch}) => {
  const 
    teacherName = decodeURIComponent(match.params.teacher_name),
    slotIndex = match.params.slot_index,
    teacher = calendar.find(teacher => teacher.name === teacherName)

  if (teacher === undefined) {
    return <div>Undefined calendar for teacher {teacherName}</div>
  }

  const slot = teacher.slots[slotIndex]
  if (slot === undefined) {
    return <div>Students not found for slot index {slotIndex}</div>
  }

  const getStatus = student => {
    if (student.status !== 'POSE') {
      return null
    }

    if (student.date_eval !== null 
      // On ne prend pas les dates d'évaluation des précédentes années
      && student.date_eval >= moment("2019-08-01", "YYYY-MM-DD").unix()) {
      const delay = (moment().unix() - student.date_eval) / 60 / 60 / 24;

      if (Math.ceil(delay) > 10) {
        return 'warn';
      }
    }

    return 'new'
  }

  const getButton = (student, index) => {

    const selected = studentsStatus.findIndex(status =>
      status.teacherName === teacherName 
      && status.studentId === student.id
      && status.slot.day === slot.day
      && status.slot.hour === slot.hour
      && status.slot.minutes === slot.minutes
    ) !== -1

    const status = getStatus(student)

    return (
      <button 
        key={index} 
        type="button" 
        className={classNames(
          "list-group-item", 
          "list-group-item-action",
          selected ? "active" : "",
          selected === false && status === 'new' ? "list-group-item-info" : "",
          selected === false && status === 'warn' ? "list-group-item-danger" : ""  
        )}
        onClick={() => dispatch(updateStudentStatus(teacherName, slot, student, !selected))}
      >
        {student.firstname.charAt(0).toUpperCase()}{student.firstname.slice(1)} {student.lastname.charAt(0).toUpperCase()}{student.lastname.slice(1)}
        {status === 'new' ? <i className="fas fa-star float-right"></i> : ''}
        {status === 'warn' ? 
          <i className="fas fa-dollar-sign float-right" style={{paddingRight: '0.3rem'}}></i> : 
          ''
        }
      </button>
    )
  }

  return (
    <div>
      <h1 className="text-center">
        {teacherName}<br/>
        <small className="text-muted">{slot.day.charAt(0).toUpperCase()}{slot.day.slice(1)} {slot.hour}h{slot.minutes > 0 ? slot.minutes : ''}</small>
      </h1>
      <div className="list-group list-group-flush" style={{marginBottom: '20px'}}>
        {slot.students.map(getButton)}        
      </div>
      <Link 
        className={classNames('nav-link', 'btn', 'btn-secondary')} 
        to={`/slots/${encodeURIComponent(teacherName)}`}
        style={{margin: '0 10px'}}  
      >
        OK
      </Link>
    </div>  
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Students);
