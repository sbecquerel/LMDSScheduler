import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { updateStudentStatus } from '../actions'

const Students = ({match, calendar, studentsStatus, dispatch}) => {
  const 
    teacherName = match.params.teacher_name,
    slotName = match.params.ts,
    teacher = calendar.find(teacher => teacher.name === teacherName)

  if (teacher === undefined) {
    return <div>Undefined calendar for teacher {teacherName}</div>
  }

  const slot = teacher.slots.find(slot => slot.name === slotName)
  if (slot === undefined) {
    return <div>Students not found for {slotName}</div>
  }

  return (
    <div>
      <h1 className="text-center">
        {teacherName}<br/>
        <small className="text-muted">{slotName}</small>
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
                && status.slotName === slotName 
                && status.studentId === student.id
              ) !== -1 ? "active" : ""  
            )}
            onClick={() => dispatch(updateStudentStatus(teacherName, slotName, student))}
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
