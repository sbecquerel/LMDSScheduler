import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { updateStudentStatus } from '../actions'

const Students = ({match, calendar, studentsStatus, dispatch}) => {
  const 
    teacherName = match.params.teacher_name,
    slotIndex = match.params.slot_index,
    teacher = calendar.find(teacher => teacher.name === teacherName)

  if (teacher === undefined) {
    return <div>Undefined calendar for teacher {teacherName}</div>
  }

  const slot = teacher.slots[slotIndex]
  if (slot === undefined) {
    return <div>Students not found for slot index {slotIndex}</div>
  }

  return (
    <div>
      <h1 className="text-center">
        {teacherName}<br/>
        <small className="text-muted">{slot.day.charAt(0).toUpperCase()}{slot.day.slice(1)} {slot.hour}h{slot.minutes > 0 ? slot.minutes : ''}</small>
      </h1>
      <div className="list-group">
        {slot.students.map((student, i) => (
          <button 
            key={i} 
            type="button" 
            className={classNames(
              "list-group-item", 
              "list-group-item-action",
              studentsStatus.findIndex(status =>
                status.teacherName === teacherName 
                && status.studentId === student.id
                && status.slot.day === slot.day
                && status.slot.hour === slot.hour
                && status.slot.minutes === slot.minutes
              ) !== -1 ? "active" : ""  
            )}
            onClick={() => dispatch(updateStudentStatus(teacherName, slot, student))}
          >
            {student.firstname} {student.lastname}
          </button>
        ))}
      </div>
    </div>  
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Students);
