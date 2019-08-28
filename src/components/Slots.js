import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const Slots = ({match, calendar}) => {
  const 
    teacherName = match.params.teacher_name,
    teacher = calendar.find(teacher => teacher.name === teacherName)

  if (teacher === undefined) {
    return <div>Undefined calendar for teacher {teacherName}</div>
  }

  return (
    <div>
      <h1 className="text-center">{match.params.teacher_name}</h1>
      <div className="list-group">
          {teacher.slots.map((slot, i) => (
          <Link key={i} to={`/students/${teacherName}/${i}`} className={classNames("list-group-item", "list-group-item-action")}>
              {slot.day.charAt(0).toUpperCase()}{slot.day.slice(1)} {slot.hour}h{slot.minutes > 0 ? slot.minutes : ''}
          </Link>
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Slots);
